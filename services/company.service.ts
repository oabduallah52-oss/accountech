import {
  getCompaniesRepository,
  createCompanyRepository,
  updateCompanyRepository,
} from "@/repositories/company.repository";


import {
  CreateCompanyInput
} from "@/types/company";



export async function getCompaniesService(){

  return await getCompaniesRepository();

}



export async function createCompanyService(
  data:CreateCompanyInput
){

  return await createCompanyRepository(data);

}



export async function updateCompanyService(
  id:number,
  data:Partial<CreateCompanyInput>
){

  return await updateCompanyRepository(
    id,
    data
  );

}