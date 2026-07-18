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
// GET SINGLE COMPANY
// =====================================

export async function getCompanyByIdRepository(
  id: number
) {

  return await prisma.company.findUnique({

    where: {
      id,
    },

    include: {
      branches: true,
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

    data: {

      name: data.name,

      legalName: data.legalName,

      industry: data.industry,

      country: data.country,

      currency: data.currency,

      fiscalYear: data.fiscalYear,

      email: data.email ?? null,

      phone: data.phone ?? null,

      address: data.address ?? null,

    },

  });

}



// =====================================
// UPDATE COMPANY
// =====================================

export async function updateCompanyRepository(
  id: number,
  data: Partial<CreateCompanyInput>
) {

  return await prisma.company.update({

    where: {
      id,
    },

    data,

  });

}



// =====================================
// DELETE COMPANY
// =====================================

export async function deleteCompanyRepository(
  id: number
) {

  return await prisma.company.delete({

    where: {
      id,
    },

  });

}