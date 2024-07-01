import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';

import { gridSpacing } from 'store/constant';

// assets
import { IconUsers } from '@tabler/icons-react';
import { handleGetDashboard } from '../../../store/slices/historySlice';
import { useDispatch, useSelector } from 'react-redux';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [newData, setNewData] = useState([]);
  const [data, setData] = useState([]);
  const status = useSelector((state) => state.history.statusDashboard);
  const dashboard = useSelector((state) => state.history.dashboard);
  useEffect(() => {
    if (status === 'success') {
      setData(dashboard);
      const groupedData = dashboard.reduce((acc, obj) => {
        const { name } = obj;
        if (!acc[name]) {
          acc[name] = [];
        }
        acc[name].push(obj);
        return acc;
      }, {});

      const duplicateObjects = Object.values(groupedData)
        .filter((arr) => arr.length > 1)
        .flat();

      console.log(groupedData);
    }

    // setNewData(groupedData);
  }, [status]);
  useEffect(() => {
    setLoading(false);
    dispatch(handleGetDashboard());
  }, [dispatch]);
  return (
    status === 'success' && (
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <EarningCard isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <TotalOrderLineChartCard isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <TotalIncomeDarkCard isLoading={isLoading} label="Quiz" value={data.length} />
                </Grid>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <TotalIncomeLightCard
                    {...{
                      isLoading: isLoading,
                      total: newData.length,
                      label: 'Study turn',
                      icon: <IconUsers fontSize="inherit" />
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={12}>
              <TotalGrowthBarChart isLoading={isLoading} />
            </Grid>
            {/*<Grid item xs={12} md={4}>*/}
            {/*  <PopularCard isLoading={isLoading} />*/}
            {/*</Grid>*/}
          </Grid>
        </Grid>
      </Grid>
    )
  );
};

export default Dashboard;
