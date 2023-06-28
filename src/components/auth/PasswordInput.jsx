import { Visibility, VisibilityOff } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'

const PasswordInput = ({register, errors}) => {
    const [showPassword, setShowPassword] = useState(false);
    console.log(errors)

  return (
    <div>
        <TextField 
            label='비밀번호' 
            required 
            id='password' 
            sx={{m : 1, width : '35ch'}} 
            placeholder='비밀번호를 입력하세요' 
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end" onClick={()=>{setShowPassword(!showPassword)}}>
                    {showPassword ? <VisibilityOff className='cursor-pointer'/> : <Visibility  className='cursor-pointer'/>}
                  </InputAdornment>
                ),
              }}
            {...register}
        />
        {errors.password && <div className='text-xs text-red-600'>{errors.password.message}</div>}
    </div>
  )
}

export default PasswordInput