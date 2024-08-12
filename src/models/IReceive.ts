import { DocumentReference } from "firebase/firestore";

export interface IReceive{
    uid: string;
    ref_pedido: DocumentReference;
    ref_sucursal: DocumentReference;
    ref_tipo_pago: DocumentReference;
}