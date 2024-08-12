import axios from "axios"
import { baseUrl } from "../lib/functions"
import { IName } from "../models"

const url = baseUrl + "/categoria"

export const getCategories = async(): Promise<Array<IName> | null> => {
    try{
        const response = await axios.get<Array<IName>>(url)

        return response.data
    } catch(e){
        console.log(e)
    }
    
    return null
}