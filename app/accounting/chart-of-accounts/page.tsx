"use client";


import { useState } from "react";

import AddAccountModal from "@/components/accounting/AddAccountModal";
import AccountTree from "@/components/accounting/AccountTree";

import useAccounts from "@/hooks/useAccounts";



export default function ChartOfAccountsPage() {


  const companyId = 3;


const {
    accounts,
    loading,
    error,
    refresh,
} = useAccounts(companyId);


console.log("ACCOUNTS:", accounts);




  return (

    <div
      className="
        min-h-screen
        bg-[#071426]
        p-8
      "
    >



      <div
        className="
          mb-8
          flex
          items-center
          justify-between
        "
      >



        <div>


          <h1
            className="
              text-3xl
              font-bold
              text-white
            "
          >

            Chart of Accounts

          </h1>



          <p
            className="
              mt-2
              text-slate-400
            "
          >

            Manage your accounting structure

          </p>


        </div>






        <AddAccountModal

          companyId={companyId}

          onCreated={refresh}

        />




      </div>







      {
        loading && (

          <div
            className="
              rounded-xl
              bg-[#111C34]
              p-5
              text-white
            "
          >

            Loading accounts...

          </div>

        )
      }







      {
        error && (

          <div
            className="
              rounded-xl
              bg-red-500/20
              p-5
              text-red-400
            "
          >

            {error}

          </div>

        )
      }







      {
        !loading && !error && (

          <AccountTree

            accounts={accounts}

          />

        )
      }




    </div>

  );

}