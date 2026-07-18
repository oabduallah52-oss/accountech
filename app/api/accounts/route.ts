import { NextRequest, NextResponse } from "next/server";


import {
  getAccountsService,
  createAccountService,
} from "@/services/account.service";



// =====================================
// GET ALL ACCOUNTS
// =====================================

export async function GET(
  request: NextRequest
) {

  try {


    const companyId =
      Number(
        request.nextUrl.searchParams.get(
          "companyId"
        )
      );



    if (!companyId) {

      return NextResponse.json(

        {
          message:
            "Company ID is required",
        },

        {
          status: 400,
        }

      );

    }




    const accounts =
      await getAccountsService(
        companyId
      );



    return NextResponse.json(
      accounts,
      {
        status: 200,
      }
    );



  } catch (error:any) {


    return NextResponse.json(

      {
        message:
          error.message ||
          "Failed to fetch accounts",
      },

      {
        status:500,
      }

    );


  }

}




// =====================================
// CREATE ACCOUNT
// =====================================

export async function POST(

  request: NextRequest

) {


  try {


    const body =
      await request.json();



    const account =
      await createAccountService(
        body
      );



    return NextResponse.json(

      account,

      {
        status:201,
      }

    );



  } catch(error:any){


    return NextResponse.json(

      {
        message:
          error.message ||
          "Failed to create account",
      },

      {
        status:500,
      }

    );


  }

}