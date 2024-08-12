import styles from "./TableContainer.module.css"

interface props{
    children: React.ReactNode;
    textBtn: string;
    btnClicked: () => void;
}

export const TableContainer: React.FC<props> = ({ children, textBtn, btnClicked }) => {
    return(
        <div className={styles.tableContainer}>
            <div className={styles.table}>
                {children}
            </div>
            <hr/>
            <div className={styles.btnContainer}>
                <button onClick={btnClicked}>
                    <i className="fa-regular fa-square-plus fa-2xl"></i>
                    {textBtn}
                </button>
            </div>
        </div>
    )
}