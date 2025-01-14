import { Role } from "@prisma/client";
import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';



interface HomeDetails {
    event: number;
    currentLead: number;
    formertLead: number;
    domain: number;
    textnimial: number;
    champion: number;
    mentor: number;
    advisor: number;
    setUp: (event: number, currentLead: number, formertLead: number, domain: number, textnimial: number, champion: number, mentor: number, advisor: number) => void;
}


const useHomeStore = create<HomeDetails>()(
    persist(immer((set) => ({
        event: 0,
        currentLead: 0,
        formertLead: 0,
        domain: 0,
        textnimial: 0,
        champion: 0,
        mentor: 0,
        advisor: 0,
        setUp: (event: number, currentLead: number, formertLead: number, domain: number, textnimial: number, champion: number, mentor: number, advisor: number) => set((state) => {
            state.event = event;
            state.currentLead = currentLead;
            state.formertLead = formertLead;
            state.domain = domain;
            state.textnimial = textnimial;
            state.champion = champion;
            state.mentor = mentor;
            state.advisor = advisor;
        }
        )
    })), { name: "home" })
);

export default useHomeStore;