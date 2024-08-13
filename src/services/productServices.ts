import axios, { AxiosError } from "axios"
import { baseUrl } from "../lib/functions"
import { IProduct, IProductViewModel } from "../models"
import { IProductRequest } from "../models/Requests/IProductRequest"
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from "../lib/firebase";

const url = baseUrl + "/producto"

export const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No file provided');
        return;
      }
  
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
          console.log("Hola")
        }
      );
    });
  };

export const getProductsAsync = async(): Promise<Array<IProduct> | null> => {
    try{
        const response = await axios.get<Array<IProduct>>(url)

        return response.data
    } catch(e){
        console.log(e)
    }
    
    return null
}

export const getProductById = async(uid: string): Promise<IProductViewModel | null> => {
    try{
        const response = await axios.get<IProductViewModel>(url + "/get-edit/" + uid)

        return response.data
    } catch(e) {
        console.log(e)
    }

    return null
}

export const createProductAsync = async(request: IProductRequest) => {
    try{
        const response = await axios.post(url, request)

        return response
    } catch(e){
        console.log(e)
    }
}

export const editProductAsync = async(request: IProductRequest, uid: string) => {
    try{
        const response = await axios.put(url + "/" + uid, request)

        return response
    } catch(e){
        console.log(e)
    }
}

export const deleteProductAsync = async(uid: string) => {
    try {
        const response = await axios.delete(url + "/" + uid)

        return response
    } catch (e) {
        const axiosError = e as AxiosError
        const dataError = axiosError.response?.data as { error: string}
        alert(dataError.error)
    }
}