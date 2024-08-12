import { create } from "zustand";
import { IProductViewModel } from "../models";
import { getProductById } from "../services";

type EditProductStore = {
    editProduct: IProductViewModel | null;
    setProduct: (uid: string) => Promise<void>;
    setProductAsNull: () => void;
}

export const useEditProductStore = create<EditProductStore>((set) => ({
    editProduct: null,
    setProduct: async(uid: string) => {
        let editProduct

        try{
            editProduct = await getProductById(uid)

        } catch(e) {
            editProduct = null
            alert("Hubo un error al obtener el producto")
        }

        set({ editProduct })
    },
    setProductAsNull: () => set({editProduct: null})
}))