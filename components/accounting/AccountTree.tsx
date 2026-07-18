"use client";


import { useState } from "react";

import {
  ChevronDown,
  ChevronRight,
  Folder,
  FileText,
} from "lucide-react";


import { Account } from "@/types/account";



interface Props {

  accounts: Account[];

}





export default function AccountTree({

  accounts,

}: Props) {



  const [expanded,setExpanded] =
    useState<number[]>([]);




  function toggle(id:number){


    setExpanded((prev)=>

      prev.includes(id)

      ?

      prev.filter(
        item=>item !== id
      )

      :

      [
        ...prev,
        id
      ]

    );


  }





  const rootAccounts =
    accounts.filter(

      account =>
        !account.parentId

    );






  function renderChildren(

    parentId:number,

    level:number

  ){



    const children =
      accounts.filter(

        account =>
          account.parentId === parentId

      );





    if(children.length === 0)

      return null;






    return (

      <div>


        {
          children.map(account=>(


            <div

              key={account.id}

              className="
                ml-8
                mt-2
              "

            >



              <div

                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-slate-700
                  bg-[#111C34]
                  p-4
                  text-white
                "

              >




                <div className="
                  flex
                  items-center
                  gap-3
                ">




                  {
                    accounts.some(

                      a =>
                        a.parentId === account.id

                    )

                    ?

                    <button

                      onClick={()=>toggle(account.id)}

                    >

                      {
                        expanded.includes(account.id)

                        ?

                        <ChevronDown size={18}/>

                        :

                        <ChevronRight size={18}/>

                      }


                    </button>

                    :

                    <FileText size={18}/>

                  }





                  <div>


                    <div className="font-semibold">

                      {account.code}
                      {" - "}
                      {account.name}

                    </div>



                    <div className="
                      text-xs
                      text-slate-400
                    ">


                      {account.accountType}

                      {" | "}

                      {account.currency}


                    </div>


                  </div>


                </div>





                <span className="
                  rounded-full
                  bg-cyan-500
                  px-3
                  py-1
                  text-xs
                  text-black
                ">


                  {
                    account.normalBalance
                  }


                </span>



              </div>





              {
                expanded.includes(account.id)

                &&

                renderChildren(
                  account.id,
                  level + 1
                )

              }





            </div>


          ))

        }


      </div>

    );


  }








  return (

    <div className="space-y-4">


      {
        rootAccounts.map(account=>(


          <div

            key={account.id}

          >



            <div

              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-700
                bg-[#0B162C]
                p-5
                text-white
              "

            >



              <div className="
                flex
                items-center
                gap-3
              ">



                {
                  accounts.some(

                    a =>
                      a.parentId === account.id

                  )

                  ?

                  <button

                    onClick={()=>toggle(account.id)}

                  >

                    {
                      expanded.includes(account.id)

                      ?

                      <ChevronDown/>

                      :

                      <ChevronRight/>

                    }

                  </button>

                  :

                  <Folder/>

                }




                <div>

                  <h3 className="
                    text-lg
                    font-bold
                  ">

                    {account.code}
                    {" - "}
                    {account.name}

                  </h3>



                  <p className="
                    text-sm
                    text-slate-400
                  ">

                    {account.accountType}

                  </p>


                </div>



              </div>




            </div>





            {
              expanded.includes(account.id)

              &&

              renderChildren(
                account.id,
                1
              )

            }



          </div>


        ))

      }



    </div>

  );

}