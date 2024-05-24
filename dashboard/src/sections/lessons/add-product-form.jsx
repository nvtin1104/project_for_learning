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
  title: yup.string().required('Name is required').max(255, 'Name is too long'),
  description: yup.string().required('Description is required').max(255, 'Description is too long'),
  limit: yup
    .number()
    .required('Limit is required')
    .min(0, 'Limit is too small')
    .max(1000, 'Limit is too large'),
  auth: yup
    .string()
    .required('Author is required')
    .max(255, 'Author is too long')
    .min(5, 'Author is too short'),
});

const AddProductForm = ({ handleGetContent }) => {
  AddProductForm.propTypes = {
    handleGetContent: PropTypes.func,
  };
  const formik = useFormik({
    initialValues: {
      title: '',
      auth: '',
      description: '',
      type: ['TEST'],
      limit: '',
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
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0',
              }}
            >
              {formik.errors.title}
            </p>
          )}
          <TextField
            name="auth"
            label="Auth"
            value={formik.values.auth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.auth && formik.errors.auth && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0',
              }}
            >
              {formik.errors.auth}
            </p>
          )}
          <TextField
            name="limit"
            label="Limit"
            value={formik.values.limit}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.limit && formik.errors.limit && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0',
              }}
            >
              {formik.errors.limit}
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
