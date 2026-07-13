import {
  getCompaniesService,
  createCompanyService,
} from "@/services/company.service";


// GET ALL COMPANIES
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


// CREATE COMPANY
export async function POST(request:Request){

  try {

    const body = await request.json();


    const company = await createCompanyService(body);


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