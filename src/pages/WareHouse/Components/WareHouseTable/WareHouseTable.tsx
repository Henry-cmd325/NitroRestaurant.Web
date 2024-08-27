import styles from "./WareHouseTable.module.css"
import loader from "../../../../assets/loader.svg"

import { IWareHouseItem } from "../../../../models";
import { useState } from "react";
import { WareHouseDialog } from "../WareHouseDialog/WareHouseDialog";

interface props {
    refreshItems: (id: string, quantity: number) => void;
    isLoading: boolean;
    items: IWareHouseItem[];
}

export const WareHouseTable: React.FC<props> = ({ refreshItems, isLoading, items }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<IWareHouseItem | null>(null)
    
    const getQuantityColor = (cantidad: number, limite: number) => {
        return cantidad >= limite ? 
                    styles.colorGreen :
                    styles.colorRed
    }

    const rowClicked = (obj: IWareHouseItem) => {
        setModalVisible(true)
        setSelectedItem(obj)
    }
    
    const cancelFunction = () => {
        setModalVisible(false)
        setSelectedItem(null)
    }

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.iconColumn}></th>
                        <th className={styles.nameColumn}>Nombre y Proveedor</th>
                        <th className={styles.typeColumn}>Tipo</th>
                        <th className={styles.quantityColumn}>Cantidad</th>
                        <th className={styles.branchColumn}>Sucursal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={5}>
                            <hr className={styles.titleDivider}/> 
                        </td>
                    </tr>
                    {
                        isLoading && (
                        <tr>
                            <td colSpan={5} rowSpan={2}>
                                <div className={styles.loaderContainer}><img src={loader}/></div>
                            </td>
                        </tr>)
                    }

                    {items? items.map((i => (
                        <>
                            <tr onClick={() => rowClicked(i)} className={styles.tr}>
                                <td>
                                    <div>
                                        <i className="fa-solid fa-bottle-water fa-2xl"></i>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.nameContainer}>
                                        <span>{i.nombre}</span>
                                        <span className={styles.provider}>{i.proveedor}</span>
                                    </div>
                                </td>
                                <td>{i.tipo}</td>
                                <td className={getQuantityColor(i.cantidad, i.limite)}>{i.cantidad + i.simbolo}</td>
                                <td>{i.sucursal}</td>
                            </tr>
                            <tr>
                                <td className={styles.rowDivider} colSpan={5}>
                                    <hr/>
                                </td>
                            </tr>
                        </>
                        
                    ))):
                    <tr>
                        <td colSpan={5} rowSpan={2}>
                            <div className={styles.loaderContainer}><p>No existe ningun producto ni materia prima contable</p></div>
                        </td>
                    </tr>}
                </tbody>
            </table>

            {!modalVisible || <WareHouseDialog refreshItems={refreshItems} item={selectedItem!} cancelFunction={cancelFunction}/>}
        </>
    )
}