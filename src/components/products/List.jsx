import { instance } from '@/apis/instance'
import React, { useEffect, useState } from 'react'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import Link from 'next/link';


const List = () => {
    const [id, setId] = useState(location.pathname.substring(15))
    const [item, setItem] = useState([])
    const won = (price) => {
        return `${Number(price).toLocaleString()}원`
      }
    const noImage = `https://www.gtn-co.com/cms/wp-content/uploads/2020/06/noimage.jpg`

    useEffect(async () => {
        try {
            const data = {
                searchTag : id
            }
            const response = await instance.post(`/api/products/search`, data)
            setItem(response.data.products)
        } catch (error) {
            console.log(error)
        }
    }, [id])

    useEffect(() => {
        setId(location.pathname.substring(15))
    }, [location.pathname])
    

    console.log('id', id)
    console.log('item', item)
    

  return (
    <main>
        {item.length === 0 ? 
            <div>
                <div className="flex justify-center py-14">
                    <DoNotDisturbIcon sx={{fontSize : 100}}/>
                </div>
                <div className="pt-14 font-bold text-main_black flex justify-center">상품이 존재하지 않습니다</div>
            </div> 
        : 
            <div className="w-5/6 m-auto pt-12">
                <ImageList>
                    {item.map((i)=>(
                        <div key={i.productId}>
                            <Link href={{pathname : `/products/item/${i.productId}`}}>
                                <ImageListItem sx={{minWidth : 500, height : 450}}>
                                    <img
                                        src={i.thumbnail[0] === '' ? noImage : `${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${i.thumbnail[0]}`}
                                        alt={i.title}
                                />
                                <ImageListItemBar
                                    title={i.title}
                                    subtitle={won(i.price)}
                                    position="below"
                                />
                                </ImageListItem>
                            </Link>
                        </div>
                    ))}
                </ImageList>

            </div>
        }
    </main>
  )
}

export default List
