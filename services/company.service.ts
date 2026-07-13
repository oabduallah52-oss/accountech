import {
  getCompaniesRepository,
  createCompanyRepository,
} from "@/repositories/company.repository";


import {
  CreateCompanyInput
} from "@/types/company";



export async function getCompaniesService(){

  return await getCompaniesRepository();

}



export async function createCompanyService(
  data: CreateCompanyInput
){

  return await createCompanyRepository(data);

}