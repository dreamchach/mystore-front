import { Box, Button} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { registerUser } from '@/store/thunkFunctions'
import Title from '@/components/Title'
import RequireTextInput from '@/components/auth/RequireTextInput'
import PasswordInput from '@/components/auth/PasswordInput'
import PhotoUpload from '@/components/auth/PhotoUpload'

const Signup = () => {
  const [image, setImage] = useState('')
  const {register, handleSubmit, formState : {errors}} = useForm()
  const router = useRouter()
  const dispatch = useDispatch()
  const onSubmit = async (data) => {
      const body = {...data, profileImgBase64 : image}
      await dispatch(registerUser(body))

      if(getCookie('accessToken')){
        await router.push({pathname : '/'})
      }
  }
  const goLogin = () => {
    router.push({pathname : '/auth/login'})
  }

  useEffect(() => {
    if(getCookie('accessToken')) {
      router.push({pathname : '/'})
    }
  }, [])

  return (
    <div className='mb-14'>
      <Title title='회원가입'/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col items-center gap-5'>
          <RequireTextInput 
            label = '이름' 
            id = 'displayName' 
            placeholder = '이름을 입력해주세요' 
            register = {register('displayName', {require : '이름을 입력해주세요', pattern : {value : /^[가-힣]{2,4}$/, message : '이름 형식에 맞지 않습니다'}})}
            errors = {errors}
          />
          <RequireTextInput 
            label = '이메일' 
            id = 'email' 
            placeholder = '이메일을 입력해주세요' 
            register = {register('email', {require : '이메일을 입력해주세요', pattern : {value : /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/, message : '이메일 형식에 맞지 않습니다'}})}
            errors = {errors}
          />
          <PasswordInput
            errors = {errors} 
            register = {register('password', {require : '비밀번호를 입력해주세요', minLength : {value : 8, message : '비밀번호는 8자리 이상입니다'}, pattern : {value : /^[A-Za-z0-9]{8,}$/, message : '비밀번호 형식에 맞지 않습니다'} })}
          />
          <PhotoUpload setImage={setImage} image={image}/>
          <Box sx={{width : '35ch'}}>
            <p className='text-xs text-slate-400'>
              <span className='text-red-600'>*</span>표시는 필수 입력 사항입니다
            </p>
          </Box>
        </div>
        <div className='flex justify-center mt-5'>
          <Button variant='outlined' color='error' type='submit' sx={{width : '35ch'}}>회원가입</Button>
        </div>
      </form>
      <div  className='text-xs flex justify-center mt-5'>
        <Box sx={{width : '35ch'}}>
            <p>회원가입을 이미 하셨다면?
              <span onClick={goLogin} className='font-bold pl-1 cursor-pointer'>로그인</span>
            </p>
        </Box>
      </div>
    </div>
  )
}

export default Signup