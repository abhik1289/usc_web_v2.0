import { Role } from "@prisma/client";
import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

interface userAuthentication {
    email: string;
    name: string;
    isSignedIn: boolean;
    role: Role | "";
    signIn: (email: string, role: Role, name: string) => void;
    signOut: () => void;
}


const useAuthStore = create<userAuthentication>()(
    persist(immer((set) => ({
        email: "",
        name: "",
        isSignedIn: false,
        role: "",
        signIn: (email: string, role: Role, name: string) => set((state) => {
            state.isSignedIn = true;
            state.email = email;
            state.name = name;
            state.role = role;
        }),
        signOut: () => set((state) => {
            state.isSignedIn = false;
            state.email = "";
            state.name = "";
            state.role = "";
        })
    })), { name: "auth" })
);

export default useAuthStore;