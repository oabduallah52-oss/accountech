"use client";

import {
  Eye,
  Pencil,
  Trash2,
  Building2,
} from "lucide-react";

import useCompanies from "@/hooks/useCompanies";


export default function CompanyTable() {

  const {
    companies,
    loading,
    error,
  } = useCompanies();



  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-700 bg-[#111C34] p-8 text-white">
        Loading companies...
      </div>
    );
  }



  if (error) {
    return (
      <div className="rounded-3xl border border-red-500 bg-[#111C34] p-8 text-red-400">
        {error}
      </div>
    );
  }



  async function deleteCompany(id:number,name:string){

    const confirmDelete =
      confirm(`Delete ${name} ?`);


    if(!confirmDelete) return;


    const response =
      await fetch(
        `/api/companies/${id}`,
        {
          method:"DELETE"
        }
      );


    if(response.ok){

      alert("Company deleted");

      window.location.reload();

    }

  }



  function viewCompany(company:any){

    alert(
`
Company Name:
${company.name}

Legal Name:
${company.legalName}

Country:
${company.country}

Currency:
${company.currency}

Industry:
${company.industry}

Fiscal Year:
${company.fiscalYear}
`
    );

  }




  function editCompany(company:any){

    console.log("Edit Company",company);

    alert(
      "Edit function will open in the next step"
    );

  }




  return (

    <div className="overflow-hidden rounded-3xl border border-slate-700 bg-[#111C34] shadow-xl">


      <table className="w-full">


        <thead className="bg-[#0B162C]">


          <tr className="text-left text-slate-300">

            <th className="p-5">Company</th>

            <th className="p-5">Legal Name</th>

            <th className="p-5">Country</th>

            <th className="p-5">Currency</th>

            <th className="p-5">Industry</th>

            <th className="p-5">Status</th>

            <th className="p-5 text-center">
              Actions
            </th>

          </tr>


        </thead>



        <tbody>


        {companies.map((company)=>(


          <tr

          key={company.id}

          className="border-t border-slate-700 hover:bg-[#162344]"

          >



            <td className="p-5">


              <div className="flex items-center gap-4">


                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500">

                  <Building2
                  size={22}
                  className="text-white"
                  />

                </div>



                <div>


                  <h3 className="font-semibold text-white">

                    {company.name}

                  </h3>



                  <p className="text-xs text-slate-400">

                    ID : {company.id}

                  </p>


                </div>


              </div>


            </td>




            <td className="p-5 text-slate-300">

              {company.legalName}

            </td>



            <td className="p-5 text-slate-300">

              {company.country}

            </td>



            <td className="p-5 text-slate-300">

              {company.currency}

            </td>



            <td className="p-5 text-slate-300">

              {company.industry}

            </td>




            <td className="p-5">

              <span className="rounded-full bg-emerald-500 px-4 py-2 text-xs text-white">

                Active

              </span>


            </td>





            <td className="p-5">


              <div className="flex justify-center gap-3">



                <button

                onClick={()=>viewCompany(company)}

                className="rounded-lg bg-cyan-500 p-3 hover:bg-cyan-600"

                >

                  <Eye size={18}/>

                </button>





                <button

                onClick={()=>editCompany(company)}

                className="rounded-lg bg-blue-500 p-3 hover:bg-blue-600"

                >

                  <Pencil size={18}/>

                </button>





                <button

                onClick={()=>deleteCompany(company.id,company.name)}

                className="rounded-lg bg-red-500 p-3 hover:bg-red-600"

                >

                  <Trash2 size={18}/>

                </button>




              </div>


            </td>




          </tr>



        ))}



        </tbody>



      </table>



    </div>

  );

}