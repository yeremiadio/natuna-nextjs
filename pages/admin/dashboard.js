import React from "react";
import Admin from "../../layouts/Admin.js";
import Head from "next/head";

export default function dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - BUMDes Laut Sakti Daratan Bertuah</title>
      </Head>
      <div className="bg-section">
        <h3 className="font-bold text-xl text-gray-800">Dashboard</h3>
        <p className="font-base tracking-wide text-gray-400">
          Lihat Progress Penjualanmu disini.
        </p>
      </div>
    </>
  );
}

dashboard.layout = Admin;
