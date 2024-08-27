import axios from "axios";
import { baseUrl } from "../lib/functions";
import { IWareHouseItem } from "../models";

const url = baseUrl + "/almacen"

export const getWareHouseItems = async(): Promise<IWareHouseItem[] | null> => {
    try{
        const response = await axios.get<IWareHouseItem[]>(url)

        return response.data
    } catch (e) {
        console.log(e)
    }

    return null
}

export const updateItemQuantity = async(item: IWareHouseItem) => {
    try{
        const id = item.id!
        delete item.id

        if (item.tipo === "Producto"){
            const response = await axios.put(url + "/producto/" + id, item)

            return response.data
        }
        
        const response = await axios.put(url + "/prima/" + id, item)

        return response.data
    } catch (e) {
        console.log(e)
    }
}