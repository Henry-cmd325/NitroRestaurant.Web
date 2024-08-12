import styles from "./LoginPage.module.css"

import Header from "../../components/header/Header"
import { useAuthStore } from "../../store/auth"
import { Navigate, useNavigate } from "react-router-dom"

function LoginPage(){
    const { user, loginUser } = useAuthStore() 
    const navigate = useNavigate()

    if (user)
        return <Navigate to="/sales"/>

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const email = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value

        await loginUser(email, password)

        if (useAuthStore.getState().user !== null)
            navigate("/sales")
    }

    return (
        <>
            <Header/>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h3 className={styles.sesion}>Iniciar Sesión</h3>
                    <div className={styles.inputContainer}>
                        <input type="email" placeholder="Correo electrónico"/>
                        <div className={styles.passwordContainer}>
                            <input type="password" placeholder="Contraseña"/>
                            <i className="fa-solid fa-lock fa-xl"></i>
                        </div>
                    </div>
                    <button className={styles.btn}>LOG IN</button>
                </form>
            </div>
        </>
    )
}

export default LoginPage