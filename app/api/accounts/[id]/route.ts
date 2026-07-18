import { NextRequest, NextResponse } from "next/server";


import {
  getAccountByIdService,
  updateAccountService,
  deleteAccountService,
} from "@/services/account.service";



// =====================================
// GET SINGLE ACCOUNT
// =====================================

export async function GET(

  request: NextRequest,

  context: {
    params: Promise<{
      id: string;
    }>;
  }

) {


  try {


    const { id } =
      await context.params;



    const accountId =
      Number(id);



    const account =
      await getAccountByIdService(
        accountId
      );



    if (!account) {


      return NextResponse.json(

        {
          message:
            "Account not found",
        },

        {
          status:404,
        }

      );


    }




    return NextResponse.json(

      account,

      {
        status:200,
      }

    );



  } catch(error:any){


    return NextResponse.json(

      {
        message:
          error.message ||
          "Failed to get account",
      },

      {
        status:500,
      }

    );


  }

}






// =====================================
// UPDATE ACCOUNT
// =====================================

export async function PUT(

  request: NextRequest,

  context: {
    params: Promise<{
      id:string;
    }>;
  }

) {


  try {


    const { id } =
      await context.params;



    const accountId =
      Number(id);



    const body =
      await request.json();



    const account =
      await updateAccountService(

        accountId,

        body

      );



    return NextResponse.json(

      account,

      {
        status:200,
      }

    );



  } catch(error:any){


    return NextResponse.json(

      {
        message:
          error.message ||
          "Failed to update account",
      },

      {
        status:500,
      }

    );


  }

}






// =====================================
// DELETE ACCOUNT
// =====================================

export async function DELETE(

  request: NextRequest,

  context: {
    params: Promise<{
      id:string;
    }>;
  }

) {


  try {


    const { id } =
      await context.params;



    const accountId =
      Number(id);



    await deleteAccountService(

      accountId

    );



    return NextResponse.json(

      {
        message:
          "Account deleted successfully",
      },

      {
        status:200,
      }

    );



  } catch(error:any){


    return NextResponse.json(

      {
        message:
          error.message ||
          "Failed to delete account",
      },

      {
        status:500,
      }

    );


  }

}