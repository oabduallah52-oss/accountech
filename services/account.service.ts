import {
  getAccountsRepository,
  getAccountByIdRepository,
  createAccountRepository,
  updateAccountRepository,
  deleteAccountRepository,
} from "@/repositories/account.repository";


import {
  CreateAccountInput,
  UpdateAccountInput,
} from "@/types/account";



// =====================================
// GET ALL ACCOUNTS
// =====================================

export async function getAccountsService() {

  return await getAccountsRepository();

}



// =====================================
// GET ACCOUNT BY ID
// =====================================

export async function getAccountByIdService(
  id: number
) {

  return await getAccountByIdRepository(
    id
  );

}



// =====================================
// CREATE ACCOUNT
// =====================================

export async function createAccountService(
  data: CreateAccountInput
) {

  return await createAccountRepository(
    data
  );

}



// =====================================
// UPDATE ACCOUNT
// =====================================

export async function updateAccountService(
  id: number,
  data: UpdateAccountInput
) {

  return await updateAccountRepository(
    id,
    data
  );

}



// =====================================
// DELETE ACCOUNT
// =====================================

export async function deleteAccountService(
  id: number
) {

  return await deleteAccountRepository(
    id
  );

}