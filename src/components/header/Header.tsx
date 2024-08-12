import styles from "./Header.module.css"

export default function Header(){
    return (
        <header className={styles.header}>
            <p className={styles.p}>NitroRestaurant</p>
        </header>
    )
}