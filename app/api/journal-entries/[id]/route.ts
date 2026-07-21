import { NextRequest, NextResponse } from "next/server";

import {
  getJournalEntryByIdService,
  updateJournalEntryService,
} from "@/services/journal-entry.service";

function parseEntryId(id: string): number | null {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const entryId = parseEntryId(id);

    if (!entryId) {
      return NextResponse.json({ message: "Journal entry id is invalid." }, { status: 400 });
    }

    const entry = await getJournalEntryByIdService(entryId);

    if (!entry) {
      return NextResponse.json({ message: "Journal entry not found." }, { status: 404 });
    }

    return NextResponse.json(entry, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to fetch journal entry." },
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
    const entryId = parseEntryId(id);

    if (!entryId) {
      return NextResponse.json({ message: "Journal entry id is invalid." }, { status: 400 });
    }

    const payload = await request.json();
    const entry = await updateJournalEntryService(entryId, payload);

    return NextResponse.json(entry, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to update journal entry." },
      { status: 400 },
    );
  }
}
