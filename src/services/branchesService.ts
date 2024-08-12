import axios from "axios"
import { IBranch } from "../models"
import { baseUrl } from "../lib/functions"

const url = baseUrl + "/sucursal"

export const getBranchesAsync = async(): Promise<IBranch[] | null> => {
    try{
        const response = await axios.get<Array<IBranch>>(url)

        return response.data
    } catch(e){
        console.log(e)
    }

    return null
}