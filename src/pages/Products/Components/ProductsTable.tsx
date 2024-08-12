import styles from "./ProductsTable.module.css"
import loader from "../../../assets/loader.svg"

import { IProduct } from "../../../models"
import { useState } from "react"
import { DialogContainer } from "../../../components/dialogContainer/DialogContainer"
import { useNavigate } from "react-router-dom"
import { useEditProductStore } from "../../../store/editProduct"
import { deleteProductAsync } from "../../../services"

interface props{
    isLoading: boolean;
    refreshProducts: (id: string) => void;
    products: Array<IProduct>;
}

export const ProducstTable: React.FC<props> = ({isLoading, refreshProducts, products }) => {
    const { editProduct, setProduct, setProductAsNull } = useEditProductStore()
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const navigate = useNavigate()

    const rowClicked = (uid: string) => {
        setProduct(uid)
        setModalVisible(true)
    }

    const editFunction = () => {
        navigate("/create-product")
    }

    const deleteFunction = async () => {
        const response = await deleteProductAsync(editProduct!.id!)

        if (response?.status === 204){
            setProductAsNull()
            setModalVisible(false)
            alert("Se ha eliminado el producto")

            refreshProducts(editProduct!.id!)
        }
    }

    const cancelFunction = () => {
        setProductAsNull()
        setModalVisible(false)
    }
    
    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.imgColumn}></th>
                        <th className={styles.nameColumn}>Nombre</th>
                        <th className={styles.categoryColumn}>Categoria</th>
                        <th className={styles.priceColumn}>Precio</th>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <hr className={styles.titleDivider}/>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading && (
                        <tr>
                            <td colSpan={4} rowSpan={2}>
                                <div className={styles.loaderContainer}><img src={loader}/></div>
                            </td>
                        </tr>)
                    }
                
                    {products? products.map((p =>
                    (
                        <>
                            <tr onClick={() => rowClicked(p.id!)} className={styles.tr}>
                                <td>
                                    <div className={styles.imgContainer}>
                                        <img className={styles.img} src={p.imagen}></img>
                                    </div>
                                </td>
                                <td>{p.nombre}</td>
                                <td>{p.categoria}</td>
                                <td>${p.precio}</td>
                            </tr>
                            <tr>
                                <td className={styles.rowDivider} colSpan={4}>
                                    <hr/>
                                </td>
                            </tr>
                        </>    
                    ))): 
                    <tr>
                        <td colSpan={4} rowSpan={2}>
                            <div className={styles.loaderContainer}><p>No existe ningun producto</p></div>
                        </td>
                    </tr>}

                    {
                        (!isLoading && products.length === 0) && (
                        <tr>
                            <td colSpan={4} rowSpan={2}>
                                <div className={styles.loaderContainer}><p>Ningun producto coincide con la búsqueda</p></div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            
            {!modalVisible || <DialogContainer 
                                editFunction={editFunction} 
                                deleteFunction={deleteFunction} 
                                cancelFunction={cancelFunction}
                            />}
        </>
        
    )
}