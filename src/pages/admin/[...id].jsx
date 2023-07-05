import dynamic from 'next/dynamic'
import React from 'react'

const NoSSR = dynamic(
  () => import('../../components/admin/Product'),
  {ssr : false}
)

const AdminProduct = () => {

  return (
    <div>
      <NoSSR />
    </div>
  )
}

export default AdminProduct
