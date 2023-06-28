import { TextField } from '@mui/material'
import React from 'react'

const RequireTextInput = ({label, id, placeholder, register, errors}) => {
  console.log(errors)

  return (
    <div>
        <TextField 
          label={label} 
          required 
          id={id} 
          sx={{m : 1, width : '35ch'}} 
          placeholder={placeholder} 
          {...register}
        />
        {errors[id] && <div className='text-xs text-red-600'>{errors[id].message}</div>}
    </div>
  )
}

export default RequireTextInput