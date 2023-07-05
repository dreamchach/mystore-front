import { instance } from '@/apis/instance'
import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ReactImageGallery from 'react-image-gallery'
import { useSelector } from 'react-redux'

const Id = () => {
    const [id, setId] = useState(location.pathname.substring(15))
    const [product, setProduct] = useState({})
    const [images, setImages] = useState([])
    const userData = useSelector(state => state.user.userData)
    const router = useRouter()
    const noImage = `https://www.gtn-co.com/cms/wp-content/uploads/2020/06/noimage.jpg`
    const onPurchase = async (id) => {
        try {
            const data = {
                email : userData.email,
                productId : id
            }
            console.log(data)
            const response = await instance.post('/api/products/buy', data)
            console.log(response)
            router.push('/auth/mypage/cart')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(async () => {
        const response = await instance.get(`/api/products/${id}`)
        setProduct(response.data.product)
    }, [])

    useEffect(() => {
        let array = []

        if(Object.keys(product).length !== 0) {
            if(product.photo.length === 0) {
                array = [{original : noImage, thumbnail : noImage}]
                setImages(array)
            }else {
                product.photo.map((item) => {
                    array.push({
                        original : `${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${item}`,
                        thumbnail : `${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${item}`
                    })
                })
                setImages(array)
            }
        }
    }, [product])
    
    console.log(product)
    

  return (
    <div className='w-5/6 m-auto pt-12'>
        <div className='flex gap-5'>
            <div className='w-1/2'>
                <ReactImageGallery items={images}/>
            </div>
            <div className='w-1/2 p-8 border border-main_black'>
                <div className='m-5'>
                    {product.title}
                </div>
                <div className='flex justify-end m-5'>
                    {`${Number(product.price).toLocaleString()}원`}
                </div>
                <div onClick={() => onPurchase(product.productId)}>
                    <Button variant='outlined' color='error' sx={{width : '100%'}}>구매하기</Button>
                </div>
            </div>
        </div>
        <div>
            <div className='m-10'>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Typography sx={{width : '33%', flexShrink : 0}}>
                            요약정보
                        </Typography>
                        <Typography>{product.desc}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{product.description}</Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    </div>
  )
}

export default Id