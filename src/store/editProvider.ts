import { create } from "zustand";
import { IProvider } from "../models";
import { getProviderById } from "../services";

type EditProviderStore = {
    editProvider: IProvider | null;
    setProvider: (uid: string) => Promise<void>;
    setProviderAsNull: () => void;
}

export const useEditProviderStore = create<EditProviderStore>((set) => ({
    editProvider: null,
    setProvider: async(uid: string) => {
        let editProvider

        try{
            editProvider = await getProviderById(uid)
        } catch(e) {
            editProvider = null
            alert("Hubo un error al obtener el proveedor")
        }

        set({ editProvider })
    },
    setProviderAsNull: () => set({editProvider: null})
}))