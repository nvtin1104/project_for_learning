import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import CartsList from './carts-list';

export default function WidgetCart({ openFilter, onOpenFilter, onCloseFilter , quantity, carts }) {
  return (
    <>
     <IconButton onClick={onOpenFilter}>
        <Badge badgeContent={quantity} color="error">
            <Iconify icon="ic:round-shopping-cart" width={24} height={24} />
        </Badge>
    </IconButton>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 1 }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            Carts
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3}>
           <CartsList carts={carts}/>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            endIcon={<Iconify icon="ic:twotone-chevron-right" />}
          >
            <Link style={{ textDecoration: 'none', color: 'inherit'}} to='/cart'>Go to Cart</Link>
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

WidgetCart.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  quantity: PropTypes.number,
  carts: PropTypes.array,
};
