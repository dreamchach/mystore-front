import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
  const {register, handleSubmit, formState : {errors}} = useForm()
  const onSubmit = (data) => {
    console.log(data)
  }
  
  console.log(errors)

  return (
    <div>
      <div>로그인</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label htmlFor='email'>이메일</label>
            <input type='email' id='email' placeholder='이메일을 입력해주세요' {...register('email', {require : true, pattern : /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/})} />
          </div>
          <div>
            <label htmlFor='password'>비밀번호</label>
            <input type='password' id='password' placeholder='비밀번호를 입력해주세요' {...register('password', {require : true, pattern : /^[A-Za-z0-9]{8,}$/})} />
          </div>
        </div>
        <div>
          <Button type='submit'>로그인</Button>
        </div>
      </form>
      <div>
        <p>이메일이 없으시다면?</p>
        <Link href='/auth/signup'>
          <span>회원가입</span>
        </Link>
      </div>
    </div>
  )
}

export default Login