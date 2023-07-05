import { instance } from "@/apis/instance"
import { useEffect, useState } from "react"
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import Link from "next/link";

export default function Home() {
  const [allProducts, setAllProducts] = useState([])
  const won = (price) => {
    return `${Number(price).toLocaleString()}원`
  }
  const noImage = `https://www.gtn-co.com/cms/wp-content/uploads/2020/06/noimage.jpg`

  useEffect(async () => {
    const response = await instance.get('/api/products')
    setAllProducts(response.data.products)
  }, [])
  
  return (
    <main>
      {allProducts.length === 0 ? 
      <div>
        <div className="flex justify-center py-14">
          <DoNotDisturbIcon sx={{fontSize : 100}}/>
        </div>
        <div className="pt-14 font-bold text-main_black flex justify-center">상품이 존재하지 않습니다</div>
      </div> 
      : <div className="w-5/6 m-auto pt-12">
      <ImageList>
          {allProducts.map((item) => (
            <div key={item.productId}>
              <Link href={{pathname : `/products/item/${item.productId}`}}>
              <ImageListItem sx={{minWidth : 500, height : 450}}>
                <img 
                  src={item.thumbnail[0] === '' ? noImage :`${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${item.thumbnail[0]}`}
                  alt={item.title}
                />
                <ImageListItemBar
                  title={item.title}
                  subtitle={won(item.price)}
                  position="below"
                />
              </ImageListItem>
              </Link>
            </div>
          ))}
        </ImageList></div>}
    </main>
  )
}
