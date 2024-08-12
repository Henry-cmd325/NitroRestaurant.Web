import axios from "axios"
import { baseUrl } from "../lib/functions"
import { IStatProduct } from "../models"

const url = baseUrl + "/estadistica"

export const getStatsProducts = async(): Promise<IStatProduct | null> => {
    try{
        const response = await axios.get<IStatProduct>(url + "/" + "productos")

        return response.data
    } catch(e){
        console.error(e)
    }

    return null
}

export const getBestDayAsync = async(): Promise<{ bestDay: string } | null> => {
    try{
        const response = await axios.get<{ bestDay: string }>(url + "/" + "dia")

        return response.data
    } catch(e){
        console.log(e)
    }

    return null
}