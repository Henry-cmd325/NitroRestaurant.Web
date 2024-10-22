import Product from "../../domain/entities/Product";
import { injectable, inject } from "tsyringe"
import type IProductsRepository from "../../domain/services/IProductsRepository";

@injectable()
class CreateProduct{
    constructor(@inject("IProductRepository") private readonly repository: IProductsRepository) {}

    async execute(product: Product): Promise<Product> {
        return this.repository.create(product)
    }
}

export default CreateProduct