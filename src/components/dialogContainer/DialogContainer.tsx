import styles from "./DialogContainer.module.css"

interface props {
    editFunction: () => void;
    deleteFunction: () => void;
    cancelFunction: () => void;
}

export const DialogContainer: React.FC<props> = ({ editFunction, deleteFunction, cancelFunction }) => {
    return (
        <div className={styles.container}>
            <aside className={styles.aside}></aside>
            <div className={styles.dialogContainer}>
                <div className={styles.dialog}>
                    <div className={styles.iconContainer}>
                        <i onClick={cancelFunction} className="fa-solid fa-xmark fa-2xl"></i>
                    </div>
                    <span>
                        <p>¿Quieres editar o eliminar el registro?</p>
                    </span>
                    <div className={styles.btnContainer}>
                        <button className={styles.btnEdit} onClick={editFunction}>Editar</button>
                        <button className={styles.btnDelete} onClick={deleteFunction}>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}