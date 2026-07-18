import { prisma } from "@/lib/prisma";



async function main() {


  // ===========================
  // CLEAN OLD DATA (DEV ONLY)
  // ===========================

  await prisma.account.deleteMany();

  await prisma.company.deleteMany();




  // ===========================
  // CREATE COMPANY
  // ===========================


  const company = await prisma.company.create({

    data: {

      name: "Sky Vision",

      legalName: "Sky Vision Aviation",

      industry: "Aviation",

      country: "Egypt",

      currency: "USD",

      fiscalYear: "2026",

      email: "info@skyvision.com",

    },

  });





  // ===========================
  // CHART OF ACCOUNTS
  // ===========================


  const accounts = [


    // ASSETS

    {
      code:"1000",
      name:"Assets",
      type:"ASSET",
      balance:"DEBIT",
      level:1,
      parent:null,
      posting:false,
    },


    {
      code:"1100",
      name:"Cash",
      type:"ASSET",
      balance:"DEBIT",
      level:2,
      parent:"1000",
      posting:true,
    },


    {
      code:"1200",
      name:"Bank",
      type:"ASSET",
      balance:"DEBIT",
      level:2,
      parent:"1000",
      posting:true,
    },


    {
      code:"1300",
      name:"Accounts Receivable",
      type:"ASSET",
      balance:"DEBIT",
      level:2,
      parent:"1000",
      posting:true,
    },


    {
      code:"1400",
      name:"Aircraft Spare Parts Inventory",
      type:"ASSET",
      balance:"DEBIT",
      level:2,
      parent:"1000",
      posting:true,
    },


    {
      code:"1500",
      name:"Aircraft Assets",
      type:"ASSET",
      balance:"DEBIT",
      level:2,
      parent:"1000",
      posting:true,
    },




    // LIABILITIES


    {
      code:"2000",
      name:"Liabilities",
      type:"LIABILITY",
      balance:"CREDIT",
      level:1,
      parent:null,
      posting:false,
    },


    {
      code:"2100",
      name:"Accounts Payable",
      type:"LIABILITY",
      balance:"CREDIT",
      level:2,
      parent:"2000",
      posting:true,
    },


    {
      code:"2200",
      name:"Loans",
      type:"LIABILITY",
      balance:"CREDIT",
      level:2,
      parent:"2000",
      posting:true,
    },


    {
      code:"2300",
      name:"Aircraft Lease Liability",
      type:"LIABILITY",
      balance:"CREDIT",
      level:2,
      parent:"2000",
      posting:true,
    },




    // EQUITY


    {
      code:"3000",
      name:"Equity",
      type:"EQUITY",
      balance:"CREDIT",
      level:1,
      parent:null,
      posting:false,
    },


    {
      code:"3100",
      name:"Capital",
      type:"EQUITY",
      balance:"CREDIT",
      level:2,
      parent:"3000",
      posting:true,
    },


    {
      code:"3200",
      name:"Retained Earnings",
      type:"EQUITY",
      balance:"CREDIT",
      level:2,
      parent:"3000",
      posting:true,
    },




    // REVENUE


    {
      code:"4000",
      name:"Revenue",
      type:"REVENUE",
      balance:"CREDIT",
      level:1,
      parent:null,
      posting:false,
    },


    {
      code:"4100",
      name:"Passenger Flight Revenue",
      type:"REVENUE",
      balance:"CREDIT",
      level:2,
      parent:"4000",
      posting:true,
    },


    {
      code:"4200",
      name:"Cargo Revenue",
      type:"REVENUE",
      balance:"CREDIT",
      level:2,
      parent:"4000",
      posting:true,
    },


    {
      code:"4300",
      name:"Charter Revenue",
      type:"REVENUE",
      balance:"CREDIT",
      level:2,
      parent:"4000",
      posting:true,
    },




    // EXPENSES


    {
      code:"5000",
      name:"Expenses",
      type:"EXPENSE",
      balance:"DEBIT",
      level:1,
      parent:null,
      posting:false,
    },


    {
      code:"5100",
      name:"Fuel Expense",
      type:"EXPENSE",
      balance:"DEBIT",
      level:2,
      parent:"5000",
      posting:true,
    },


    {
      code:"5200",
      name:"Aircraft Maintenance Expense",
      type:"EXPENSE",
      balance:"DEBIT",
      level:2,
      parent:"5000",
      posting:true,
    },


    {
      code:"5300",
      name:"Engine Lease Expense",
      type:"EXPENSE",
      balance:"DEBIT",
      level:2,
      parent:"5000",
      posting:true,
    },


    {
      code:"5400",
      name:"Airport Charges",
      type:"EXPENSE",
      balance:"DEBIT",
      level:2,
      parent:"5000",
      posting:true,
    },


    {
      code:"5500",
      name:"Salaries Expense",
      type:"EXPENSE",
      balance:"DEBIT",
      level:2,
      parent:"5000",
      posting:true,
    },


  ];






  // ===========================
  // INSERT ACCOUNTS
  // ===========================


  for (const acc of accounts) {


    let parentId = null;



    if(acc.parent){


      const parent = await prisma.account.findUnique({

        where:{
          code:acc.parent
        }

      });



      parentId = parent?.id ?? null;

    }






    await prisma.account.create({

      data:{


        code:acc.code,

        name:acc.name,

        accountType:acc.type,

        normalBalance:acc.balance,

        currency:"USD",

        companyId:company.id,

        parentId,

        allowPosting:acc.posting,

        isSystem:true,

        isActive:true,

        level:acc.level,


      }

    });



  }




  console.log(
    "Aviation Chart of Accounts Created Successfully"
  );


}





main()

.catch((error)=>{

  console.error(error);

  process.exit(1);

})


.finally(async()=>{

  await prisma.$disconnect();

});