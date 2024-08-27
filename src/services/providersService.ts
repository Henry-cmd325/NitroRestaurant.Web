import axios, { AxiosError } from "axios"
import { baseUrl } from "../lib/functions"
import { IProvider } from "../models"

const url = baseUrl + "/proveedor"

export const getProviderById = async(uid: string): Promise<IProvider | null> => {
    try {
        const response = await axios.get<IProvider>(url + "/" + uid)

        return response.data
    } catch (e) {
        console.log(e)
    }

    return null
}

export const getAllProviders = async(): Promise<IProvider[] | null> => {
    try {
        const response = await axios.get<IProvider[]>(url)

        return response.data
    } catch (e) {
        console.log(e)
    }

    return null
}

export const createProviderAsync = async(request: IProvider) => {
    try{
        const response = await axios.post(url, request)

        return response
    } catch(e) {
        console.log(e)
    }
}

export const editProviderAsync = async(request: IProvider, uid: string) => {
    try{
        const response = await axios.put(url + "/" + uid, request)

        return response
    } catch(e) {
        console.log(e)
    }
}

export const deleteProviderAsync = async(uid: string) => {
    try {
        const response = await axios.delete(url + "/" + uid)

        return response
    } catch (e) {
        const axiosError = e as AxiosError
        console.log(axiosError)
        const dataError = axiosError.response?.data as { error: string}
        alert(dataError.error)
    }
}