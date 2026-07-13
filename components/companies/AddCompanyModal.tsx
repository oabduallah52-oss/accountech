"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";


type Company = {

  id?: number;
  name: string;
  legalName: string;
  country: string;
  currency: string;
  industry: string;
  fiscalYear: string;

};



export default function AddCompanyModal({

  open,
  setOpen,
  company

}:{

  open:boolean;
  setOpen:(value:boolean)=>void;
  company:Company|null;

}) {



const emptyForm = {

  name:"",
  legalName:"",
  country:"",
  currency:"",
  industry:"",
  fiscalYear:"",

};



const [form,setForm] = useState(emptyForm);




useEffect(()=>{


  if(company){

    setForm({

      name:company.name,
      legalName:company.legalName,
      country:company.country,
      currency:company.currency,
      industry:company.industry,
      fiscalYear:company.fiscalYear,

    });


  }else{


    setForm(emptyForm);


  }



},[company]);







function handleChange(
e:React.ChangeEvent<HTMLInputElement>
){

setForm({

...form,

[e.target.name]:e.target.value,

});


}







async function saveCompany(){


try{


const method = company ? "PUT" : "POST";



const body = company

? {

    id:company.id,

    ...form

  }

: form;





const response = await fetch(

"/api/companies",

{

method,

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(body)

}

);




const data = await response.json();




if(!response.ok){

throw new Error(
data.message || "Error"
);

}



alert(
company
?
"Company updated successfully"
:
"Company created successfully"
);



setOpen(false);



window.location.reload();





}catch(error){


console.error(error);

alert("Operation failed");


}



}






return (

<>

{open && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">


<div className="w-[700px] rounded-2xl border border-slate-700 bg-[#111C34] p-8">



<div className="mb-6 flex items-center justify-between">


<h2 className="text-2xl font-bold text-white">

{company ? "Edit Company" : "Add New Company"}

</h2>



<button
onClick={()=>setOpen(false)}
>

<X className="text-white"/>

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


].map(([name,placeholder])=>(



<input

key={name}

name={name}

value={
form[name as keyof typeof form]
}

onChange={handleChange}

placeholder={placeholder}

className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white"

/>



))}





</div>






<div className="mt-8 flex justify-end gap-3">



<button

onClick={()=>setOpen(false)}

className="rounded-xl border border-slate-600 px-5 py-3 text-white"

>

Cancel

</button>





<button

onClick={saveCompany}

className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black"

>

{company ? "Update Company" : "Save Company"}

</button>





</div>



</div>


</div>


)}



</>

);


}