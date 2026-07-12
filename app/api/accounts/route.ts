import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {

    const accounts = await prisma.account.findMany({
      include: {
        parent: true,
        children: true,
      },
      orderBy: {
        code: "asc",
      },
    });

    return NextResponse.json(accounts);

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to fetch accounts" },
      { status: 500 }
    );

  }
}

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const account = await prisma.account.create({

      data: {

        code: body.code,

        name: body.name,

        accountType: body.accountType,

        normalBalance: body.normalBalance,

        currency: body.currency,

        isActive: body.isActive,

        parentId: body.parentId,

      },

    });

    return NextResponse.json(account);

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );

  }

}