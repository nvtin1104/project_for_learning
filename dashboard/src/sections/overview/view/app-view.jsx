import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import AppCurrentVisits from '../app-current-visits';

import AppWidgetSummary from '../app-widget-summary';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getDashboard } from 'src/redux/slices/ordersSlice';

// ----------------------------------------------------------------------

export default function AppView() {
  const dispatch = useDispatch();
  const [dashboard, setDashboard] = useState([]);
  useEffect(() => {
    dispatch(getDashboard()).then((res) => {
      setDashboard(res.payload);
    });
  }, [dispatch]);
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Order Created"
            total={dashboard.created}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Order Pending"
            total={dashboard.pending}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Order Completed"
            total={dashboard.completed}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Order Total"
            chart={{
              series: [
                { label: 'Total Completed', value: dashboard.totalSuccess },
                { label: 'Total Expected', value: dashboard.total },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
