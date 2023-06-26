import { photo } from '@/apis/image'
import { Box } from '@mui/material'
import React from 'react'
import Dropzone from 'react-dropzone'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const PhotoUpload = ({setImage, image}) => {
    const imageDrop = async (file) => {
        let formData = new FormData()
    
        formData.append('file', file[0])
    
        const response = await photo(formData)
        setImage(response.data.fileName)
    }

    return (
        <Box sx={{width : '35ch'}}>
            <div>프로필 사진</div>
            <div className='flex gap-5'>
                <Dropzone onDrop={imageDrop}>
                    {({getRootProps, getInputProps}) => (
                        <section className='w-20 h-20'>
                            <div {...getRootProps()} className='mt-5'>
                                <input {...getInputProps()} />
                                <p className='w-20 h-20 border-2 rounded flex justify-center items-center cursor-pointer'>
                                    <div>
                                        <AddCircleOutlineIcon/>
                                    </div>
                                </p>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <div className='w-20 h-20 mt-5'>
                    {image !== '' && <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${image}`}
                        alt='profileImage'
                    />}
                </div>
            </div>
        </Box>
    )
}

export default PhotoUpload