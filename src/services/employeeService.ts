import axios, { AxiosError } from "axios"
import { baseUrl } from "../lib/functions"
import { IEmployee, IEmployeeRequest, IEmployeeViewModel } from "../models"

const url = baseUrl + "/admin"

export const getEmployeesAsync = async(): Promise<Array<IEmployee> | null> => {
    try{
        const response = await axios.get<Array<IEmployee>>(url)

        return response.data
    } catch(e){
        console.log(e)
    }
    
    return null
}

export const getEmployeeById = async(uid: string): Promise<IEmployeeViewModel | null> => {
    try{
        const response = await axios.get<IEmployeeViewModel>(url + "/get-edit/" + uid)

        return response.data
    } catch(e){
        console.log(e)
    }

    return null
}

export const createEmployeeAsync = async(request: IEmployee) => {
    const responseEmployee = await axios.post(url + "/registro", request)

    return responseEmployee
}

export const editEmployeeAsync = async(request: IEmployeeRequest, uid: string) => {
    try{
        const response = await axios.put(url + "/" + uid, request)

        return response
    } catch(e){
        console.log(e)
    }
}

export const deleteEmployeeAsync = async (uid: string) => {
    try{
        const response = await axios.delete(url + "/" + uid)

        return response
    } catch(e) {
        const axiosError = e as AxiosError
        const dataError = axiosError.response?.data as { error: string}
        alert(dataError.error)
    }
}