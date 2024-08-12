import styles from "./SalesPage.module.css"

import { NavBar } from "../../components/navbar/NavBar";
import { Title } from "../../components/title/Title";
import { BestProduct } from "./Components/BestProduct";
import BestDay from "./Components/BestDay";
import { WorstProduct } from "./Components/WorstProduct";
import { IStatProduct } from "../../models";
import { useEffect, useState } from "react";
import { getStatsProducts } from "../../services";
import { SalesChart } from "./Components/SalesChart/SalesChart";

export default function SalesPage(){
    const [stats, setStats] = useState<IStatProduct>({
        bestProduct: "",
        worstProduct: "",
        data: []
    })

    useEffect(() => {
        const getStats = async() => {
            const response = await getStatsProducts()

            setStats(response!)
        }

        getStats()
    }, [])

    return (
        <NavBar>
            <div className={styles.container}>
                <Title text="Resumen de ventas"/>
                <div className={styles.statistics}>
                    <BestProduct maxProduct={stats?.bestProduct}/>
                    <BestDay/>
                    <WorstProduct minProduct={stats?.worstProduct}/>
                </div>
            </div>
            <SalesChart data={stats?.data}/>
        </NavBar>
    )
} 