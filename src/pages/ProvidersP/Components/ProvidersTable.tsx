import loader from "../../../assets/loader.svg"
import styles from "./ProvidersTable.module.css"

import { IProvider } from "../../../models";
import { useEditProviderStore } from "../../../store/editProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProviderAsync } from "../../../services";
import { DialogContainer } from "../../../components/dialogContainer/DialogContainer";

interface props {
    isLoading: boolean;
    refreshProviders: (id: string) => void;
    providers: IProvider[];
}

export const ProvidersTable: React.FC<props> = ({ isLoading, refreshProviders, providers }) => {
    const { editProvider, setProvider, setProviderAsNull } = useEditProviderStore()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const navigate = useNavigate()

    const rowClicked = (uid: string) => {
        setProvider(uid)
        setModalVisible(true)
    }

    const editFunction = () => {
        navigate("/create-provider")
    }

    const deleteFunction = async () => {
        const response = await deleteProviderAsync(editProvider!.id!)

        if (response?.status === 204){
            setProviderAsNull()
            setModalVisible(false)
            alert("Se ha eliminado el proveedor")
            
            refreshProviders(editProvider!.id!)
        }
    }

    const cancelFunction = () => {
        setProviderAsNull()
        setModalVisible(false)
    }

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.iconColumn}></th>
                        <th className={styles.nameColumn}>Nombre</th>
                        <th className={styles.telefonoColumn}>Teléfonos</th>
                        <th className={styles.direccionColumn}>Dirección</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={4}>
                            <hr className={styles.titleDivider}/>
                        </td>
                    </tr>
                    {
                        isLoading && (
                        <tr>
                            <td colSpan={4} rowSpan={2}>
                                <div className={styles.loaderContainer}><img src={loader}/></div>
                            </td>
                        </tr>)
                    }
                    {providers ? providers.map(p => (
                        <>
                            <tr onClick={() => rowClicked(p.id!)} className={styles.tr}>
                                <td>
                                    <div>
                                        <i className="fa-regular fa-address-book fa-2xl"></i>
                                    </div>
                                </td>
                                <td>{p.nombre}</td>
                                <td>
                                    <div className={styles.telefonoContainer}>
                                        <span>{p.telefono}</span>
                                        {p.telefono2 && <span>{p.telefono2}</span>}
                                    </div>
                                </td>
                                <td>{p.direccion}</td>
                            </tr>
                            <tr>
                                <td className={styles.rowDivider} colSpan={4}>
                                    <hr/>
                                </td>
                            </tr>
                        </>
                    )) : <p>No existe ningun proveedor</p>}
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