import {
  createAccountRepository,
  deleteAccountRepository,
  getAccountByIdRepository,
  getAccountTreeRepository,
  getAccountsRepository,
  updateAccountRepository,
} from "@/repositories/account.repository";

import {
  AccountQueryInput,
  CreateAccountInput,
  UpdateAccountInput,
} from "@/types/account";

export async function getAccountsService(filters: AccountQueryInput = {}) {
  return getAccountsRepository(filters);
}

export async function getAccountTreeService(filters: AccountQueryInput = {}) {
  return getAccountTreeRepository(filters);
}

export async function getAccountByIdService(id: number) {
  return getAccountByIdRepository(id);
}

export async function createAccountService(data: CreateAccountInput) {
  return createAccountRepository(data);
}

export async function updateAccountService(id: number, data: UpdateAccountInput) {
  return updateAccountRepository(id, data);
}

export async function deleteAccountService(id: number) {
  return deleteAccountRepository(id);
}
