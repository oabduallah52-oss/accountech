import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import {
  CreateJournalEntryInput,
  JournalEntryQueryInput,
  UpdateJournalEntryInput,
} from "@/types/journal";

const journalEntryInclude = {
  lines: {
    include: {
      account: true,
    },
  },
} satisfies Prisma.JournalEntryInclude;

function toJournalLineData(line: CreateJournalEntryInput["lines"][number]) {
  return {
    accountId: line.accountId,
    description: line.description?.trim() ?? null,
    debit: new Prisma.Decimal(line.debit || 0),
    credit: new Prisma.Decimal(line.credit || 0),
  };
}

function buildJournalEntryWhere(filters: JournalEntryQueryInput = {}): Prisma.JournalEntryWhereInput {
  const where: Prisma.JournalEntryWhereInput = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.search) {
    const term = filters.search.trim();
    if (term) {
      const normalized = term.toLowerCase();
      where.OR = [
        { entryNumber: { contains: normalized, mode: "insensitive" } },
        { description: { contains: normalized, mode: "insensitive" } },
      ];
    }
  }

  return where;
}

export async function getJournalEntriesRepository(filters: JournalEntryQueryInput = {}) {
  return prisma.journalEntry.findMany({
    where: buildJournalEntryWhere(filters),
    include: journalEntryInclude,
    orderBy: [{ entryDate: "desc" }, { id: "desc" }],
  });
}

export async function getJournalEntryByIdRepository(id: number) {
  return prisma.journalEntry.findUnique({
    where: { id },
    include: journalEntryInclude,
  });
}

export async function createJournalEntryRepository(data: CreateJournalEntryInput) {
  const payload = {
    entryNumber: data.entryNumber.trim(),
    entryDate: new Date(data.entryDate),
    description: data.description?.trim() ?? null,
    status: data.status ?? "DRAFT",
    lines: {
      create: data.lines.map(toJournalLineData),
    },
  };

  return prisma.journalEntry.create({
    data: payload,
    include: journalEntryInclude,
  });
}

export async function updateJournalEntryRepository(id: number, data: UpdateJournalEntryInput) {
  const current = await prisma.journalEntry.findUnique({ where: { id } });

  if (!current) {
    throw new Error("Journal entry not found.");
  }

  return prisma.journalEntry.update({
    where: { id },
    data: {
      entryNumber: data.entryNumber?.trim() ?? current.entryNumber,
      entryDate: data.entryDate ? new Date(data.entryDate) : current.entryDate,
      description: data.description?.trim() ?? current.description,
      status: data.status ?? current.status,
      lines: data.lines
        ? {
            deleteMany: {},
            create: data.lines.map(toJournalLineData),
          }
        : undefined,
    },
    include: journalEntryInclude,
  });
}
