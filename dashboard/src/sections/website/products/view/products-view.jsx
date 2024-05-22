import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fetchAllProducts } from 'src/redux/slices/productsSlice';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function WebsiteProductsView() {
  const [openFilter, setOpenFilter] = useState(false);

  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  useEffect(() => { 
    if (status === 'success') {
      setProducts(data);
    }
  }, [data, status]);
  useEffect(() => {
   dispatch(fetchAllProducts());
  }, [dispatch]);
  const handleSort = (sortBy) => {
    console.log(sortBy);
    switch (sortBy) {
      // case 'featured':
      //   setProducts((prevProducts) =>
      //   [...prevProducts].filter((product) => product.isFeatured)
      //   );
      //   break;
      case 'newest':
        setProducts((prevProducts) =>
        [...prevProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
        break;
      case 'priceDesc':
        setProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => b.price - a.price)
        );
        break;
      case 'priceAsc':
        setProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => a.price - b.price)
        );
        break;
      default:
        break;
    }
    // setProducts((prevProducts) => sortBy(prevProducts, [sortBy]));
  };
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort handleSort={handleSort}/>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product._id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <ProductCartWidget />
    </Container>
  );
}
