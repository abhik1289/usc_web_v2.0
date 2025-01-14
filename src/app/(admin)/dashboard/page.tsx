"use client"

import React from "react";
// import { dashboardCArdList } from "@/app/context/dashBoardLayout";

import useAuthStore from "@/store/Auth";
import { useTheme } from "next-themes";
import { useBasic } from "@/hooks/api/home/getBasic";
import { MdEventAvailable } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiUserShared2Fill } from "react-icons/ri";
import { SiGoogledomains } from "react-icons/si";
import { GiChampions } from "react-icons/gi";
import { VscFeedback } from "react-icons/vsc";
import { FaUserTie } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { SiCloudflareworkers } from "react-icons/si";
import useHomeStore from "@/store/HomeDetails";
function HomePage() {

  const { event, champion, currentLead, textnimial, domain, advisor, formertLead, mentor } = useHomeStore();

  const dashboardCArdList = [
    {
      id: 1,
      number: currentLead,
      title: "Current Leads",
      icon: <FaUsers />,
    },
    {
      id: 2,
      number: formertLead,
      title: "Former Leads",
      icon: <RiUserShared2Fill />,
    },
    {
      id: 3,
      number: event,
      title: "Events",
      icon: <MdEventAvailable />,
    },
    {
      id: 4,
      number: domain,
      title: "Domains",
      icon: <SiCloudflareworkers />,
    },
    {
      id: 5,
      number: advisor,
      title: "Advisors",
      icon: <FaUserLarge />,
    },
    {
      id: 6,
      number: mentor,
      title: "Mentors",
      icon: <FaUserTie />,
    },
    {
      id: 7,
      number: textnimial,
      title: "Testimonials",
      icon: <VscFeedback />,
    },
    {
      id: 8,
      number: champion,
      title: "Champions",
      icon: <GiChampions />,
    },
  ];



  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex w-full flex-wrap gap-2">
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
