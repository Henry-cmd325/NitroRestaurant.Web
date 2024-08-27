import React, { useState } from "react";
import styles from "./WareHouseDialog.module.css"
import { IWareHouseItem } from "../../../../models";
import { updateItemQuantity } from "../../../../services";

interface props {
    item: IWareHouseItem;
    refreshItems: (id: string, quantity: number) => void;
    cancelFunction: () => void
}

export const WareHouseDialog: React.FC<props> = ({ refreshItems, item, cancelFunction}) => {
    const [quantity, setQuantity] = useState<number | string>(0)

    const saveFunction = async() => {
        if (Number(quantity) === 0){
            alert("Debes de introducir un valor mayor a cero")
            return
        }

        item.cantidad += Number(quantity)
        const response = await updateItemQuantity(item)

        if (response) {
            alert("La cantidad ha sido actualizada exitosamente")
            console.log(item.cantidad)
            refreshItems(item.id!, item.cantidad)
            cancelFunction()
        } else{
            alert("Ha ocurrido un error")
        }
    }

    const incrementQuantity = () => {
        setQuantity(Number(quantity) + 1)
    }

    const decrementQuantity = () => {
        if (Number(quantity) > 0) {
            setQuantity(Number(quantity) - 1)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (!isNaN(Number(value)) && value !== '') {
            setQuantity(Number(value));
        } else if (value === '') {
            setQuantity(0);
        }
    };

    return (
        <div className={styles.container}>
            <aside className={styles.aside}></aside>
            <div className={styles.dialogContainer}>
                <div className={styles.dialog}>
                    <div className={styles.iconContainer}>
                        <p></p>
                        <h3>Entrada de {item.nombre}</h3>
                        <i onClick={cancelFunction} className="fa-solid fa-xmark fa-2xl"></i>
                    </div>
                    <div className={styles.inputContainer}>
                        <div>
                            <i onClick={decrementQuantity} className="fa-solid fa-minus fa-lg"></i>
                            <input onChange={handleChange} type="number" value={quantity} min={0}/>
                            <i onClick={incrementQuantity} className="fa-solid fa-plus fa-lg"></i>
                        </div>
                        <p>Nueva cantidad: {item.cantidad + Number(quantity)}{item.simbolo}</p>
                    </div>
                    <div className={styles.btnContainer}>
                        <button className={styles.btnEdit} onClick={saveFunction}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}