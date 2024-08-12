import loader from "../../../assets/loader.svg"
import styles from "./styles/SalesStats.module.css"

interface props {
    minProduct: string
}

export const WorstProduct: React.FC<props> = ({ minProduct }) => {
    return (
        <div className={styles.container}>
            <div className={styles.bigger}>
                <i className="fa-regular fa-lemon fa-2xl"></i>
            </div>
            <div className={styles.box}>
                <h3 className={styles.title}>Peor producto</h3>
                <div className={styles.textContainer}>
                    {!minProduct? (<img src={loader}></img>): (<p className={styles.text}>{minProduct}</p>)}
                </div>
            </div>
        </div>
    )
}