import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export default function ProductList({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news) => (
            <NewsItem key={news._id} news={news} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

ProductList.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

// ----------------------------------------------------------------------

function NewsItem({ news }) {
  const { img, name, quantity, createdAt } = news;
  const date = new Date(createdAt);
  console.log(date)
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={name}
        src={img}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {name}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
         Quantity: {quantity}
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
      Date: {date.toLocaleDateString()}
      </Typography>
    </Stack>
  );
}

NewsItem.propTypes = {
  news: PropTypes.shape({
    name: PropTypes.string,
    img: PropTypes.string,
    quantity: PropTypes.number,
    createdAt: PropTypes.number,
  }),
};
