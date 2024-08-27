import styles from "./WareHousePage.module.css";

import { NavBar } from "../../components/navbar/NavBar";
import { Title } from "../../components/title/Title";
import { useEffect, useState } from "react";
import { WareHouseContainer } from "./Components/WareHouseContainer/WareHouseContainer";
import { IWareHouseItem } from "../../models";
import { getWareHouseItems } from "../../services";
import { WareHouseTable } from "./Components/WareHouseTable/WareHouseTable";

export default function WareHousePage() {
    const [items, setItems] = useState<IWareHouseItem[]>([])
    const [search, setSearch] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const getEmployees = async() => {
            const result = await getWareHouseItems()

            setItems(result!)
            setIsLoading(false)
        }
        getEmployees()
    }, [])

    const filteredItems = (i: IWareHouseItem[]) => {
        return i.filter(e => {
            if (search === '')
                return true
            
            const lowerName = e.nombre.toLowerCase()
            const lowerProvider = e.proveedor.toLowerCase()

            return (lowerName.startsWith(search.toLowerCase()) || 
                    lowerProvider.startsWith(search.toLowerCase()))
        })
    }

    const textChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const changeItems = (id: string, quantity: number) => {
        setItems(prev => {
            const newItems = prev.map(i => {
                if (i.id === id) {
                    return { ...i, cantidad: quantity };
                }
                return i;
            });
            return [...newItems]; // Asegúrate de que la referencia de la lista cambie
        });

        console.log(items)
    };

    return (
        <NavBar>
            <div className={styles.container}>
                <Title text="Almacén"/>

                <div className={styles.inputIcon}>  
                    <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                    <input onChange={textChanged} type="text"/>
                </div>

                <i className="fa-solid fa-circle" style={{color: '#DE1313'}}></i>
                <span style={{color: '#DE1313'}}>Debajo de lo normal</span>
            
                <i className="fa-solid fa-circle" style={{color: '#00A65B'}}></i>
                <span style={{color: '#00A65B'}}>Buena cantidad</span>
                
                <WareHouseContainer>
                    <WareHouseTable refreshItems={changeItems} isLoading={isLoading} items={filteredItems(items)}/>
                </WareHouseContainer>
            </div>
        </NavBar>
    )
}
