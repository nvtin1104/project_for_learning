import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

const productSchema = yup.object().shape({
  name: yup.string().required('Name is required').max(255, 'Name is too long'),
  description: yup.string().required('Description is required').max(255, 'Description is too long'),
  price: yup
    .number()
    .required('Price is required')
    .min(0, 'Price must be greater than 0')
    .max(1000000, 'Price is too high'),
});

const AddProductForm = ({ handleGetContent }) => {
  AddProductForm.propTypes = {
    handleGetContent: PropTypes.func,
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      tags: ['sale'],
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      handleGetContent(values);
    },
  });
  return (
    <Card
      sx={{
        p: 3,
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Product Infor
          </Typography>
          <TextField
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0',
              }}
            >
              {formik.errors.name}
            </p>
          )}
          <TextField
            name="price"
            label="Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && formik.errors.price && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0',
              }}
            >
              {formik.errors.price}
            </p>
          )}
          <TextField
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0',
              }}
            >
              {formik.errors.description}
            </p>
          )}
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
    </Card>
  );
};

export default AddProductForm;
