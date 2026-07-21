import { NextRequest, NextResponse } from "next/server";

import {
  createJournalEntryService,
  getJournalEntriesService,
} from "@/services/journal-entry.service";
import { CreateJournalEntryInput } from "@/types/journal";

function toStatus(value: string | null): "DRAFT" | "POSTED" | undefined {
  if (!value) {
    return undefined;
  }

  if (value === "DRAFT" || value === "POSTED") {
    return value;
  }

  return undefined;
}

function normalizePayload(payload: unknown): CreateJournalEntryInput | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const body = payload as Record<string, unknown>;
  const lines = Array.isArray(body.lines) ? body.lines : [];

  const normalizedLines = lines.map((rawLine) => {
    const line = rawLine as Record<string, unknown>;
    const description = typeof line.description === "string" ? line.description : null;

    return {
      accountId: Number(line.accountId),
      description,
      debit: Number(line.debit ?? 0),
      credit: Number(line.credit ?? 0),
    };
  });

  return {
    entryNumber: typeof body.entryNumber === "string" ? body.entryNumber : "",
    entryDate: typeof body.entryDate === "string" ? body.entryDate : "",
    description: typeof body.description === "string" ? body.description : null,
    status: typeof body.status === "string" ? (body.status as "DRAFT" | "POSTED") : "DRAFT",
    lines: normalizedLines,
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const entries = await getJournalEntriesService({
      search: searchParams.get("search") ?? undefined,
      status: toStatus(searchParams.get("status")),
    });

    return NextResponse.json(entries, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to fetch journal entries." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = normalizePayload(body);

    if (!payload) {
      return NextResponse.json({ message: "A valid journal entry payload is required." }, { status: 400 });
    }

    const entry = await createJournalEntryService(payload);

    return NextResponse.json(entry, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to create journal entry." },
      { status: 400 },
    );
  }
}
