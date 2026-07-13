"use client";

import { useState } from "react";

import CompanyTable from "@/components/companies/CompanyTable";
import AddCompanyModal from "@/components/companies/AddCompanyModal";


export default function CompaniesPage(){


const [open,setOpen] = useState(false);



return (

<div className="space-y-8">



<div className="flex items-center justify-between">


<div>

<h1 className="text-3xl font-bold text-white">
Companies
</h1>

<p className="text-slate-400">
Manage your companies
</p>

</div>




<button

onClick={()=>setOpen(true)}

className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black hover:bg-cyan-600"

>

+ New Company

</button>



</div>





<CompanyTable />





<AddCompanyModal

open={open}

setOpen={setOpen}

company={null}

/>



</div>


);


}