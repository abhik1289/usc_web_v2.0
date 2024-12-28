"use client"

import React from "react";
import { dashboardCArdList } from "@/app/context/dashBoardLayout";
import { useTheme } from "next-themes";
import useAuthStore from "@/store/Auth";

function HomePage() {

  const { theme, setTheme } = useTheme();


  const { isSignedIn, role, email, name } = useAuthStore();

  console.log(isSignedIn, role, email, name )
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex w-full flex-wrap gap-2">
        {/* <button onClick={() => setTheme("dark")}>DARK</button> */}
        {dashboardCArdList.map((item, i) => (
          <div
            className="w-5/12  rounded-xl bg-muted/50 p-4 flex gap-3 items-center"
            key={item.id}
          >
            <div className="left">
              <div key={i} className="icon w-[50px] h-[50px] bg-blue-600 rounded-md flex justify-center items-center text-xl">
                {item.icon}
              </div>
            </div>
            <div className="right">
              <div className="number text-4xl">{item.number}</div>
              <div className="title italic">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
    </div>
  );
}

export default HomePage;
