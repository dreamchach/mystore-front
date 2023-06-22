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
            config.headers.authorization = `hello `
            return config
        }
    },
    (error) => {
        console.log(error)
    }
)

instance.interceptors.response.use(
    (response) => {
        console.log(response)
        return response
    },
    (error) => {
        console.log(error)
    }
)