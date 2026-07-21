import { NextRequest, NextResponse } from "next/server";

import {
  deleteAccountService,
  getAccountByIdService,
  updateAccountService,
} from "@/services/account.service";

function parseAccountId(id: string): number | null {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const accountId = parseAccountId(id);

    if (!accountId) {
      return NextResponse.json({ message: "Account id is invalid." }, { status: 400 });
    }

    const account = await getAccountByIdService(accountId);

    if (!account) {
      return NextResponse.json({ message: "Account not found." }, { status: 404 });
    }

    return NextResponse.json(account, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to get account." },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const accountId = parseAccountId(id);

    if (!accountId) {
      return NextResponse.json({ message: "Account id is invalid." }, { status: 400 });
    }

    const payload = await request.json();
    const account = await updateAccountService(accountId, payload);

    return NextResponse.json(account, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to update account." },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const accountId = parseAccountId(id);

    if (!accountId) {
      return NextResponse.json({ message: "Account id is invalid." }, { status: 400 });
    }

    await deleteAccountService(accountId);

    return NextResponse.json({ message: "Account deleted successfully." }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to delete account." },
      { status: 400 },
    );
  }
}
