import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import PropTypes from 'prop-types';

const checkoutSchema = yup.object().shape({
  name: yup.string().required('Name is required').max(50, 'Name is too long'),
  phone: yup
    .string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Phone number is not valid')
    .required('Phone is required'),
  address: yup.string().required('Address is required').max(255, 'Address is too long'),
  note: yup.string().max(255, 'Note is too long'),
});

const CheckoutForm = ({ handleGetContent }) => {
  CheckoutForm.propTypes = {
    handleGetContent: PropTypes.func,
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      address: '',
      note: '',
    },
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      handleGetContent(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <p
          style={{
            color: 'red',
            fontSize: '12px',
            margin: '0',
          }}
        >
          {formik.errors.name && formik.touched.name ? formik.errors.name : null}
        </p>

        <TextField
          name="phone"
          label="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        <p
          style={{
            color: 'red',
            fontSize: '12px',
            margin: '0',
          }}
        >
          {formik.errors.phone && formik.touched.phone ? formik.errors.phone : null}
        </p>
        <TextField
          name="address"
          label="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
        />
        <p
          style={{
            color: 'red',
            fontSize: '12px',
            margin: '0',
          }}
        >
          {formik.errors.address && formik.touched.address ? formik.errors.address : null}
        </p>
        <TextField
          name="note"
          label="Note"
          value={formik.values.note}
          onChange={formik.handleChange}
        />
        <p
          style={{
            color: 'red',
            fontSize: '12px',
            margin: '0',
          }}
        >
          {formik.errors.note && formik.touched.note ? formik.errors.note : null}
        </p>
      </Stack>

      <LoadingButton
        sx={{ mt: 1 }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
      >
        Checkout
      </LoadingButton>
    </form>
  );
};

export default CheckoutForm;
