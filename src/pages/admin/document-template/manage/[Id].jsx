import { useState } from "react";
import Head from "next/head";

export default ()=> {
  
  return (
    <>
      <Head>
        <title>Form Template Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={"p-4 mx-2 mt-2 flex flex-col gap-4"}>
        <h2 className={"text-2xl font-semibold text-primary-900 dark:text-primary-300"}>
          Edit Document Template
        </h2>
        
        
        <div className={"mt-4"}>
          <form>
            
          </form>
        </div>
      </main>
    </>
  );
}
