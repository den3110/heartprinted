import axios from "axios"
import { API_URL } from "../config1"

const submit_contact= async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/contact",
        method: "post",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default submit_contact