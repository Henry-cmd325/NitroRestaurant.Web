import { create } from "zustand";
import { IEmployeeViewModel } from "../models";
import { getEmployeeById } from "../services";

type EditEmployeeStore = {
    editEmployee: IEmployeeViewModel | null;
    setEmployee: (uid: string) => Promise<void>;
    setEmployeeAsNull: () => void;
}

export const useEditEmployeeStore = create<EditEmployeeStore>((set) => ({
    editEmployee: null,
    setEmployee: async(uid: string) => {
        let editEmployee

        try{
            editEmployee = await getEmployeeById(uid)

            set({ editEmployee })
        } catch(e) {
            editEmployee = null
            alert("Hubo un error al traer al empleado")
        }

        set({ editEmployee })
    },
    setEmployeeAsNull: () => set({editEmployee: null})
}))