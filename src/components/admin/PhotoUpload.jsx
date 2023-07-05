import { photo } from '@/apis/image'
import { Box } from '@mui/material'
import Dropzone from 'react-dropzone'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const PhotoUpload = ({image, setImage}) => {
    const imageDrop = async (file) => {
        let formData = new FormData()
    
        formData.append('file', file[0])
    
        const response = await photo(formData)
        setImage([...image, response.data.fileName])
    }
    
    return (
        <Box className='flex w-full flex-col items-center'>
            <div>상품 사진</div>
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
                    {image.length !== 0 && image.map((item) => (
                        <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${item}`} key={item}
                            alt='profileImage'
                        />
                    ))}
                </div>
            </div>
        </Box>
    )
}

export default PhotoUpload