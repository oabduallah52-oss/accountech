"use client";

import { useState } from "react";

import useAccounts from "@/hooks/useAccounts";

import AccountTable from "@/components/accounting/AccountTable";
import AddAccountModal from "@/components/accounting/AddAccountModal";


export default function ChartOfAccountsPage() {


  const {
    accounts,
    loading,
    error,
    refresh,
  } = useAccounts();



  const [open, setOpen] = useState(false);



  return (

    <div className="space-y-8">


      <div className="flex items-center justify-between">


        <div>

          <h1 className="text-3xl font-bold text-white">
            Chart of Accounts
          </h1>


          <p className="text-slate-400">
            Manage your accounting structure
          </p>

        </div>




        <button

          onClick={() => setOpen(true)}

          className="
          rounded-xl 
          bg-cyan-500 
          px-5 
          py-3 
          font-semibold 
          text-black
          hover:bg-cyan-600
          "

        >

          + New Account

        </button>


      </div>





      {
        loading && (

          <div className="text-slate-400">
            Loading accounts...
          </div>

        )
      }





      {
        error && (

          <div className="rounded-lg bg-red-500/20 p-4 text-red-400">

            {error}

          </div>

        )
      }






      {
        !loading && !error && (

          <AccountTable

            accounts={accounts}

            refresh={refresh}

          />

        )
      }





      <AddAccountModal

        open={open}

        setOpen={setOpen}

        account={null}

        refresh={refresh}

      />




    </div>

  );

}