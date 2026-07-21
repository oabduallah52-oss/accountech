import {
  createJournalEntryRepository,
  getJournalEntryByIdRepository,
  getJournalEntriesRepository,
  updateJournalEntryRepository,
} from "@/repositories/journal-entry.repository";
import {
  CreateJournalEntryInput,
  JournalEntryQueryInput,
  UpdateJournalEntryInput,
} from "@/types/journal";

function normalizeCurrency(value: number) {
  return Number.isFinite(value) ? Number(value.toFixed(2)) : 0;
}

function validateJournalEntryPayload(payload: CreateJournalEntryInput) {
  const issues: string[] = [];

  if (!payload.entryNumber.trim()) {
    issues.push("Journal entry number is required.");
  }

  if (!payload.entryDate) {
    issues.push("Entry date is required.");
  }

  if (!payload.lines || payload.lines.length < 2) {
    issues.push("At least two journal lines are required.");
  }

  const validStatuses = new Set(["DRAFT", "POSTED"]);
  if (payload.status && !validStatuses.has(payload.status)) {
    issues.push("Journal status must be DRAFT or POSTED.");
  }

  let debitTotal = 0;
  let creditTotal = 0;

  for (const line of payload.lines) {
    if (!line.accountId || Number.isNaN(Number(line.accountId))) {
      issues.push("Each journal line must reference a valid account.");
      continue;
    }

    const debit = normalizeCurrency(Number(line.debit || 0));
    const credit = normalizeCurrency(Number(line.credit || 0));

    if (debit === 0 && credit === 0) {
      issues.push("Each journal line requires either a debit or credit value.");
      continue;
    }

    if (debit > 0 && credit > 0) {
      issues.push("A journal line cannot have both debit and credit values.");
    }

    debitTotal += debit;
    creditTotal += credit;
  }

  if (debitTotal !== creditTotal) {
    issues.push("Total debit must equal total credit before saving.");
  }

  if (issues.length > 0) {
    throw new Error(issues.join(" "));
  }

  return payload;
}

export async function getJournalEntriesService(filters: JournalEntryQueryInput = {}) {
  return getJournalEntriesRepository(filters);
}

export async function getJournalEntryByIdService(id: number) {
  return getJournalEntryByIdRepository(id);
}

export async function createJournalEntryService(data: CreateJournalEntryInput) {
  return createJournalEntryRepository(validateJournalEntryPayload(data));
}

export async function updateJournalEntryService(id: number, data: UpdateJournalEntryInput) {
  const current = await getJournalEntryByIdRepository(id);
  if (!current) {
    throw new Error("Journal entry not found.");
  }

  const nextPayload: CreateJournalEntryInput = {
    entryNumber: data.entryNumber ?? current.entryNumber,
    entryDate: data.entryDate ?? current.entryDate.toISOString(),
    description: data.description ?? current.description,
    status: (data.status as "DRAFT" | "POSTED") ?? current.status,
    lines: data.lines ?? current.lines.map((line) => ({
      id: line.id,
      accountId: line.accountId,
      description: line.description,
      debit: Number(line.debit),
      credit: Number(line.credit),
    })),
  };

  return updateJournalEntryRepository(id, validateJournalEntryPayload(nextPayload));
}
