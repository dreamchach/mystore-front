import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import('../../../components/products/Id'), {ssr : false})

const Item = () => {

  
  return (
    <main>
      <NoSSR />
    </main>
  )
}

export default Item

/*
  const [itemProducts, setItemProducts] = useState({})
  const router = useRouter()
  const detailId = router.asPath.substring(15)

  useEffect(async () => {
    const response = await instance.get(`/api/products/${detailId}`)

    console.log(response)
    // setItemProducts(response.data.products)
  }, [])
        {Object.keys(itemProducts).length === 0 ? 
      <div>
        <div className="flex justify-center py-14">
          <DoNotDisturbIcon sx={{fontSize : 100}}/>
        </div>
        <div className="pt-14 font-bold text-main_black flex justify-center">상품이 존재하지 않습니다</div>
      </div> 
      :( 
      <div>
        {itemProducts.title}
      </div>
      )}
      */