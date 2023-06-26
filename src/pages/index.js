import { instance } from "@/apis/instance"
import { useEffect, useState } from "react"
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

export default function Home() {
  const [allProducts, setAllProducts] = useState([])

  useEffect(async () => {
    const response = await instance.get('/api/products')
    
    console.log(response)
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
      : allProducts.map((item) => (
        <div key={item.title}>
          {item.title}
        </div>
      ))}
    </main>
  )
}
