import React from "react";
import Head from "next/head";

export default function Home() {
  console.log("HOme");
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-12 text-black text-3xl">Home</div>
    </div>
  );
}
