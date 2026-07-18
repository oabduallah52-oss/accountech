"use client";


import { useState } from "react";
import { X } from "lucide-react";


interface Props {

  companyId: number;

  onCreated: () => void;

}



export default function AddAccountModal({

  companyId,

  onCreated,

}: Props) {



  const [open,setOpen] = useState(false);



  const [form,setForm] = useState({

    code:"",

    name:"",

    accountType:"ASSET",

    normalBalance:"DEBIT",

    currency:"USD",

    parentId:"",

    allowPosting:true,

    isSystem:false,

    isActive:true,

    level:1,

    description:"",

  });








  function handleChange(

    e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>

  ){


    const {name,value} = e.target;


    setForm({

      ...form,

      [name]:value,

    });


  }







  async function saveAccount(){


    try{


      const response =
        await fetch(

          "/api/accounts",

          {

            method:"POST",

            headers:{

              "Content-Type":
              "application/json",

            },


            body:JSON.stringify({

              ...form,

              companyId,

              parentId:
                form.parentId
                ?
                Number(form.parentId)
                :
                null,

              level:
                Number(form.level),

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
        "Account created successfully"
      );



      setOpen(false);



      onCreated();




    }catch(error:any){


      alert(
        error.message ||
        "Error creating account"
      );


    }


  }







  return (

    <>



      <button

        onClick={()=>setOpen(true)}

        className="
          rounded-xl
          bg-cyan-500
          px-5
          py-3
          font-semibold
          text-black
        "

      >

        + New Account

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
            bg-[#111C34]
            p-8
            border
            border-slate-700
          ">




            <div className="
              mb-6
              flex
              justify-between
              items-center
            ">



              <h2 className="
                text-2xl
                font-bold
                text-white
              ">

                Add New Account

              </h2>




              <button
                onClick={()=>setOpen(false)}
              >

                <X
                  className="text-white"
                />

              </button>



            </div>







            <div className="
              grid
              grid-cols-2
              gap-5
            ">





              <input

                name="code"

                placeholder="Account Code"

                value={form.code}

                onChange={handleChange}

                className="
                  input-style
                "

              />




              <input

                name="name"

                placeholder="Account Name"

                value={form.name}

                onChange={handleChange}

                className="
                  input-style
                "

              />







              <select

                name="accountType"

                value={form.accountType}

                onChange={handleChange}

                className="
                  input-style
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
                  input-style
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

                placeholder="Currency"

                value={form.currency}

                onChange={handleChange}

                className="
                  input-style
                "

              />





              <input

                name="level"

                type="number"

                placeholder="Level"

                value={form.level}

                onChange={handleChange}

                className="
                  input-style
                "

              />





            </div>







            <textarea

              name="description"

              placeholder="Description"

              value={form.description}

              onChange={(e)=>setForm({

                ...form,

                description:e.target.value

              })}

              className="
                mt-5
                w-full
                rounded-xl
                bg-[#071426]
                border
                border-slate-700
                p-3
                text-white
              "

            />








            <div className="
              mt-8
              flex
              justify-end
              gap-3
            ">



              <button

                onClick={()=>setOpen(false)}

                className="
                  rounded-xl
                  border
                  border-slate-600
                  px-5
                  py-3
                  text-white
                "

              >

                Cancel

              </button>





              <button

                onClick={saveAccount}

                className="
                  rounded-xl
                  bg-cyan-500
                  px-6
                  py-3
                  font-semibold
                  text-black
                "

              >

                Save Account

              </button>



            </div>





          </div>


        </div>


        )
      }




    </>

  );

}