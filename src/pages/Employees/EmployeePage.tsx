import styles from "./EmployeePage.module.css"

import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/navbar/NavBar";
import { TableContainer } from "../../components/tableContainer/TableContainer";
import { Title } from "../../components/title/Title";
import { EmployeesTable } from "./Components/EmployeesTable";
import { useEffect, useState } from "react";
import { IEmployee } from "../../models";
import { getEmployeesAsync } from "../../services";
import { useEditEmployeeStore } from "../../store/editEmployee";

export default function EmployeePage(){
    const { setEmployeeAsNull } = useEditEmployeeStore()

    const navigate = useNavigate()
    const [employees, setEmployees] = useState<IEmployee[]>([])
    const [search, setSearch] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const changeEmployees = (id: string) => {
        setEmployees(prev =>  prev.filter(emp => emp.id !== id))
    }

    useEffect(() => {
        setEmployeeAsNull()
        const getEmployees = async() => {
            const result = await getEmployeesAsync()

            setEmployees(result!)
            setIsLoading(false)
        }
        getEmployees()
    }, [setEmployeeAsNull])

    const filterEmployees = (employees: IEmployee[]) => {
        return employees.filter(e => {
            if (search === '')
                return true
            
            const lowerName = e.displayName.toLowerCase()
            const lowerEmail = e.email.toLowerCase()

            return (lowerName.startsWith(search.toLowerCase()) || 
                    lowerEmail.startsWith(search.toLowerCase()))
        })
    }

    const clicked = () => {
        navigate("/create-employee")
    }

    const textChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <NavBar>
            <div className={styles.container}>
                <Title text="Empleados"/>

                <div className={styles.inputIcon}>  
                    <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                    <input onChange={textChanged} type="text"/>
                </div>
                
                <TableContainer textBtn="Agregar empleado" btnClicked={clicked}>
                    <EmployeesTable isLoading={isLoading} refreshEmployees={changeEmployees} employees={filterEmployees(employees)}/>
                </TableContainer>
            </div>
            
        </NavBar>
    )
}