"use client";


import { useEffect, useState } from "react";

import { Account } from "@/types/account";



export default function useAccounts(
  companyId: number
) {


  const [accounts, setAccounts] = useState<Account[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");




  async function fetchAccounts() {

    try {

      setLoading(true);


      const response = await fetch(
        `/api/accounts?companyId=${companyId}`
      );


      const data = await response.json();



      if (!response.ok) {

        throw new Error(
          data.message || "Failed to load accounts"
        );

      }



      setAccounts(data);



    } catch (err:any) {


      setError(
        err.message
      );


    } finally {


      setLoading(false);


    }

  }





  useEffect(() => {


    if(companyId){

      fetchAccounts();

    }


  }, [companyId]);






  return {

    accounts,

    loading,

    error,

    refresh: fetchAccounts,

  };


}