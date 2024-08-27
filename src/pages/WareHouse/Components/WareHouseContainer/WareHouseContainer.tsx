import styles from "./WareHouseContainer.module.css"

interface props {
    children: React.ReactNode;
}

export const WareHouseContainer: React.FC<props> = ({ children }) => {
    return(
        <div className={styles.tableContainer}>
        <div className={styles.table}>
            {children}
        </div>
    </div>
    )
}