"use client";

import { useState } from "react";
import { Pencil, X } from "lucide-react";

import { Account } from "@/types/account";


interface Props {

  account: Account;

  onUpdated: () => void;

}



export default function EditAccountModal({

  account,

  onUpdated,

}: Props) {



  const [open,setOpen] = useState(false);



  const [form,setForm] = useState({

    code: account.code,

    name: account.name,

    accountType: account.accountType,

    normalBalance: account.normalBalance,

    currency: account.currency,

    allowPosting: account.allowPosting,

    isActive: account.isActive,

    level: account.level,

    description: account.description ?? "",

  });







  function handleChange(

    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >

  ){


    const {name,value} = e.target;


    setForm({

      ...form,

      [name]:value,

    });


  }







  async function updateAccount(){


    try{


      const response =
        await fetch(

          `/api/accounts/${account.id}`,

          {

            method:"PUT",

            headers:{

              "Content-Type":
              "application/json",

            },


            body:JSON.stringify({

              ...form,

              level:Number(form.level),

            }),

          }

        );




      const data =
        await response.json();





      if(!response.ok){

        throw new Error(
          data.message
        );

      }





      alert(
        "Account updated successfully"
      );



      setOpen(false);


      onUpdated();




    }catch(error:any){


      alert(
        error.message ||
        "Update failed"
      );


    }


  }






  return (

    <>


      <button

        onClick={()=>setOpen(true)}

        className="
          rounded-lg
          bg-blue-500
          p-3
          hover:bg-blue-600
        "

      >

        <Pencil
          size={18}
          className="text-white"
        />

      </button>







      {
        open && (


        <div className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/60
        ">



          <div className="
            w-[700px]
            rounded-3xl
            border
            border-slate-700
            bg-[#111C34]
            p-8
          ">



            <div className="
              mb-6
              flex
              justify-between
            ">



              <h2 className="
                text-2xl
                font-bold
                text-white
              ">

                Edit Account

              </h2>



              <button
                onClick={()=>setOpen(false)}
              >

                <X className="text-white"/>

              </button>


            </div>







            <div className="
              grid
              grid-cols-2
              gap-5
            ">





              <input

                name="code"

                value={form.code}

                onChange={handleChange}

                className="
                  rounded-xl
                  border
                  border-slate-700
                  bg-[#071426]
                  p-3
                  text-white
                "

              />





              <input

                name="name"

                value={form.name}

                onChange={handleChange}

                className="
                  rounded-xl
                  border
                  border-slate-700
                  bg-[#071426]
                  p-3
                  text-white
                "

              />







              <select

                name="accountType"

                value={form.accountType}

                onChange={handleChange}

                className="
                  rounded-xl
                  border
                  border-slate-700
                  bg-[#071426]
                  p-3
                  text-white
                "

              >

                <option value="ASSET">
                  Asset
                </option>


                <option value="LIABILITY">
                  Liability
                </option>


                <option value="EQUITY">
                  Equity
                </option>


                <option value="REVENUE">
                  Revenue
                </option>


                <option value="EXPENSE">
                  Expense
                </option>


              </select>






              <select

                name="normalBalance"

                value={form.normalBalance}

                onChange={handleChange}

                className="
                  rounded-xl
                  border
                  border-slate-700
                  bg-[#071426]
                  p-3
                  text-white
                "

              >

                <option value="DEBIT">
                  Debit
                </option>


                <option value="CREDIT">
                  Credit
                </option>


              </select>







              <input

                name="currency"

                value={form.currency}

                onChange={handleChange}

                className="
                  rounded-xl
                  border
                  border-slate-700
                  bg-[#071426]
                  p-3
                  text-white
                "

              />






              <input

                name="level"

                type="number"

                value={form.level}

                onChange={handleChange}

                className="
                  rounded-xl
                  border
                  border-slate-700
                  bg-[#071426]
                  p-3
                  text-white
                "

              />





            </div>








            <textarea

              name="description"

              value={form.description}

              onChange={handleChange}

              className="
                mt-5
                w-full
                rounded-xl
                border
                border-slate-700
                bg-[#071426]
                p-3
                text-white
              "

            />







            <div className="
              mt-8
              flex
              justify-end
            ">


              <button

                onClick={updateAccount}

                className="
                  rounded-xl
                  bg-cyan-500
                  px-6
                  py-3
                  font-semibold
                  text-black
                "

              >

                Update Account

              </button>


            </div>




          </div>


        </div>


        )
      }



    </>

  );

}