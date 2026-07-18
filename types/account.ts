export interface CreateAccountInput {
  code: string;

  name: string;

  accountType:
    | "ASSET"
    | "LIABILITY"
    | "EQUITY"
    | "REVENUE"
    | "EXPENSE";

  normalBalance:
    | "DEBIT"
    | "CREDIT";

  parentId?: number | null;

  companyId: number;

  branchId?: number | null;

  currency: string;

  allowPosting: boolean;

  isSystem: boolean;

  isActive: boolean;

  level: number;

  description?: string | null;
}



export interface UpdateAccountInput {

  code?: string;

  name?: string;

  accountType?:
    | "ASSET"
    | "LIABILITY"
    | "EQUITY"
    | "REVENUE"
    | "EXPENSE";


  normalBalance?:
    | "DEBIT"
    | "CREDIT";


  parentId?: number | null;


  branchId?: number | null;


  currency?: string;


  allowPosting?: boolean;


  isActive?: boolean;


  level?: number;


  description?: string | null;

}



export interface Account {

  id: number;

  code: string;

  name: string;

  accountType: string;

  normalBalance: string;

  parentId?: number | null;

  companyId: number;

  branchId?: number | null;

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