import axios from "axios"
import { API_URL } from "../config1"

const get_product_sale= async ()=> {
    const res= await axios({
        url: API_URL+ "/api/product/sale",
        method: "get"
    })
    const result= await res.data
    return result
}

export default get_product_sale