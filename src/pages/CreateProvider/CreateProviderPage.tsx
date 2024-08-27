import styles from "./CreateProviderPage.module.css"

import { Link, useNavigate } from "react-router-dom";
import { IProvider } from "../../models";
import { useEditProviderStore } from "../../store/editProvider";
import { useRef, useState } from "react";
import { createProviderAsync, editProviderAsync } from "../../services";
import { AxiosError } from "axios";
import { NavBar } from "../../components/navbar/NavBar";
import { Title } from "../../components/title/Title";

const initialProvider: IProvider = {
    nombre: "",
    direccion: "",
    telefono: "",
    telefono2: ""
}

export default function CreateProviderPage() {
    const { editProvider } = useEditProviderStore()

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [provider, setProvider] = useState<IProvider>(editProvider || initialProvider)

    const formRef = useRef<HTMLFormElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setProvider(prevProvider => ({
            ...prevProvider,
            [name]: value
        }))
    }

    const btnClicked = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (provider.direccion === "" || provider.nombre === "" || provider.telefono === ""){
            alert("Debe de rellenar todos los campos y anotar por lo menos un número telefónico")
            return
        }

        setIsLoading(true)

        try{
            const request: IProvider = {
                nombre: provider.nombre,
                telefono: provider.telefono,
                telefono2: provider.telefono2,
                direccion: provider.direccion
            }

            if (editProvider){
                const response = await editProviderAsync(request, provider.id!)

                if (response?.status === 204) {
                    alert("El proveedor ha sido editado exitosamente")
                    navigate("/providers")
                } else {
                    console.log(response)
                    alert("Ha ocurrido un error")
                }

                return
            }

            const response = await createProviderAsync(request)

            if (response?.status === 201){
                alert("El proveedor ha sido registrado exitosamente")
                navigate("/providers")
            }
            else{
                console.log(response)
                alert(response?.data)
            }
        } catch (e) {
            const axiosError = e as AxiosError
            const dataError = axiosError.response?.data as { error: string}
            alert(dataError.error)
        } finally{
            setIsLoading(false)
        }
    }

    return(
        <NavBar>
            <div className={styles.container}>
                <Title text="Proveedores"/>

                <div className={styles.inputContainer}>
                    <h3>Crear nuevo proveedor</h3>
                    <div className={styles.separator}></div>

                    <form ref={formRef} className={styles.formContainer} onSubmit={handleSubmit}>
                        <div className={styles.column}>
                            <div className={styles.formItem}>
                                <label>Nombre:</label>
                                <input
                                    required
                                    type="text"
                                    name="nombre"
                                    value={provider.nombre}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className={styles.formItem}>
                                <label>Dirección:</label>
                                <input
                                    required 
                                    type="text"
                                    name="direccion"
                                    value={provider.direccion}
                                    onChange={handleChange}
                                />
                            </div>
    
                            <div className={styles.formItem}>
                                <label>Telefono:</label>
                                <input 
                                    required
                                    type="text"
                                    name="telefono"
                                    value={provider.telefono}
                                    onChange={handleChange}
                                />
                            </div> 
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.column}>       
                        <div className={styles.formItem}>
                            <label>Telefono 2:</label>
                            <input 
                                type="text"
                                name="telefono2"
                                value={provider.telefono2}
                                onChange={handleChange}
                            />
                        </div> 
                        </div>
                    </form>
                    <hr/>
                    <div className={styles.btnContainer}>
                    {editProvider ? 
                            (<button onClick={btnClicked} disabled={isLoading}>Editar</button>) : 
                            (<button onClick={btnClicked} disabled={isLoading}>Crear</button>)}
                        <Link to="/providers">Cancelar</Link>
                    </div>
                </div>
            </div>
        </NavBar>
    )
}