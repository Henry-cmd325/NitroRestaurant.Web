import { DocumentReference } from "firebase/firestore";

interface IDetalle{
    cantidad: number;
    modificaciones: Array<string>;
    precio: number;
    producto_ref: DocumentReference;
}

export interface IOrder{
    uid: number;
    detalle_pedido: Array<IDetalle>;
    estado: boolean;
    fecha_creacion: Date;
    mesa_ref:  DocumentReference;
    sucursal_ref: DocumentReference;
    tipo_pedido_ref: DocumentReference;
    total: number;
}