import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import AddProductForm from '../add-product-form';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@iconify/react';
import { handleToast } from 'src/utils/toast';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, resetCreateProduct } from 'src/redux/slices/productsSlice';
// ----------------------------------------------------------------------

export default function ProductsAdd() {
  const dispatch = useDispatch();
  const handleGetContent = (content) => {
    if (imgs.length === 0) {
      handleToast('error', 'Please add image');
      return;
    }
    content.imgs = imgs;
    dispatch(createProduct(content));
  };
  const status = useSelector((state) => state.products.statusCreate);
  const error = useSelector((state) => state.products.error);
  useEffect(() => {
    if (status === 'success') {
      handleToast('success', 'Create product successful');
    }
    if (error) {
      handleToast('error', error.message);
    }
    dispatch(resetCreateProduct());
  }, [status, error, dispatch]);
  const [imgs, setImgs] = useState(['https://source.unsplash.com/1600x900/?product']);
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
          <AddProductForm handleGetContent={handleGetContent} />
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
