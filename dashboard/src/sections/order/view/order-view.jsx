import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { handleToast } from 'src/utils/toast';

import {
  getAllOrdersForAdmin,
  resetStateUpdateAction,
} from 'src/redux/slices/ordersSlice';
import {
} from 'src/redux/slices/usersSlice';

import ProfileOrder from '../profile-order';
// ----------------------------------------------------------------------

export default function OrderView() {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.me);
  const statusUser = useSelector((state) => state.users.statusMe);
  const status = useSelector((state) => state.orders.statusList);
  const data = useSelector((state) => state.orders.list);
  const statusUpdate = useSelector((state) => state.orders.statusUpdate);
  useEffect(() => {
    if (status === 'success' || data) {
      setOrders(data);
    }
  }, [data, status, dispatch]);
  useEffect(() => {
    if (statusUpdate === 'success') {
      handleToast('success', 'Update order success');
      dispatch(resetStateUpdateAction());
      dispatch(getAllOrdersForAdmin());
    }
  }, [statusUpdate, dispatch]);
  useEffect(() => {
    if (statusUser === 'success' && user) {
      dispatch(getAllOrdersForAdmin());
    }
  }, [dispatch, user, statusUser]);
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} md={12} lg={12}>
          {status === 'success' && <ProfileOrder orders={orders} />}
        </Grid>
      </Grid>
    </Container>
  );
}
