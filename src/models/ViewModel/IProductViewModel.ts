export interface IProductViewModel{
    id?: string;
    cantidad: number;
    contable: number;
    id_sucursal: string;
    id_categoria: string;
    id_um: string;
    imagen: string;
    inversion: string;
    nombre: string;
    precio: string;
    calorias: string;
    unidad: string;
    valor: number;
    stripe_product_id?: string;
}