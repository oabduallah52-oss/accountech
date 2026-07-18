import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


// GET ALL COMPANIES
export async function GET() {

  try {

    const companies = await prisma.company.findMany({
      orderBy:{
        id:"desc"
      }
    });


    return NextResponse.json(companies);


  } catch(error){

    console.log(error);

    return NextResponse.json(
      {
        error:"Failed to fetch companies"
      },
      {
        status:500
      }
    );

  }

}


// CREATE COMPANY
export async function POST(req: Request) {

  const body = await req.json();

  const company = await prisma.company.create({
    data:{
      name: body.name
    }
  });


  const accounts = [
    ["1000","الأصول","ASSET"],
    ["1100","النقدية والبنوك","ASSET"],
    ["1200","العملاء","ASSET"],
    ["1300","المخزون","ASSET"],

    ["2000","الالتزامات","LIABILITY"],
    ["2100","الموردين","LIABILITY"],
    ["2200","القروض","LIABILITY"],

    ["3000","حقوق الملكية","EQUITY"],

    ["4000","الإيرادات","REVENUE"],

    ["5000","المصروفات","EXPENSE"],
    ["5100","مصروفات التشغيل","EXPENSE"],
    ["5200","الصيانة","EXPENSE"],
    ["5300","الوقود","EXPENSE"],
  ];


  await prisma.account.createMany({
    data: accounts.map((a)=>({
      code:a[0],
      name:a[1],
      type:a[2],
      companyId:company.id
    }))
  });


  return NextResponse.json({
    message:"Company created",
    company
  });

}