import axios from "axios"
import { API_URL } from "../config1"
import Cookies from "js-cookie"

const apply_voucher= async (data)=> {
    const res= await axios({
        url: API_URL + "/api/voucher/apply",
        method: "post",
        data: {
            ...data
        },
        headers: {
            "Authorization": "Bearer "+ Cookies.get("token")
        }
    })
    const result= await res.data
    return result
}

export default apply_voucher