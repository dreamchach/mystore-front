// import { tags } from '@/utill/array'
import { tags } from '@/utill/array'
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
import React from 'react'

const ProductInfo = ({title, price, sold, isSoldOut, tag, change, data, setData}) => {
    const won = (price) => {
        if(change) {
            return `${Number(price).toLocaleString()}원`
        }else {
            return price
        }
    }
    console.log(won(price))
    console.log(change)

  return (
    <div className='w-1/2 p-8 border border-main_black'>
        <div className='m-5'>
            <TextField 
                defaultValue={title} 
                label='상품명' 
                required={change ? true : false} 
                inputProps={change ? {readOnly : false} : {readOnly : true}}
                onChange={(event) => setData({...data, title : event.target.value})}
            />
        </div>
        <div className='flex justify-end m-5'>
            <TextField 
                defaultValue={won(price)} 
                label='상품가격' 
                type={change ? 'number' : 'text'}
                required={change ? true : false} 
                inputProps={change ? {readOnly : false} : {readOnly : true}}
                onChange={(event) => setData({...data, price : event.target.value})}
            />
        </div>
        <div className='border border-main_black p-5'>
        <div className='mb-5'>
            <div className='w-full'>
                <FormControl sx={{minWidth : '100%'}}>
                    <InputLabel id='tag' >상품 태그</InputLabel>
                    <Select 
                        labelId='tag' 
                        label='상품 태그'
                        required={change ? true : false}
                        defaultValue={tag}
                        inputProps={change ? {readOnly : false} : {readOnly : true}}
                        onChange={(event) => setData({...data, tag : event.target.value})}
                    >
                        {tags.map((item) => (<MenuItem value={item.eng} key={item.eng}>{item.ko}</MenuItem>))}
                    </Select>
                </FormControl>
            </div>
        </div>
        <div className='mb-5'>
                <div>상품이 몇개나 판매되었나요?</div>
                <TextField 
                    type='number' 
                    defaultValue={sold} 
                    inputProps={{readOnly : true}}
                    sx={{minWidth : '100%'}}
                />
            </div>
            <div className='mb-5'>
                <div>상품이 매진되었나요?</div>
                <FormControlLabel 
                    control={<Switch defaultValue={isSoldOut ? true : false} disabled={change ? false : true}/>}
                    label='매진'
                    labelPlacement='end'
                    onChange={(event) => setData({...data, isSoldOut : event.target.checked})}
                />
            </div>
        </div>
    </div>
  )
}

export default ProductInfo