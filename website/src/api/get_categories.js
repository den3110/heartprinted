import axios from "axios"
import { API_URL } from "../config1"

const get_detail_voucher= async (voucherId)=> {
    const res= await axios({
        url: API_URL+ "/api/category/getCategoryHeader",
        method: "get",
    })
    const result= await res.data
    return result
}

export default get_detail_voucher