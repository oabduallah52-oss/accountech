import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ===============================
// GET ALL COMPANIES
// ===============================
export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        branches: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return Response.json(companies);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to load companies",
      },
      {
        status: 500,
      }
    );
  }
}

// ===============================
// CREATE COMPANY
// ===============================
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const company = await prisma.company.create({
      data: {
        name: body.name,
        legalName: body.legalName,
        industry: body.industry,
        country: body.country,
        currency: body.currency,
        fiscalYear: body.fiscalYear,
        email: body.email ?? null,
        phone: body.phone ?? null,
        address: body.address ?? null,
      },
    });

    return Response.json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to create company",
      },
      {
        status: 500,
      }
    );
  }
}