import Product from "../entities/Product";

interface IProductsRepository {
    create(product: Product): Promise<Product> 
}

export default IProductsRepository