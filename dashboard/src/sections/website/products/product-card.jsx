import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { handleToast } from 'src/utils/toast';
import { fCurrency } from 'src/utils/format-number';

import { UserContext } from 'src/context/user.context';
import { addToCart } from 'src/redux/slices/cartSlice';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
  const dispatch = useDispatch();
  const { login } = useContext(UserContext);
  const user = useSelector((state) => state.users.me);
  const handleAddToCart = (id) => {
    if (!login) {
      handleToast('error', 'Please login to add to cart');
      return;
    }
    const data = { userId:user._id, productId: id , quantity: 1};
    dispatch(addToCart(data));
  };
  const renderStatus = (
    <Label
      variant="filled"
      color={(product.status === 'sale' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.status}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.imgs[0]}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {/* {product.priceSale && fCurrency(product.priceSale)} */}
      </Typography>
      &nbsp;
      {fCurrency(product.price)}
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {product.status && renderStatus}

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={product.colors} /> */}
          {renderPrice}
          <Button onClick={() => handleAddToCart(product._id)}>Add to Cart</Button>
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
