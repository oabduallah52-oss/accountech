import { NextRequest, NextResponse } from "next/server";

import {
  getAccountsService,
  createAccountService,
} from "@/services/account.service";


// =====================================
// GET ALL ACCOUNTS
// =====================================

export async function GET() {

  try {

    const accounts =
      await getAccountsService();


    return NextResponse.json(
      accounts,
      {
        status: 200,
      }
    );


  } catch (error: any) {

    return NextResponse.json(
      {
        message:
          error.message ||
          "Failed to fetch accounts",
      },
      {
        status: 500,
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
      await createAccountService(body);


    return NextResponse.json(
      account,
      {
        status: 201,
      }
    );


  } catch(error: any) {


    return NextResponse.json(
      {
        message:
          error.message ||
          "Failed to create account",
      },
      {
        status: 500,
      }
    );

  }

}