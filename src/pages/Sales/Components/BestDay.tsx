import styles from "./styles/SalesStats.module.css"
import loader from "../../../assets/loader.svg"

import { useEffect, useState } from "react"
import { getBestDayAsync } from "../../../services"

export default function BestDay(){
    const [bestDay, setBestDay] = useState<string>("")

    useEffect(() => {
        const getBestDay = async() => {
            const response = await getBestDayAsync()

            setBestDay(response!.bestDay)
        }

        getBestDay()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.bigger}>
                <i className="fa-regular fa-calendar-check fa-2xl"></i>
            </div>

            <div className={styles.box}>
                <h3 className={styles.title}>Mejor día</h3>
                <div className={styles.textContainer}>
                    {!bestDay? (<img src={loader}></img>): (<p className={styles.text}>{bestDay}</p>)}
                </div>
            </div>
        </div>
    )
}