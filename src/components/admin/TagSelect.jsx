import React from 'react'
import {tags} from '../../utill/array'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const TagSelect = ({register, errors}) => {

  return (
    <div>
        <FormControl sx={{minWidth : '100ch'}}>
            <InputLabel id='tags' >상품 태그</InputLabel>
            <Select {...register} id='tags' labelId='tags' label='상품 태그'>
                {tags.map((item) => (<MenuItem value={item.eng} key={item.eng}>{item.ko}</MenuItem>))}
            </Select>
        </FormControl>

    </div>
  )
}

export default TagSelect