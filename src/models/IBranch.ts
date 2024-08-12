import { DocumentReference, GeoPoint } from "firebase/firestore";

export interface IBranch{
    uid?: string;
    id?: string;
    direccion: GeoPoint;
    negocio_ref: DocumentReference;
    nombre: string
}