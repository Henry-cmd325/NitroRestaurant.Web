import { DocumentReference } from "firebase/firestore";

export interface IEmployee{
    id?: string;
    uid?: string;
    displayName: string;
    email: string;
    rol: string;
    sucursal_ref?: DocumentReference;
    branchUid?: string;
    nombreSucursal?: string;
}