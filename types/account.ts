export type AccountClass =
  | "ASSETS"
  | "LIABILITIES"
  | "EQUITY"
  | "REVENUE"
  | "EXPENSES";

export type AccountType = string;
export type NormalBalance = "DEBIT" | "CREDIT";

export interface CreateAccountInput {
  code: string;
  arabicName: string;
  englishName: string;
  accountClass: AccountClass;
  accountType: AccountType;
  normalBalance: NormalBalance;
  parentId?: number | null;
  currency?: string;
  allowPosting?: boolean;
  controlAccount?: boolean;
  systemAccount?: boolean;
  isActive?: boolean;
  level?: number;
  description?: string | null;
}

export type UpdateAccountInput = Partial<CreateAccountInput>;

export interface AccountQueryInput {
  search?: string;
  accountType?: string;
  status?: boolean;
  posting?: boolean;
}

export interface Account {
  id: number;
  code: string;
  name: string;
  arabicName: string;
  englishName: string;
  accountClass: AccountClass;
  accountType: string;
  normalBalance: NormalBalance;
  parentId?: number | null;
  parent?: Account | null;
  currency: string;
  allowPosting: boolean;
  controlAccount: boolean;
  systemAccount: boolean;
  isActive: boolean;
  level: number;
  description?: string | null;
  children?: Account[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountTreeNode extends Account {
  children: AccountTreeNode[];
}
