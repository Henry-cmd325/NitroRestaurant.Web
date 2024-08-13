import styles from "./CreateProductPage.module.css"

import { NavBar } from "../../components/navbar/NavBar";
import { Title } from "../../components/title/Title";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { createProductAsync, editProductAsync, uploadImage } from "../../services";
import { getBranchesAsync } from "../../services/branchesService";
import { IBranch, IProductRequest, IName, IProductViewModel } from "../../models";
import { getUms } from "../../services/umService";
import { getCategories } from "../../services/categoryService";
import { AxiosError } from "axios";
import { useEditProductStore } from "../../store/editProduct";


const initialProduct: IProductViewModel = {
    cantidad: 0,
    contable: 0,
    id_sucursal: "",
    id_categoria: "",
    id_um: "",
    imagen: "https://images.pexels.com/photos/25285470/pexels-photo-25285470/free-photo-of-pan-plato-vegetales-verduras.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    inversion: "",
    nombre: "",
    precio: "",
    calorias: "",
    unidad: "",
    valor: 20
}

export default function CreateProductPage(){
    const { editProduct } = useEditProductStore()

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [product, setProduct] = useState<IProductViewModel>(editProduct || initialProduct)
    const [branches, setBranches] = useState<IBranch[]>()
    const [ums, setUms] = useState<IName[]>()
    const [categories, setCategories] = useState<IName[]>()
    const [url, setUrl] = useState<string>("")

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const newUrl = await uploadImage(event.target.files[0])
            setUrl(newUrl)
        }
    }
    

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        const getData = async() => {
            const responseBranches = await getBranchesAsync()
            const responseCategories = await getCategories()
            const responseUms = await getUms()

            
            setBranches(responseBranches!)
            setCategories(responseCategories!)
            setUms(responseUms!)
        }

        getData()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setProduct(prevProduct => ({
            ...prevProduct,
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

        setIsLoading(true)
        try{
            if (editProduct){
                const request: IProductRequest = {
                    cantidad: product.cantidad,
                    contable: product.contable,
                    id_sucursal: product.id_sucursal,
                    id_categoria: product.id_categoria,
                    id_um: product.id_um,
                    imagen: url,
                    inversion: Number(product.inversion),
                    nombre: product.nombre,
                    precio: Number(product.precio),
                    nutricion: {
                        calorias: Number(product.calorias),
                        contenido:{
                            unidad: product.unidad,
                            valor: product.valor 
                        }
                    },
                    stripe_product_id: product.stripe_product_id
                }

                const response = await editProductAsync(request, product.id!)

                if (response?.status === 204){
                    alert("El producto ha sido editado exitosamente")
                    navigate("/products")
                }
                else{
                    console.log(response)
                    alert("Debe de rellenar todos los campos")
                }

                return
            }

            if (!url) {
                alert("Espere un momento mientras se sube la imagen")
                return
            }
            const request: IProductRequest = {
                cantidad: product.cantidad,
                contable: product.contable,
                id_sucursal: product.id_sucursal,
                id_categoria: product.id_categoria,
                id_um: product.id_um,
                imagen: url,
                inversion: Number(product.inversion),
                nombre: product.nombre,
                precio: Number(product.precio),
                nutricion: {
                    calorias: Number(product.calorias),
                    contenido:{
                        unidad: product.id_categoria === "QMy6jN2PFhU7Lz4PjN7R" ? "litros" : "gramos",
                        valor: product.id_categoria === "QMy6jN2PFhU7Lz4PjN7R" ? 0.25 : product.valor 
                    }
                }
            }
            
            const response = await createProductAsync(request)
            
            if (response?.status === 201){
                alert("El producto ha sido creado exitosamente")
                navigate("/products")
            }
            else{
                console.log(response)
                alert("Debe de rellenar todos los campos")
            }
        } catch(e){
            const axiosError = e as AxiosError
            const dataError = axiosError.response?.data as { error: string}
            alert(dataError.error)
        } finally {
            setIsLoading(false)
        }
        
    }

    return(
        <NavBar>
            <div className={styles.container}>
                <Title text="Productos"/>

                <div className={styles.inputContainer}>
                    <h3>Crear nuevo producto</h3>
                    <div className={styles.separator}></div>

                    <form ref={formRef} className={styles.formContainer} onSubmit={handleSubmit}>
                        <div className={styles.column}>
                            <div className={styles.formItem}>
                                <label>Nombre:</label>
                                <input 
                                    required
                                    type="text"
                                    name="nombre"
                                    value={product.nombre} 
                                    onChange={handleChange}   
                                />
                            </div>
                            
                            <div className={styles.formItem}>
                                <label>Precio:</label>
                                <input 
                                    required
                                    type="text"
                                    name="precio"
                                    value={product.precio}
                                    onChange={handleChange}
                                />
                            </div>
    
                            <div className={styles.formItem}>
                                <label>Sucursal:</label>
                                <select 
                                    required
                                    name="id_sucursal" 
                                    onChange={handleChange}
                                    value={product.id_sucursal}
                                >
                                    <option>Selecciona una sucursal</option>
                                    {branches?.map(branch => {
                                        if (product.id_sucursal === branch.id)
                                            return (<option selected value={branch.id}>{branch.nombre}</option>)
                                        else
                                            return (<option value={branch.id}>{branch.nombre}</option>)
                                    })}
                                </select>
                            </div>
                            
                            <div className={styles.formItem}>
                                <label>Unidad de medida:</label>
                                <select
                                    required
                                    name="id_um"   
                                    onChange={handleChange}
                                    value={product.id_um} 
                                >
                                    <option>Selecciona una UM</option>
                                    {ums?.map(um => {
                                        if (product.id_um === um.id)
                                            return (<option selected value={um.id}>{um.nombre}</option>)
                                        else
                                            return (<option value={um.id}>{um.nombre}</option>)
                                    })}
                                </select>
                            </div>
                            
                        </div>
                        <div className={styles.divider}></div>
                            <div className={styles.column}>
                                <div className={styles.formItem}>
                                    <label>Categoria:</label>
                                    <select
                                        required
                                        name="id_categoria"
                                        onChange={handleChange}
                                        value={product.id_categoria}
                                    >
                                        <option>Selecciona una categoria</option>
                                        {categories?.map(cat => {
                                            if (product.id_categoria === cat.id)
                                                return (<option selected value={cat.id}>{cat.nombre}</option>)
                                            else
                                                return (<option value={cat.id}>{cat.nombre}</option>)
                                        })}
                                    </select>
                                </div>
                            
                            <div className={styles.formItem}>
                                <label>Inversion:</label>
                                <input 
                                    required
                                    type="text"
                                    name="inversion"
                                    value={product.inversion}
                                    onChange={handleChange}
                                />
                            </div>
                        
                            <div className={styles.formItem}>
                                <label>Calorias:</label>
                                <input
                                    required
                                    type="text"
                                    name="calorias"
                                    value={product.calorias}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.formItem}>
                                <label>Imagen:</label>
                                <input
                                    type="file" 
                                    onChange={handleFileChange}
                                    className={styles.fileInput}
                                />
                            </div>
                        </div>
                    </form>
                    <hr/>
                    <div className={styles.btnContainer}>
                        {editProduct ? 
                            (<button onClick={btnClicked} disabled={isLoading}>Editar</button>) : 
                            (<button onClick={btnClicked} disabled={isLoading}>Crear</button>)}
                        
                        <Link to="/products">Cancelar</Link>
                    </div>
                </div>
            </div>
            
        </NavBar>
    )
}