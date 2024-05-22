import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

function Row({ row }) {
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState('default');
  React.useMemo(() => {
    switch (row.status) {
      case 'created':
        setColor('primary');
        break;
      case 'completed':
        setColor('success');
        break;
      case 'pending':
        setColor('info');
        break;
      case 'cancelled':
        setColor('error');
        break;
      case 'paymented':
        setColor('warning');
        break;
      default:
        setColor('default');
        break;
    }
  }, [row.status]);
  const createdDate = new Date(row.createdAt).toLocaleString();

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? (
              <Iconify icon="ic:outline-keyboard-arrow-up" />
            ) : (
              <Iconify icon="ic:outline-keyboard-arrow-down" />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{createdDate}</TableCell>
        <TableCell align="left">
          <Label color={color}>{row.status}</Label>
        </TableCell>
        <TableCell align="left">{row.total}</TableCell>
        <TableCell align="left">{}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quatity</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product) => (
                    <TableRow key={product.date}>
                      <TableCell component="th" scope="row">
                        {product.productName}
                      </TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell align="left">{product.price}</TableCell>
                      <TableCell align="left">
                        {Math.round(product.quantity * product.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    products: PropTypes.arrayOf({
        productName: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default function ProfileOrder({ orders }) {
  ProfileOrder.propTypes = {
    orders: PropTypes.array,
  };
  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" sx={{ m: 2 }}>
        Order
      </Typography>

      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="left">Created At</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Total</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <Row key={row._id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
