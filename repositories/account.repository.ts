import { prisma } from "@/lib/prisma";

import {
  CreateAccountInput,
  UpdateAccountInput,
} from "@/types/account";



// =====================================
// GET ALL ACCOUNTS
// =====================================

export async function getAccountsRepository(
  companyId: number
) {

  return await prisma.account.findMany({

    where: {
      companyId,
    },

    include: {

      parent: true,

      children: true,

    },

    orderBy: {

      code: "asc",

    },

  });

}




// =====================================
// GET SINGLE ACCOUNT
// =====================================

export async function getAccountByIdRepository(
  id: number
) {

  return await prisma.account.findUnique({

    where: {

      id,

    },

    include: {

      parent: true,

      children: true,

    },

  });

}




// =====================================
// CREATE ACCOUNT
// =====================================

export async function createAccountRepository(

  data: CreateAccountInput

) {


  return await prisma.account.create({

    data: {

      code: data.code,

      name: data.name,

      accountType: data.accountType,

      normalBalance: data.normalBalance,

      currency: data.currency,


      parentId:
        data.parentId ?? null,


      companyId:
        data.companyId,


      branchId:
        data.branchId ?? null,


      allowPosting:
        data.allowPosting,


      isSystem:
        data.isSystem,


      isActive:
        data.isActive,


      level:
        data.level,


      description:
        data.description ?? null,

    },

  });

}





// =====================================
// UPDATE ACCOUNT
// =====================================

export async function updateAccountRepository(

  id: number,

  data: UpdateAccountInput

) {


  return await prisma.account.update({

    where: {

      id,

    },


    data,

  });


}





// =====================================
// DELETE ACCOUNT
// =====================================

export async function deleteAccountRepository(

  id:number

) {


  return await prisma.account.delete({

    where: {

      id,

    },

  });


}