import prisma from "@/lib/prisma";
import { CreateCompanyInput } from "@/types/company";

export async function getCompaniesRepository() {
  return prisma.company.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createCompanyRepository(
  data: CreateCompanyInput
) {
  return prisma.company.create({
    data,
  });
}