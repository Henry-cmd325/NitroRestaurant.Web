import styles from "./CreateEmployeePage.module.css"

import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../../components/navbar/NavBar";
import { Title } from "../../components/title/Title";
import { IBranch, IEmployeeViewModel, IEmployeeRequest } from "../../models";
import { useEffect, useRef, useState } from "react";
import { getBranchesAsync } from "../../services/branchesService";
import { createEmployeeAsync, editEmployeeAsync } from "../../services";
import { AxiosError } from "axios";
import { useEditEmployeeStore } from "../../store/editEmployee";

const initialEmployee: IEmployeeViewModel = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    password2: "",
    rol: "empleado",
    id_sucursal: "",
    photoURL: "https://media.istockphoto.com/id/544353640/es/foto/negocios-peque%C3%B1a.jpg?s=2048x2048&w=is&k=20&c=LNq_MPXS3jtHcbhed8ADFPf98lZyOSgZXG6HXq-3P90="
}

export default function CreateEmployeePage(){
    const { editEmployee } = useEditEmployeeStore()

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [employee, setEmployee] = useState<IEmployeeViewModel>(editEmployee || initialEmployee)
    const [branches, setBranches] = useState<IBranch[]>([])

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        const getData = async() => {
            const responseBranches = await getBranchesAsync()
            setBranches(responseBranches!)
        }

        getData()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setEmployee(prevEmployee => ({
            ...prevEmployee,
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

        if (employee.id_sucursal === "" || employee.rol === ""){
            alert("Rellene todos los campos")
            return
        }

        if (employee.password !== employee.password2){
            alert("Las dos contraseñas deben de ser iguales")
            return
        }

        setIsLoading(true)

        try{
            const request: IEmployeeRequest = {
                displayName: employee.nombre + " " + employee.apellido,
                email: employee.email,
                rol: employee.rol,
                password: employee.password,
                id_sucursal: employee.id_sucursal,
                photoURL: employee.photoURL
            }

            if (editEmployee){
                const response = await editEmployeeAsync(request, employee.id!)

                if (response?.status === 204){
                    alert("El empleado ha sido editado exitosamente")
                    navigate("/employees")
                }
                else{
                    console.log(response)
                    alert("Ha ocurrido un error")
                }

                return
            }
            const response = await createEmployeeAsync(request)
            
            if (response?.status === 201){
                alert("El empleado ha sido registrado exitosamente")
                navigate("/employees")
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
                <Title text="Empleados"/>

                <div className={styles.inputContainer}>
                    <h3>Inscribir nuevo empleado</h3>
                    <div className={styles.separator}></div>

                    <form ref={formRef} className={styles.formContainer} onSubmit={handleSubmit}>
                        <div className={styles.column}>
                            <div className={styles.formItem}>
                                <label>Nombre:</label>
                                <input
                                    required
                                    type="text"
                                    name="nombre"
                                    value={employee.nombre}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className={styles.formItem}>
                                <label>Apellido:</label>
                                <input
                                    required 
                                    type="text"
                                    name="apellido"
                                    value={employee.apellido}
                                    onChange={handleChange}
                                />
                            </div>
    
                            <div className={styles.formItem}>
                                <label>Email:</label>
                                <input 
                                    required
                                    type="text"
                                    name="email"
                                    value={employee.email}
                                    onChange={handleChange}
                                />
                            </div>   
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.column}>
                            <div className={styles.formItem}>
                                <label>Sucursal:</label>
                                <select
                                    name="id_sucursal"
                                    value={employee.id_sucursal}
                                    onChange={handleChange}
                                >
                                    <option>Selecciona una sucursal</option>
                                    {
                                        branches?.map(branch => (
                                            <option value={branch.id}>{branch.nombre}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            
                            <div className={styles.formItem}>
                                <label>Contraseña:</label>
                                {!editEmployee ? (
                                    <input 
                                        required
                                        type="password"
                                        name="password"
                                        value={employee.password}
                                        onChange={handleChange}
                                        pattern=".{6,}"
                                    />
                                ):
                                (
                                    <input 
                                        type="password"
                                        name="password"
                                        value={employee.password}
                                        onChange={handleChange}
                                        pattern=".{6,}"
                                    />
                                )}
                               
                            </div>

                            <div className={styles.formItem}>
                                <label>Confirma la contraseña:</label>
                                {!editEmployee ? (
                                    <input 
                                        required
                                        type="password"
                                        name="password2"
                                        value={employee.password2}
                                        onChange={handleChange}
                                    />
                                ):
                                (
                                    <input 
                                        type="password"
                                        name="password2"
                                        value={employee.password2}
                                        onChange={handleChange}
                                    />
                                )}
                                
                            </div>

                        </div>
                    </form>
                    <p className={styles.info}>La contraseña debe de tener al menos 6 carácteres</p>
                    <hr/>
                    <div className={styles.btnContainer}>
                    {editEmployee ? 
                            (<button onClick={btnClicked} disabled={isLoading}>Editar</button>) : 
                            (<button onClick={btnClicked} disabled={isLoading}>Crear</button>)}
                        <Link to="/employees">Cancelar</Link>
                    </div>
                </div>
            </div>
        </NavBar>
    )
}