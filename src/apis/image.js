import { instance } from "./instance"

const config = {
    headers : {'Content-Type' : 'multipart/form-data'}
}

export const photo = async (formData) => {
    const response = await instance.post('/api/products/image', formData, config)
    return response
}