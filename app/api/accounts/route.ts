import { NextRequest, NextResponse } from "next/server";

import {
  createAccountService,
  getAccountsService,
} from "@/services/account.service";
import { CreateAccountInput } from "@/types/account";

function toBoolean(value: unknown): boolean | undefined {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    if (value.toLowerCase() === "true") {
      return true;
    }

    if (value.toLowerCase() === "false") {
      return false;
    }
  }

  return undefined;
}

function validateAccountPayload(payload: unknown): { valid: boolean; issues: string[]; data?: CreateAccountInput } {
  if (!payload || typeof payload !== "object") {
    return {
      valid: false,
      issues: ["A valid account payload is required."],
    };
  }

  const body = payload as Record<string, unknown>;
  const issues: string[] = [];

  const code = typeof body.code === "string" ? body.code.trim() : "";
  const arabicName = typeof body.arabicName === "string" ? body.arabicName.trim() : "";
  const englishName = typeof body.englishName === "string" ? body.englishName.trim() : "";
  const accountClass = typeof body.accountClass === "string" ? body.accountClass : "";
  const accountType = typeof body.accountType === "string" ? body.accountType : "";
  const normalBalance = typeof body.normalBalance === "string" ? body.normalBalance : "";
  const currency = typeof body.currency === "string" ? body.currency.trim() : "USD";
  const parentId = body.parentId === undefined || body.parentId === null || body.parentId === "" ? null : Number(body.parentId);
  const allowPosting = toBoolean(body.allowPosting);
  const controlAccount = toBoolean(body.controlAccount);
  const systemAccount = toBoolean(body.systemAccount);
  const isActive = toBoolean(body.isActive);
  const description = typeof body.description === "string" ? body.description.trim() : null;

  if (!code) issues.push("Account code is required.");
  if (!arabicName) issues.push("Arabic name is required.");
  if (!englishName) issues.push("English name is required.");
  if (!accountClass) issues.push("Account class is required.");
  if (!accountType) issues.push("Account type is required.");
  if (!normalBalance) issues.push("Normal balance is required.");

  if (parentId !== null && Number.isNaN(parentId)) {
    issues.push("Parent account must be a valid number.");
  }

  if (issues.length > 0) {
    return { valid: false, issues };
  }

  return {
    valid: true,
    issues: [],
    data: {
      code,
      arabicName,
      englishName,
      accountClass: accountClass as CreateAccountInput["accountClass"],
      accountType,
      normalBalance: normalBalance as CreateAccountInput["normalBalance"],
      parentId: parentId ?? null,
      currency,
      allowPosting: allowPosting ?? true,
      controlAccount: controlAccount ?? false,
      systemAccount: systemAccount ?? false,
      isActive: isActive ?? true,
      description,
    },
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const accounts = await getAccountsService({
      search: searchParams.get("search") ?? undefined,
      accountType: searchParams.get("type") ?? undefined,
      status: searchParams.get("status") ? searchParams.get("status") === "active" : undefined,
      posting: searchParams.get("posting") ? searchParams.get("posting") === "true" : undefined,
    });

    return NextResponse.json(accounts, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to fetch accounts." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = validateAccountPayload(body);

    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        { message: validation.issues.join(" ") },
        { status: 400 },
      );
    }

    const account = await createAccountService(validation.data);

    return NextResponse.json(account, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to create account." },
      { status: 400 },
    );
  }
}