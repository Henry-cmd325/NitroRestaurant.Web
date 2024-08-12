import { DocumentReference } from "firebase/firestore";

export interface IProduct{
    id?: string;
    uid?: string; 
    cantidad: number;
    categoria_ref?: DocumentReference;
    categoria?: string;
    contable: number;
    imagen: string;
    inversion: number;
    nombre: string;
    nutricion: {
        calorias: number;
        contenido: {
            unidad: string;
            valor: number;
        }
    };
    precio: number;
    stripe_product_id: string;
    sucursal_ref?: DocumentReference;
    unidad_medida_ref?: DocumentReference;
}