import {
  getCompaniesService,
  createCompanyService,
  updateCompanyService,
} from "@/services/company.service";



// =====================================
// GET ALL COMPANIES
// =====================================

export async function GET() {

  try {

    const companies = await getCompaniesService();


    return Response.json(companies);


  } catch (error) {


    console.error(error);


    return Response.json(
      {
        success:false,
        message:"Failed to load companies"
      },
      {
        status:500
      }
    );


  }

}





// =====================================
// CREATE COMPANY
// =====================================

export async function POST(
  request:Request
){


  try {


    const body = await request.json();



    const company = await createCompanyService(
      body
    );



    return Response.json({

      success:true,

      data:company

    });



  } catch(error){


    console.error(error);



    return Response.json(
      {
        success:false,
        message:"Failed to create company"
      },
      {
        status:500
      }
    );


  }


}







// =====================================
// UPDATE COMPANY
// =====================================

export async function PUT(
  request:Request
){


  try {


    const body = await request.json();



    const company = await updateCompanyService(

      Number(body.id),

      {

        name: body.name,

        legalName: body.legalName,

        industry: body.industry,

        country: body.country,

        currency: body.currency,

        fiscalYear: body.fiscalYear,

        email: body.email ?? null,

        phone: body.phone ?? null,

        address: body.address ?? null,

      }

    );



    return Response.json({

      success:true,

      data:company

    });



  } catch(error){


    console.error(error);



    return Response.json(

      {

        success:false,

        message:"Failed to update company"

      },

      {

        status:500

      }

    );


  }


}