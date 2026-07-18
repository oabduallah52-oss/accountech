import {
  getCompanyByIdService,
  updateCompanyService,
  deleteCompanyService,
} from "@/services/company.service";

// ===============================
// GET COMPANY BY ID
// ===============================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const company = await getCompanyByIdService(Number(id));

    if (!company) {
      return Response.json(
        {
          success: false,
          message: "Company not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(company);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to load company",
      },
      {
        status: 500,
      }
    );
  }
}

// ===============================
// UPDATE COMPANY
// ===============================
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const company = await updateCompanyService(
      Number(id),
      body
    );

    return Response.json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to update company",
      },
      {
        status: 500,
      }
    );
  }
}

// ===============================
// DELETE COMPANY
// ===============================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await deleteCompanyService(Number(id));

    return Response.json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to delete company",
      },
      {
        status: 500,
      }
    );
  }
}