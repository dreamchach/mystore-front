import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/store/thunkFunctions'
import Title from '@/components/Title'
import RequireTextInput from '@/components/auth/RequireTextInput'
import PasswordInput from '@/components/auth/PasswordInput'
import { getCookie } from '@/utill/cookies'
import { useEffect } from 'react'

const Login = () => {
  const {register, handleSubmit, formState : {errors}} = useForm()
  const router = useRouter()
  const dispatch = useDispatch()
  const onSubmit = async (data) => {
      await dispatch(loginUser(data))

      if(getCookie('accessToken')){
        await router.push({pathname : '/'})
      }
  }
  const goSignup = () => {
    router.push({pathname : '/auth/signup'})
  }

  useEffect(() => {
    if(getCookie('accessToken')) {
      router.push({pathname : '/'})
    }
  }, [])
  

  return (
    <div className='mb-14'>
      <Title title='비밀번호'/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col items-center gap-5'>
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
        </div>
        <div className='flex justify-center mt-5'>
          <Button variant='outlined' color='error' type='submit' sx={{width : '35ch'}}>로그인</Button>
        </div>
      </form>
      <div  className='text-xs flex justify-center mt-5'>
        <Box sx={{width : '35ch'}}>
            <p>계정이 없으시다면?
              <span onClick={goSignup} className='font-bold pl-1 cursor-pointer'>회원가입</span>
            </p>
        </Box>
      </div>
    </div>
  )
}

export default Login