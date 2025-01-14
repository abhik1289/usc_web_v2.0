"use client";

import React, { useState } from "react";
// import { Champion } from "@/components/(admin)/champion/type";

import { Button } from "@/components/ui/button";
import ChampionsBox from "@/components/(admin)/champion/ChampionsBox";
import { useRouter } from "next/navigation";
export default function ChampionPage() {
  
    const router = useRouter();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Champions</h1>
        <Button
          onClick={() => router.push("/champion/add")} 
        >
          Add Champion
        </Button>
      </div>

      <ChampionsBox />

      
    </div>
  );
}
