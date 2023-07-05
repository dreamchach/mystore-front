import Title from '@/components/Title'
import PhotoUpload from '@/components/admin/PhotoUpload'
import TagSelect from '@/components/admin/TagSelect'
import TextInput from '@/components/admin/TextInput'
import { addProduct } from '@/store/thunkFunctions'
import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const AddFile = () => {
    const [image, setImage] = useState([])
    const dispatch = useDispatch()
    const {register, handleSubmit, formState : {errors}} = useForm()
    const onSubmit = async (data) => {
      const body = {
        ...data,
        photo : image,
        thumbnail : image[0] || null
      }
      console.log(body)
      await dispatch(addProduct(body))
  }

  return (
    <div className='m-auto w-5/6'>
      <Title title='상품등록'/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col items-center gap-5'>
          <PhotoUpload image={image} setImage={setImage}/>
          <TextInput 
            label = '상품명' 
            id = 'title' 
            register = {register('title', {require : '상품명을 입력해주세요'})}
            errors = {errors}
            type='text'
          />
          <TextInput 
            label = '가격' 
            id = 'price' 
            register = {register('price', {require : '가격을 입력해주세요'})}
            errors = {errors}
            type='number'
          />
          <TextInput 
            label = '제품 요약설명' 
            id = 'desc' 
            register = {register('desc', {require : '제품설명을 입력해주세요', maxLength : {value : 100, message : '100글자 내외로 작성해주세요'}})}
            errors = {errors}
            type='text'
          />
          <TextInput 
            label = '제품 상세설명' 
            id = 'description' 
            register = {register('description', {require : '제품 상세설명을 입력해주세요'})}
            errors = {errors}
            type = 'text'
            multiline = 'true'
          />
          <TagSelect
            register = {register('tag', {require : '상품 태그를 선택해주세요'})}
            errors = {errors}
          />
        </div>
        <div className='flex justify-center my-5'>
          <Button variant='outlined' color='error' type='submit' sx={{width : '100%'}}>상품 등록</Button>
        </div>
      </form>
    </div>
  )
}

export default AddFile