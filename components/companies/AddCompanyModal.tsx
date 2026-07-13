"use client";

import { useState } from "react";
import { X } from "lucide-react";


export default function AddCompanyModal() {

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    legalName: "",
    country: "",
    currency: "",
    industry: "",
    fiscalYear: "",
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };



  async function saveCompany() {

    try {

      const response = await fetch(
        "/api/companies",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),

        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message || "Failed"
        );

      }


      alert("Company created successfully");


      setOpen(false);


      setForm({
        name: "",
        legalName: "",
        country: "",
        currency: "",
        industry: "",
        fiscalYear: "",
      });


      window.location.reload();


    } catch (error) {

      console.error(error);

      alert("Error creating company");

    }

  }



  return (

    <>

      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black hover:bg-cyan-600"
      >
        + New Company
      </button>



      {open && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">


          <div className="w-[700px] rounded-2xl border border-slate-700 bg-[#111C34] p-8">


            <div className="mb-6 flex items-center justify-between">


              <h2 className="text-2xl font-bold text-white">
                Add New Company
              </h2>


              <button
                onClick={() => setOpen(false)}
              >
                <X className="text-white" />
              </button>


            </div>



            <div className="grid grid-cols-2 gap-5">


              {[
                ["name","Company Name"],
                ["legalName","Legal Name"],
                ["country","Country"],
                ["currency","Currency"],
                ["industry","Industry"],
                ["fiscalYear","Fiscal Year"],
              ].map(([name,placeholder]) => (


                <input

                  key={name}

                  name={name}

                  value={
                    form[name as keyof typeof form]
                  }

                  onChange={handleChange}

                  placeholder={placeholder}

                  className="rounded-xl bg-[#071426] border border-slate-700 p-3 text-white"

                />


              ))}


            </div>



            <div className="mt-8 flex justify-end gap-3">


              <button

                onClick={() => setOpen(false)}

                className="rounded-xl border border-slate-600 px-5 py-3 text-white"

              >

                Cancel

              </button>



              <button

                onClick={saveCompany}

                className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black"

              >

                Save Company

              </button>



            </div>


          </div>


        </div>

      )}


    </>

  );

}