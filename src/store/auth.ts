import { create } from "zustand";
import { persist } from "zustand/middleware"
import { IUser } from "../models";
import { login } from "../services";

type AuthStore = {
    user: IUser | null
    loginUser: (email: string, password: string) => Promise<void>
}

export const useAuthStore = create(persist<AuthStore>(
    (set) => ({
        user: null,
        loginUser: async (email, password) => {
            let user

            try{
                user = await login(email, password)
            } catch(e){
                user = null
                alert("El usuario o la contraseña son incorrectos")
            }

            set({ user })
        }
    }),{
        name: "auth"
    }
))