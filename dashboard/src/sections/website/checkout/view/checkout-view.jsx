import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { handleToast } from 'src/utils/toast';

import ProductList from '../checkout-list';
import CheckoutForm from '../checkout-form';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from 'src/redux/slices/ordersSlice';

// ----------------------------------------------------------------------

export default function CheckoutView() {
  const location = useLocation();
  const { carts = [] } = location?.state || {};
  const { cartIds = [] } = location?.state || {};
  const [ids, setIds] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const status = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);
  useEffect(() => {
    if (status === 'success') {
      handleToast('success', 'Order created');
      router.push('/');
    }
    if (status === 'failed') {
      handleToast('error', error.message);
      router.push('/cart');
    }
  }, [status, error, router]);
  useEffect(() => {
    if (carts.length === 0) {
      handleToast('error', 'Cart is empty');
      router.push('/cart');
      
    }
    else {
      setIds(cartIds);
    }
  }, [router, carts, cartIds]);
  const handleGetContent = (content) => {
    const data = {
      ...content,
      cartIds: ids,
    };
    console.log(data);
    dispatch(createOrder(data))
  };
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Checkout 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} md={6} lg={6}>
          <CheckoutForm handleGetContent={handleGetContent} />
        </Grid>
        <Grid xs={12} md={6} lg={6}>
          <ProductList title="Products" list={carts} />
        </Grid>
      </Grid>
    </Container>
  );
}
