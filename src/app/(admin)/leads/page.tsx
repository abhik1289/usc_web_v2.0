"use client";

import React from "react";

import LeadsTable from "@/components/(admin)/leads/LeadsTable";
import LeadsFilterBox from "@/components/(admin)/leads/LeadsFilterBox";
import Head from "next/head";



export default function LeadsPage() {


  return (
    <div className=" p-4">
      <LeadsFilterBox />
      <LeadsTable />
      </div>
  );
}
