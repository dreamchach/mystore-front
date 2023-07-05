import React from 'react'
import { tags } from '../../utill/array'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const TagSelect = ({register, errors}) => {

  return (
    <div className='w-full'>
        <FormControl sx={{minWidth : '100%'}}>
            <InputLabel id='tag' >상품 태그</InputLabel>
            <Select {...register} id='tag' labelId='tag' label='상품 태그'>
                {tags.map((item) => (<MenuItem value={item.eng} key={item.eng}>{item.ko}</MenuItem>))}
            </Select>
        </FormControl>
        {errors.tag && <div className='text-xs text-red-600'>{errors.tag.message}</div>}
    </div>
  )
}

export default TagSelect