import React from 'react'
import { MdEventAvailable } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiUserShared2Fill } from "react-icons/ri";
import { SiGoogledomains } from "react-icons/si";
import { GiChampions } from "react-icons/gi";
import { VscFeedback } from "react-icons/vsc";
import { FaUserTie } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { SiCloudflareworkers } from "react-icons/si";
export default function getHomeCards() {
    return [
        {
            id: 1,
            number: 15,
            title: "Current Leads",
            icon: <FaUsers />,
        },
        {
            id: 2,
            number: 8,
            title: "Former Leads",
            icon: <RiUserShared2Fill />,
        },
        {
            id: 3,
            number: 5,
            title: "Events",
            icon: <MdEventAvailable />,
        },
        {
            id: 4,
            number: 9,
            title: "Domains",
            icon: <SiCloudflareworkers />,
        },
        {
            id: 5,
            number: 9,
            title: "Advisors",
            icon: <FaUserLarge />,
        },
        {
            id: 6,
            number: 9,
            title: "Mentors",
            icon: <FaUserTie />,
        },
        {
            id: 7,
            number: 9,
            title: "Testimonials",
            icon: <VscFeedback />,
        },
        {
            id: 8,
            number: 9,
            title: "Champions",
            icon: <GiChampions />,
        },
    ];
}
