import loader from "../../../assets/loader.svg"
import styles from "./styles/SalesStats.module.css"

interface props {
    maxProduct: string
}

export const BestProduct: React.FC<props> = ({ maxProduct }) => {
    return (
        <div className={styles.container}>
            <div className={styles.bigger}>
            <i className="fa-regular fa-star fa-2xl"></i>
            </div>
            <div className={styles.box}>
                <h3 className={styles.title}>Mejor producto</h3>
                <div className={styles.textContainer}>
                    {!maxProduct? (<img src={loader}></img>): (<p className={styles.text}>{maxProduct}</p>)}
                    
                </div>
            </div>
        </div>
    )
}