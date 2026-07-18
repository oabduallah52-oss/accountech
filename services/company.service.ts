import {
  getCompaniesRepository,
  getCompanyByIdRepository,
  createCompanyRepository,
  updateCompanyRepository,
  deleteCompanyRepository,
} from "@/repositories/company.repository";

import { CreateCompanyInput } from "@/types/company";

// ===============================
// GET ALL COMPANIES
// ===============================
export async function getCompaniesService() {
  return await getCompaniesRepository();
}

// ===============================
// GET COMPANY BY ID
// ===============================
export async function getCompanyByIdService(
  id: number
) {
  return await getCompanyByIdRepository(id);
}

// ===============================
// CREATE COMPANY
// ===============================
export async function createCompanyService(
  data: CreateCompanyInput
) {
  return await createCompanyRepository(data);
}

// ===============================
// UPDATE COMPANY
// ===============================
export async function updateCompanyService(
  id: number,
  data: any
) {
  return await updateCompanyRepository(
    id,
    data
  );
}

// ===============================
// DELETE COMPANY
// ===============================
export async function deleteCompanyService(
  id: number
) {
  return await deleteCompanyRepository(id);
}