import { TextField } from '@mui/material'
import React from 'react'

const TextInput = ({label, id, register, errors, type, multiline}) => {

  return (
    <div>
        <TextField 
          label={label} 
          required 
          id={id} 
          sx={{m : 1, width : '100ch'}}  
          {...register}
          type={type}
          multiline = {multiline ? true : false}
        />
        {errors[id] && <div className='text-xs text-red-600'>{errors[id].message}</div>}
    </div>
  )
}

export default TextInput