import {
  getCompaniesRepository,
  createCompanyRepository,
} from "@/repositories/company.repository";

import { CreateCompanyInput } from "@/types/company";


export async function getCompaniesService() {
  return getCompaniesRepository();
}


export async function createCompanyService(
  data: CreateCompanyInput
) {
  return createCompanyRepository(data);
}