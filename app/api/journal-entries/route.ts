import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function messageFrom(error: unknown) {
  return error instanceof Error ? error.message : "Journal entry request failed";
}

export async function GET() {
  try {
    const entries = await prisma.journalEntry.findMany({ include: { lines: { include: { account: true } } }, orderBy: { entryDate: "desc" } });
    return NextResponse.json(entries);
  } catch (error: unknown) {
    return NextResponse.json({ message: messageFrom(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const entry = await prisma.journalEntry.create({ data: { entryNumber: body.entryNumber, entryDate: new Date(body.entryDate), description: body.description ?? null, status: body.status ?? "DRAFT", lines: { create: body.lines ?? [] } }, include: { lines: true } });
    return NextResponse.json(entry, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ message: messageFrom(error) }, { status: 500 });
  }
}
