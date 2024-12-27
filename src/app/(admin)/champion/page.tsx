"use client";

import React, { useState } from "react";
// import { Champion } from "@/components/(admin)/champion/type";

import { Button } from "@/components/ui/button";
import ChampionsBox from "@/components/(admin)/champion/ChampionsBox";
export default function ChampionPage() {
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);





  

 
  // const filteredChampions = champions.filter(champion => {
  //   if (selectedType === "all") return true;
  //   // Add your filtering logic here based on champion types
  //   return true;
  // });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Champions</h1>
        <Button
          onClick={() => {
          
            setIsDialogOpen(true);
          }}
        >
          Add Champion
        </Button>
      </div>

      <ChampionsBox />

      
    </div>
  );
}
