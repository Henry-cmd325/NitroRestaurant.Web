import loader from "../../../assets/loader.svg"
import styles from "./EmployeesTable.module.css"

import { IEmployee } from "../../../models"
import { useEditEmployeeStore } from "../../../store/editEmployee"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { DialogContainer } from "../../../components/dialogContainer/DialogContainer"
import { deleteEmployeeAsync } from "../../../services"

interface props{
    isLoading: boolean;
    refreshEmployees: (id: string) => void;
    employees: IEmployee[];
}

export const EmployeesTable: React.FC<props> = ({ isLoading, refreshEmployees, employees }) => {
    const { editEmployee, setEmployee, setEmployeeAsNull } = useEditEmployeeStore()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const navigate = useNavigate()

    const rowClicked = (uid: string) => {
        setEmployee(uid)
        setModalVisible(true)
    }

    const editFunction = () => {
        navigate("/create-employee")
    }

    const deleteFunction = async () => {
        const response = await deleteEmployeeAsync(editEmployee!.id!)

        if (response?.status === 204){
            setEmployeeAsNull()
            setModalVisible(false)
            alert("Se ha eliminado al empleado")

            refreshEmployees(editEmployee!.id!)
        }
    }

    const cancelFunction = () => {
        setEmployeeAsNull()
        setModalVisible(false)
    }

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.iconColumn}></th>
                        <th className={styles.nameColumn}>Nombre y correo</th>
                        <th className={styles.rolColumn}>Rol</th>
                        <th className={styles.branchColumn}>Sucursal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={4}>
                            <hr className={styles.titleDivider}/>
                        </td>
                    </tr>
                    {
                        isLoading && (
                        <tr>
                            <td colSpan={4} rowSpan={2}>
                                <div className={styles.loaderContainer}><img src={loader}/></div>
                            </td>
                        </tr>)
                    }
                    {employees? employees.map((e => (
                        <>
                            <tr onClick={() => rowClicked(e.id!)} className={styles.tr}>
                                <td>
                                    <div>
                                        <i className="fa-regular fa-user fa-2xl"></i>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.nameContainer}>
                                        <span>{e.displayName}</span>
                                        <span className={styles.email}>{e.email}</span>
                                    </div>
                                </td>
                                <td>{e.rol === "admin"? 
                                        <span>Administrador</span>:
                                        <span>Empleado</span>}
                                </td>
                                <td>{e.nombreSucursal}</td>
                            </tr>
                            <tr>
                                <td className={styles.rowDivider} colSpan={4}>
                                    <hr/>
                                </td>
                            </tr>
                        </>
                        
                    ))):
                    <tr>
                        <td colSpan={4} rowSpan={2}>
                            <div className={styles.loaderContainer}><p>No existe ningun empleado</p></div>
                        </td>
                    </tr>}

                    {
                        (!isLoading && employees.length === 0) && (
                            <tr>
                                <td colSpan={4} rowSpan={2}>
                                    <div className={styles.loaderContainer}><p>Ningun empleado coincide con la búsqueda</p></div>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>

            {!modalVisible || <DialogContainer 
                                editFunction={editFunction} 
                                deleteFunction={deleteFunction} 
                                cancelFunction={cancelFunction}
                            />}
        </> 
    )
}