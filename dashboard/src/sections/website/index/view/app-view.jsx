import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppNewsUpdate from '../app-news-update';

import SlideHome from '../app-slide';

// ----------------------------------------------------------------------

export default function IndexView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
      <Grid xs={12} md={6} lg={12}>
         <SlideHome view={1}/>
        </Grid>
        <Grid xs={12} md={6} lg={12}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>
        <Grid xs={12} md={6} lg={12}>
         <SlideHome view={3}/>
        </Grid>
      </Grid>
    </Container>
  );
}
