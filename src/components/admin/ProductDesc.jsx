import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const ProductDesc = ({desc, description, change, data, setData}) => {
    const [changeDesc, setChangeDesc] = useState(desc)
    const [changeDescription, setChangeDescription] = useState(description)

    const descChange = (event) => {
        setData({...data, desc : event.target.value})
        setChangeDesc(event.target.value)
    }

    const descriptionChange = (event) => {
        setData({...data, description : event.target.value})
        setChangeDescription(event.target.value)
    }
    
  return (
    <div className='m-10'>
        {change ? 
            <div>
                <div className='w-full'>
                    <TextField
                        label='제품 요약설명'
                        onChange={descChange}
                        required
                        sx={{m : 1, width : '100%'}}
                        defaultValue={desc}
                    />
                </div>
                <div className='w-full'>
                    <TextField
                        label='제품 상세설명'
                        onChange={descriptionChange}
                        required
                        multiline
                        sx={{m : 1, width : '100%'}}
                        defaultValue={description}
                    />
                </div>
            </div> :
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore/>}>
                    <Typography sx={{width : '33%', flexShrink : 0}}>
                        요약정보
                    </Typography>
                    <Typography>{changeDesc}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {changeDescription}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        }
    </div>
  )
}

export default ProductDesc