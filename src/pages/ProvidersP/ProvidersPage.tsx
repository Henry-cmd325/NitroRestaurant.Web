import styles from "./ProvidersPage.module.css"

import { useEffect, useState } from "react";
import { NavBar } from "../../components/navbar/NavBar";
import { useEditProviderStore } from "../../store/editProvider";
import { IProvider } from "../../models";
import { getAllProviders } from "../../services";
import { useNavigate } from "react-router-dom";
import { Title } from "../../components/title/Title";
import { TableContainer } from "../../components/tableContainer/TableContainer";
import { ProvidersTable } from "./Components/ProvidersTable";

export default function ProvidersPage() {
    const { setProviderAsNull } =  useEditProviderStore()

    const navigate = useNavigate()
    const [providers, setProviders] = useState<IProvider[]>([])
    const [search, setSearch] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const changeProviders = (id: string) => {
        setProviders(prev => prev.filter(prov => prov.id !== id))
    }

    useEffect(() => {
        setProviderAsNull()

        const getProviders = async() => {
            const response = await getAllProviders()
            
            setProviders(response!)
            setIsLoading(false)
        }

        getProviders()
    }, [setProviderAsNull])

    const filterProviders = (providers: IProvider[]) => {
        return providers.filter(p => {
            if (search === '')
                return true
            
            const lowerName = p.nombre.toLowerCase()

            return lowerName.startsWith(search.toLowerCase())
        })
    }

    const clicked = () => {
        navigate("/create-provider")
    }

    const textChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <NavBar>
        <div className={styles.container}>
            <Title text="Proveedores"/>

            <div className={styles.inputIcon}>  
                <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                <input onChange={textChanged} type="text"/>
            </div>
            
            <TableContainer textBtn="Agregar proveedor" btnClicked={clicked}>
                <ProvidersTable isLoading={isLoading} refreshProviders={changeProviders} providers={filterProviders(providers)}/>
            </TableContainer>
        </div>
        
    </NavBar>
    )
}