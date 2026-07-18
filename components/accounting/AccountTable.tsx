"use client";


import {
  Pencil,
  Trash2,
  FolderTree,
} from "lucide-react";


import useAccounts from "@/hooks/useAccounts";



interface Props {

  companyId: number;

}




export default function AccountTable({

  companyId

}: Props) {


  const {

    accounts,

    loading,

    error,

    refresh,

  } = useAccounts(companyId);






  async function deleteAccount(

    id:number,

    name:string

  ){


    const confirmDelete =
      confirm(
        `Delete ${name}?`
      );


    if(!confirmDelete)
      return;



    const response =
      await fetch(

        `/api/accounts/${id}`,

        {
          method:"DELETE",
        }

      );



    if(response.ok){

      alert(
        "Account deleted"
      );

      refresh();

    }


  }







  if(loading){

    return (

      <div className="
        rounded-2xl
        bg-[#111C34]
        p-6
        text-white
      ">

        Loading accounts...

      </div>

    );

  }





  if(error){

    return (

      <div className="
        rounded-2xl
        bg-red-900
        p-6
        text-red-200
      ">

        {error}

      </div>

    );

  }







  return (

    <div className="
      overflow-hidden
      rounded-3xl
      border
      border-slate-700
      bg-[#111C34]
    ">



      <table className="w-full">


        <thead className="
          bg-[#0B162C]
          text-slate-300
        ">

          <tr>


            <th className="p-5 text-left">
              Code
            </th>


            <th className="p-5 text-left">
              Account Name
            </th>


            <th className="p-5 text-left">
              Type
            </th>


            <th className="p-5 text-left">
              Balance
            </th>


            <th className="p-5 text-left">
              Currency
            </th>


            <th className="p-5 text-center">
              Actions
            </th>


          </tr>


        </thead>





        <tbody>


        {accounts.map((account)=>(


          <tr

            key={account.id}

            className="
              border-t
              border-slate-700
              hover:bg-[#162344]
            "

          >



            <td className="
              p-5
              text-cyan-400
              font-semibold
            ">

              {account.code}

            </td>





            <td className="p-5">


              <div className="
                flex
                items-center
                gap-3
                text-white
              ">


                <FolderTree
                  size={20}
                  className="text-cyan-400"
                />


                <div>


                  <p className="font-semibold">

                    {account.name}

                  </p>



                  {
                    account.parent &&
                    (

                    <p className="
                      text-xs
                      text-slate-400
                    ">

                      Parent:
                      {" "}
                      {account.parent.name}

                    </p>

                    )
                  }


                </div>


              </div>


            </td>






            <td className="
              p-5
              text-slate-300
            ">

              {account.accountType}

            </td>





            <td className="
              p-5
              text-slate-300
            ">

              {account.normalBalance}

            </td>






            <td className="
              p-5
              text-slate-300
            ">

              {account.currency}

            </td>






            <td className="p-5">


              <div className="
                flex
                justify-center
                gap-3
              ">



                <button

                  className="
                    rounded-lg
                    bg-blue-500
                    p-3
                    hover:bg-blue-600
                  "

                  onClick={()=>{

                    alert(
                      "Edit Account coming next"
                    );

                  }}

                >

                  <Pencil
                    size={18}
                    className="text-white"
                  />


                </button>





                <button

                  onClick={()=>deleteAccount(

                    account.id,

                    account.name

                  )}

                  className="
                    rounded-lg
                    bg-red-500
                    p-3
                    hover:bg-red-600
                  "

                >

                  <Trash2

                    size={18}

                    className="text-white"

                  />


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