export type AccountType = "ASSET" | "LIABILITY" | "EQUITY" | "REVENUE" | "EXPENSE";
export type NormalBalance = "DEBIT" | "CREDIT";

export interface CreateAccountInput {
  code: string;
  name: string;
  accountType: AccountType;
  normalBalance: NormalBalance;
  parentId?: number | null;
  currency?: string;
  allowPosting?: boolean;
  isSystem?: boolean;
  isActive?: boolean;
  level?: number;
  description?: string | null;
}

export type UpdateAccountInput = Partial<CreateAccountInput>;

export interface Account {
  id: number;
  code: string;
  name: string;
  accountType: string;
  normalBalance: string;
  parentId?: number | null;
  parent?: Account | null;
  currency: string;
  allowPosting: boolean;
  isSystem: boolean;
  isActive: boolean;
  level: number;
  description?: string | null;
  children?: Account[];
  createdAt: Date;
  updatedAt: Date;
}
