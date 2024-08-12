export interface IProductRequest{
    cantidad: number;
    contable: number;
    id_sucursal: string;
    id_categoria: string;
    id_um: string;
    imagen: string;
    inversion: number;
    nombre: string;
    precio: number;
    descripcion?: string;
    nutricion: {
        calorias: number;
        contenido: {
            unidad: string;
            valor: number;
        }
    }
    stripe_product_id?: string;
}