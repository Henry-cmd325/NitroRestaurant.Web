import styles from "./Title.module.css"

interface TitleProps {
    text: string;
}

export const Title: React.FC<TitleProps> = ({ text }) => {
    return (
        <div className={styles.div}>
            <h3 className={styles.h3}>{text}</h3>
        </div>
    )
}