import { prisma } from "@/lib/prisma";
import { CreateCompanyInput } from "@/types/company";



// =====================================
// GET ALL COMPANIES
// =====================================

export async function getCompaniesRepository() {

  return await prisma.company.findMany({

    include: {
      branches: true,
    },

    orderBy: {
      id: "desc",
    },

  });

}





// =====================================
// CREATE COMPANY
// =====================================

export async function createCompanyRepository(
  data: CreateCompanyInput
) {

  return await prisma.company.create({

    data,

  });

}





// =====================================
// UPDATE COMPANY
// =====================================

export async function updateCompanyRepository(

  id:number,

  data:Partial<CreateCompanyInput>

) {


  return await prisma.company.update({

    where: {

      id,

    },


    data,

  });


}