import { getCookie } from "@/utill/cookies"
import axios from "axios"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const instance = axios.create({
    baseURL : baseUrl,
    headers : {
        'Content-Type' : 'application/json'
    }
})

instance.interceptors.request.use(
    (config) => {
        if(config.headers) {
            const token = getCookie('accessToken')
            config.headers.authorization = `hello ${token}`

            if(getCookie('masterkey')) {
                config.headers.masterkey = true
            }
            
            return config
        }
    },
    (error) => {
        console.log(error)
    }
)

instance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        console.log(error)
    }
)