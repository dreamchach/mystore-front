import { instance } from "@/apis/instance"
import { useEffect, useState } from "react"
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const NoSSR = dynamic(()=>import('../../../components/products/List'), {ssr : false})

const Tags = () => {

  
  return (
    <main>
      <NoSSR/>
    </main>
  )
}

export default Tags

/*
  const [listProducts, setListProducts] = useState([])
  const router = useRouter()
  const data = {
    searchTag : router.asPath.substring(15)
  }
  console.log(data)

  useEffect(async () => {
    const response = await instance.post('/api/products/search', data)

    setListProducts(response.data.products)
  }, [])
{listProducts.length === 0 ? 
      <div>
        <div className="flex justify-center py-14">
          <DoNotDisturbIcon sx={{fontSize : 100}}/>
        </div>
        <div className="pt-14 font-bold text-main_black flex justify-center">상품이 존재하지 않습니다</div>
      </div> 
      : listProducts.map((item) => (
        <div key={item.title}>
          {item.title}
        </div>
      ))}
      */