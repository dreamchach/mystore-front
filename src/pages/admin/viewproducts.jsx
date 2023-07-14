import { instance } from '@/apis/instance'
import { Button, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import withAdmin from '@/components/withAdmin';

const Viewfile = () => {
  const [items, setItems] = useState([])
  const [rows, setRows] = useState([])

  useEffect(async () => {
    const response = await instance.get('/api/products')
    console.log(response.data.products)
    setItems(response.data.products)
  }, [])

  useEffect(() => {
    const response = []
    items.map((item) => response.push({
      title : item.title,
      price : item.price,
      sold : item.sold,
      isSoldOut : item.isSoldOut,
      productId : item.productId
    }))
    setRows(response)
  }, [items])
  console.log(items)
  
  return (
    <div>
      <div className='m-14'>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>상품명</TableCell>
                <TableCell>{'상품가격 (원)'}</TableCell>
                <TableCell>{'상품 판매개수 (개)'}</TableCell>
                <TableCell>상품 매진여부</TableCell>
                <TableCell>상세보기</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (

                  <TableRow key={row.title}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{Number(row.price).toLocaleString()} (원)</TableCell>
                      <TableCell>{Number(row.sold).toLocaleString()} (개)</TableCell>
                      <TableCell>{row.isSoldOut ? '매진' : '재고 있음'}</TableCell>
                      <TableCell>
                        <Link href={`/admin/${row.productId}`}>
                          <Button color='error' variant='outlined'>상세보기</Button>
                        </Link>
                      </TableCell>
                  </TableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className='fixed right-0 m-5'>
        <Link href='/admin/addproduct'>
          <Fab color="error" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </div>

  )
}

export default withAdmin(Viewfile) 