import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';

import { handleToast } from 'src/utils/toast';

import {
  createProduct,
  fetchAllProducts,
  getProduct,
  resetCreateProduct,
  resetUpdate,
  updateProduct,
} from 'src/redux/slices/productsSlice';

import AddProductForm from '../add-product-form';
import UpdateProductForm from '../update-product-form';
import { useRouter } from 'src/routes/hooks';
// ----------------------------------------------------------------------

export default function ProductsDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const handleGetContent = (content) => {
    if (imgs.length === 0) {
      handleToast('error', 'Please add image');
      return;
    }
    content.imgs = imgs;
    dispatch(updateProduct({ id: product._id, data: content }));
  };
  const route = useRouter();
  const statusGet = useSelector((state) => state.products.statusGetOne);
  const dataGet = useSelector((state) => state.products.product);
  const status = useSelector((state) => state.products.statusUpdate);
  const error = useSelector((state) => state.products.error);
  useEffect(() => {
    if (status === 'success') {
      handleToast('success', 'Update product successful');
      dispatch(resetUpdate());
      dispatch(fetchAllProducts());
      route.push('/admin/products');
    }
    if (error) {
      handleToast('error', error.message);
    }
  }, [status, error, dispatch, route]);
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (statusGet === 'success') {
      setProduct(dataGet);
      setImgs(dataGet.imgs);
    }
  }, [statusGet, dataGet]);
  const [imgs, setImgs] = useState([]);
  const handleAddImg = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    setImgs([...imgs, value.img]);
  };
  const handleDeleteImg = (index) => {
    const newImgs = imgs.filter((img, i) => i !== index);
    setImgs(newImgs);
  };
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} md={12} lg={7}>
          {statusGet === 'success' && product && (
            <UpdateProductForm handleGetContent={handleGetContent} product={product} />
          )}
        </Grid>
        <Grid xs={12} md={12} lg={5}>
          <Card sx={{ p: 3 }}>
            <form onSubmit={handleAddImg}>
              <Stack spacing={3}>
                <Typography variant="h4">Add Image</Typography>
                <TextField label="Name" name="img" fullWidth />
              </Stack>

              <LoadingButton
                sx={{ mt: 1 }}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
              >
                Save
              </LoadingButton>
            </form>
            <Stack spacing={2} sx={{ mt: 1 }} direction="row" useFlexGap flexWrap="wrap">
              {imgs.map((img, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <img src={img} alt="img" style={{ width: '80px', height: '80px' }} />
                  <IconButton
                    aria-label="delete"
                    color="black"
                    width="10px"
                    height="10px"
                    onClick={() => handleDeleteImg(index)}
                    sx={{
                      zIndex: 1000,
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      cursor: 'pointer',
                    }}
                  >
                    <Icon icon="bi:x-lg" />
                  </IconButton>
                </div>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
