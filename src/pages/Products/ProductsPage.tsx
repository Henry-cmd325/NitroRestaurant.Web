import style from "./Products.module.css"

import { NavBar } from "../../components/navbar/NavBar";
import { Title } from "../../components/title/Title";
import { TableContainer } from "../../components/tableContainer/TableContainer";
import { useNavigate } from "react-router-dom";
import { ProducstTable } from "./Components/ProductsTable";
import { useEffect, useState } from "react";
import { IProduct } from "../../models";
import { getProductsAsync } from "../../services";
import { useEditProductStore } from "../../store/editProduct";

export default function ProductsPage(){
    const { setProductAsNull } = useEditProductStore()

    const navigate = useNavigate()
    const [products, setProducts] = useState<Array<IProduct>>([])
    const [search, setSearch] = useState<string>("")
    const [category, setCategory] = useState<string>("Todas")
    const [categories, setCategories] = useState<Array<string>>(["Todas"])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const changeProducts = (id: string) => {
        setProducts(prev => prev.filter(prod => prod.id !== id))
    }    
    
    useEffect(() => {
        setProductAsNull()

        const getProducts = async() => {
            const response = await getProductsAsync()
            let categoriesList: Array<string>

            if (response){
                categoriesList = new Array<string>()

                response.forEach(el => {
                    if (!categoriesList.includes(el.categoria!))
                        categoriesList.push(el.categoria!)
                })

                setCategories([...categoriesList])
                setProducts(response)
                setIsLoading(false)
            }
            else
                throw new Error("Ha ocurrido un error")
        }

        getProducts().catch(console.error)
        
    }, [setProductAsNull])

    const filterProducts = (products: Array<IProduct>) => {
        return products.filter(p => {
            if (search === ''){
                if (category === 'Todas'){
                    return true;
                }
                else{
                    return category === p.categoria
                }       
            }
            
            console.log(search)
            const lowerName = p.nombre.toLowerCase()

            if (lowerName.startsWith(search.toLowerCase())){
                if (category === "Todas")
                    return true
                else{
                    return category === p.categoria
                }
            }
        })
    }

    const clicked = () => {
        navigate("/create-product")
    }

    const textChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const selectedChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value)
    }

    return (
        <NavBar>
            <div className={style.container}>
                <Title text="Productos"/>

                <div className={style.inputIcon}>
                    <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                    <input onChange={textChanged} type="text"/>
                </div>
            
                <label>Categoria:</label>
                <select onChange={selectedChanged}>
                    <option>Todas</option>
                    {
                        categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))
                    }
                </select>
                <TableContainer textBtn="Agregar producto" btnClicked={clicked}>
                    <ProducstTable isLoading={isLoading} refreshProducts={changeProducts} products={filterProducts(products)}/>
                </TableContainer>
            </div>  
        </NavBar>
    )
}