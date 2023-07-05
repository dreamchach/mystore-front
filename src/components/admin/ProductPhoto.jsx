import { photo } from '@/apis/image'
import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import ReactImageGallery from 'react-image-gallery'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ProductPhoto = ({image, change, data, setData}) => {
    const [images, setImages] = useState([])
    const [putImage, setPutImage] = useState([])
    const [newLoading, setNewLoading] = useState(false)
    const noImage = `https://www.gtn-co.com/cms/wp-content/uploads/2020/06/noimage.jpg`
    
    const imageDrop = async (file) => {
        let formData = new FormData()
    
        formData.append('file', file[0])
    
        const response = await photo(formData)
        setPutImage([...putImage, response.data.fileName])

    }

    useEffect(() => {
        if(change){
            setNewLoading(true)
        }
    }, [change])

    useEffect(() => {
        setData(
            {
                ...data,
                photo : putImage,
                thumbnail : putImage[0] || ['']
            }
        )

        let array = []

        if(newLoading === false && image.length > 0){
            image.map((item) => {
                return array.push({
                    original : `${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${item}`,
                    thumbnail : `${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${item}`
                })
            })
            setImages(array)
        }else if(newLoading === false && image.length === 0) {
            array = [{original : noImage, thumbnail : noImage }]
            setImages(array)
        }
        else if(newLoading === true && putImage.length === 0) {
            array = [{original : noImage, thumbnail : noImage }]
            setImages(array)
        }else if(newLoading === true && putImage.length > 0) {
            putImage.map((item) => {
                return array.push({
                    original : `${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${item}`,
                    thumbnail : `${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${item}`
                })
            })
            setImages(array)
        }
    }, [putImage, newLoading, image])
    
  return (
    <div className='w-1/2'>
        {!change ? 
            <ReactImageGallery items={images}/>
            :
            <div className='flex gap-5 mb-5 w-full'>
                <Dropzone onDrop={imageDrop}>
                    {({getRootProps, getInputProps}) => (
                        <section className='w-full relative after:block after:pb-full'>
                            <div {...getRootProps()} className='mt-5 w-full h-full'>
                                <input {...getInputProps()} />
                                <p className='w-full h-full border-2 rounded flex justify-center items-center cursor-pointer'>
                                    <div>
                                        <AddCircleOutlineIcon fontSize='large'/>
                                    </div>
                                </p>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <div className='flex gap-1 h-1/2 overflow-x-scroll pt-5 w-full'>
                    {putImage.length !== 0 && putImage.map((item) => (
                        <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${item}`} key={item}
                            alt='profileImage'
                        />
                    ))}
                </div>
            </div>
        }
    </div>
  )
}

export default ProductPhoto