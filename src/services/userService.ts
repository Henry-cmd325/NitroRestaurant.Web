import { signInWithEmailAndPassword } from "firebase/auth";
import { db, firebaseAuth } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { IUser, IEmployee, IBranch} from "../models";

const getUser = async (uid: string): Promise<IEmployee | null> => {
    const employeeRef = doc(db, "empleados", uid)
    const employeeSnap = await getDoc(employeeRef)

    if (employeeSnap.exists()) {
        const employeeData = employeeSnap.data() as Omit<IEmployee, 'uid'>

        const sucursalSnap = await getDoc(employeeData.sucursal_ref!)
        const sucursalData = sucursalSnap.data() as Omit<IBranch, 'uid'>

        const response = { uid: employeeSnap.id, 
                           nombreSucursal: sucursalData.nombre, 
                           ...employeeData};
        
        response.branchUid = sucursalSnap.id

        return response
      } else {
        console.log("Ha ocurrido un error")
        return null
      }
}

export const login = async (email: string, password: string): Promise<IUser | null> => {
    const resLogin = await signInWithEmailAndPassword(firebaseAuth, email, password)

    console.log(resLogin.user)

    const token = await resLogin.user.getIdToken()
    
    const userData = await getUser(resLogin.user.uid)

    const user: IUser = {
        uid: userData!.uid!,
        email,
        token,
        displayName: userData!.displayName,
        branch_uid: userData!.branchUid!,
        nombreSucursal: userData!.nombreSucursal || "",
        rol: userData!.rol
    }

    if (user.rol !== "admin"){
        return null
    }

    return user
}