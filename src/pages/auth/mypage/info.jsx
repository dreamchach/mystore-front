import withAuth from '@/components/withAuth'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../../../components/Title'
import { Button, TextField } from '@mui/material'
import { photo } from '@/apis/image'
import Dropzone from 'react-dropzone'
import { AddCircleOutline } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { reMyInfo } from '@/store/thunkFunctions'

const Info = () => {
  const [change, setChange] = useState(false)
  const [image, setImage] = useState('')
  const {register, handleSubmit, reset, formState : {errors}} = useForm()
  const userData = useSelector(state => state.user.userData)
  const dispatch = useDispatch()
  const noImage = `https://www.gtn-co.com/cms/wp-content/uploads/2020/06/noimage.jpg`
  const onChnage = () => {
    if(!change) {
      setChange(true)
      reset()
    }
  }
  const onSubmit = async (data) => {
    try {
      const body = {
        ...data,
        profileImgBase64 : image
      }
      await dispatch(reMyInfo(body))
      setChange(false)

    } catch (error) {
      console.log(error)
    }
  }
  const imageDrop = async (file) => {
    let formData = new FormData()

    formData.append('file', file[0])

    const response = await photo(formData)
    setImage(response.data.fileName)
  }
  console.log(image)
  console.log(change)

  return (
    <div>
      <div>
        <Title title='내 정보 수정'/>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='w-4/5 m-auto'>
        <div className='flex items-center gap-5 mx-2.5 mb-14'>
          <div>프로필 사진</div>
          {change ? (
            <div className='w-2/3 flex gap-5'>
              <Dropzone onDrop={imageDrop}>
                {({getRootProps, getInputProps}) => (
                  <section className={`${image === '' ? "w-1/2" : "w-full"} relative after:block after:pb-full border rounded flex`}>
                    <div {...getRootProps()} className='w-full h-full'>
                      <input {...getInputProps()} />
                      <p className='w-full h-full flex items-center justify-center'>
                        <div>
                          <AddCircleOutline fontSize='large'/>
                        </div>
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
              <div>
                {image !== '' && <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${image}`}
                  alt='profileImage'
                  className='rounded'
                />}
              </div>
            </div>
          ) : (
            <div className='w-1/3'>
              <img 
                src={userData.profileImgBase64 ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${userData.profileImgBase64}` : noImage}
                alt={userData.displayName}
                className='rounded'
              />
            </div>
          )}
        </div>
        <div className='mb-14'>
          <TextField 
            label='이름' 
            id='displayName' 
            sx={{m : 1, width : '100%'}} 
            defaultValue={userData.displayName}
          />
        </div>
        <div className='mb-14'>
          <TextField 
            label='이메일' 
            id='email' 
            sx={{m : 1, width : '100%'}} 
            defaultValue={userData.email}
          />
        </div>
        {change && <div className='flex w-full gap-5'>
          <div className='w-1/2'>
            <TextField 
              label='현재 비밀번호'
              required 
              id='old-password' 
              sx={{m : 1, width : '100%'}}
              {...register('oldPassword')}
            />
          </div>
          <div className='w-1/2'>
            <TextField 
              label='새로운 비밀번호' 
              id='new-password' 
              required
              sx={{m : 1, width : '100%'}}
              {...register('newPassword')}
            />
          </div>
        </div>}
        <div className='mt-14'>
          <Button type='submit' variant='outlined' color='error' onClick={onChnage} sx={{width : '100%'}}>{change ? '정보 수정' : '수정 확인'}</Button>
        </div>
      </form>
    </div>
  )
}

export default withAuth(Info) 