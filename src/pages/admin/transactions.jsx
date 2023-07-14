import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { useEffect, useMemo, useState } from 'react';
import { instance } from '@/apis/instance';
import withAdmin from '@/components/withAdmin';
import { Button } from '@mui/material';

const headCells = [
  {id: 'title', label: '상품명'},
  {id: 'price', label: '상품가격'},
  {id: 'number', label: '구매개수'},
  {id: 'sum', label: '총합'},
  {id: 'user', label: '구매자'},
  {id: 'done', label: '전송 완료'},
  {id: 'isCanceled', label: '전송 취소'}
]

const TransactionsTable = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [transactions, setTransactions] = useState([])
  const [clickChange, setClickChange] = useState('')

  const stableSort = (array) => {
    const sort = [...array]
    if(clickChange !== ''){
      sort.map((item) => {
        if(item.item.detailId === clickChange.split(' ')[0]){
          const key = clickChange.split(' ')[1]
          return item.item[key] = Boolean(!item.item[key])
        }
      })
      console.log(sort)
    }
    if(sort.length > 0){
      sort.sort((a, b) => {
        if(orderBy === 'price') {
          if(order === 'asc') {
            return (a.data.price)-(b.data.price)
          }else {
            return (b.data.price)-(a.data.price)
          }
        }else if(orderBy === 'number') {
          if(order === 'asc') {
            return (a.item.number)-(b.item.number)
          }else {
            return (b.item.number)-(a.item.number)
          }
        }else if(orderBy === 'sum') {
          if(order === 'asc') {
            return (a.item.number * a.data.price)-(b.item.number * b.data.price)
          }else {
            return (b.item.number * b.data.price)-(a.item.number * a.data.price)
          }
        }else if(orderBy === 'title'){
          if(order === 'asc') {
            if(a.data.title > b.data.title){
              return -1
            }else if(b.data.title > a.data.title){
              return 1
            }else return 0
          }else {
            if(a.data.title < b.data.title){
              return -1
            }else if(b.data.title < a.data.title){
              return 1
            }else return 0
          }
        }else if(orderBy === 'user'){
          if(order === 'asc') {
            if(a.item.user > b.item.user){
              return -1
            }else if(b.item.user > a.item.user){
              return 1
            }else return 0
          }else {
            if(a.item.user < b.item.user){
              return -1
            }else if(b.item.user < a.item.user){
              return 1
            }else return 0
          }
        }else {
          if(order === 'asc') {
            return a.item?.[orderBy] - b.item?.[orderBy]
          }else return b.item?.[orderBy] - a.item?.[orderBy]
        }
      })
      return sort
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleRequestSort = (id) => {
    setOrder(orderBy === id && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(id);
  };
  
 const createSortHandler = (id) => {
  handleRequestSort(id);
 }

 const doneClick = async (detailId, done) => {
  const data = {done : !done}
  const response = await instance.put(`/api/products/transactions/${detailId}`, data)
  console.log(response)
  console.log(detailId)
  setClickChange(`${detailId} done ${done}`)
 }
 const canceledClick = async (detailId, cancel) => {
  const data = {isCanceled : !cancel}
  const response = await instance.put(`/api/products/transactions/${detailId}`, data)
  console.log(response)
  console.log(detailId)
  setClickChange(`${detailId} isCanceled ${cancel}`)
 }

  const rows = useMemo(() => {
    if(transactions.length > 0) {
      return stableSort(transactions).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }
  }, [page, rowsPerPage, order, orderBy, clickChange])

  useEffect(async () => {
    const response = await instance.get('/api/products/transactions/all')
    setTransactions(response.data)
    setRowsPerPage(25)
  }, [])

  return (
    <Box className='mt-14 w-4/5 m-auto'>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id}>
                    <TableSortLabel
                     onClick={() => createSortHandler(headCell.id)}
                     active={orderBy === headCell.id}
                     direction={order}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length > 0 && rows.map((item) => 
                  <TableRow key={item.item.detailId}>
                    <TableCell>{item.data?.title || ''}</TableCell>
                    <TableCell>{item.data?.price ? `${Number(item.data?.price).toLocaleString()}원` : ''}</TableCell>
                    <TableCell>{`${Number(item.item.number).toLocaleString()}개` || ''}</TableCell>
                    <TableCell>{`${Number(item.data?.price * item.item.number).toLocaleString()}원`}</TableCell>
                    <TableCell>{item.item.user || ''}</TableCell>
                    <TableCell>
                      <Button variant='outlined' onClick={() => doneClick(item.item.detailId, item.item.done)}>{item.item.done ? '전송 완료' : '미완료'}</Button>
                    </TableCell>
                    <TableCell>
                      <Button variant='outlined' onClick={() => canceledClick(item.item.detailId, item.item.isCanceled)}>{item.item.isCanceled ? '전송 취소' : '미취소'}</Button>
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 75]}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default withAdmin(TransactionsTable)