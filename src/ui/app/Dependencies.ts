import { container } from "tsyringe"
import CreateProduct from "../../products/application/useCases/CreateProduct"
import ProductsRepositoryFire from "../../products/infrastructure/adapters/output/repositories/ProductsRepositoryFire"

container.register("IProductsRepository", {useClass: ProductsRepositoryFire})
container.register("CreateProduct", {useClass: CreateProduct})

export { container }