import { injectable } from "tsyringe";
import Product from "../../../../domain/entities/Product";
import IProductsRepository from "../../../../domain/services/IProductsRepository";

@injectable()
class ProductsRepositoryFire implements IProductsRepository {
    create(product: Product): Promise<Product> {
        throw new Error();
    }
}

export default ProductsRepositoryFire