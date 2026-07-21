import { Account } from "@/types/account";

export type JournalEntryStatus = "DRAFT" | "POSTED";

export interface JournalLineInput {
  id?: number;
  accountId: number;
  description?: string | null;
  debit: number;
  credit: number;
}

export interface JournalEntryLine {
  id: number;
  journalEntryId: number;
  accountId: number;
  description?: string | null;
  debit: number;
  credit: number;
  account: Account;
  createdAt: Date;
  updatedAt: Date;
}

export interface JournalEntry {
  id: number;
  entryNumber: string;
  entryDate: string;
  description?: string | null;
  status: JournalEntryStatus;
  lines: JournalEntryLine[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJournalEntryInput {
  entryNumber: string;
  entryDate: string;
  description?: string | null;
  status?: JournalEntryStatus;
  lines: JournalLineInput[];
}

export interface UpdateJournalEntryInput extends Partial<CreateJournalEntryInput> {
  lines?: JournalLineInput[];
}

export interface JournalEntryQueryInput {
  search?: string;
  status?: JournalEntryStatus;
}
