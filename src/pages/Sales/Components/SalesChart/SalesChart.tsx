import styles from "./SalesChart.module.css"

import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

interface props {
    data: { producto: string; ventas: number }[]
}

export const SalesChart: React.FC<props> = ({ data }) => {
    return (
        <div className={styles.chartContainer}>
            <h3>Mejores productos</h3>
            <BarChart width={1000} height={450} data={data}>
                <CartesianGrid horizontal={true} vertical={false}/>
                <XAxis dataKey="producto" />
                <YAxis tickFormatter={(value) => `$${value}`}/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="ventas" fill="#ADBBFC" />
            </BarChart>
        </div>
        
    )
}