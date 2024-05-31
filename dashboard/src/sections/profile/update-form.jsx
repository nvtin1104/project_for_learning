import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import BasicSelect from 'src/components/select/basic';

const profileSchema = yup.object().shape({
  name: yup.string().required('Name is required').max(50, 'Name is too long'),
  phone: yup
    .string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Phone number is not valid')
    .required('Phone is required'),
  address: yup.string().required('Address is required').max(255, 'Address is too long'),
  gender: yup.string().required('Gender is required').oneOf(['male', 'female', 'other']),
  birthday: yup.date().max(new Date(), 'Birthday is invalid'),
});

const UpdateForm = ({ handleGetContent, user }) => {
  UpdateForm.propTypes = {
    handleGetContent: PropTypes.func,
    user: PropTypes.object,
  };
  const formik = useFormik({
    initialValues: {
      name: user.name,
      phone: user.phone,
      address: user.address,
      gender: user.gender,
      birthday: new Date(user.birthday).toISOString().split('T')[0],
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      handleGetContent(values);
    },
  });
  return (
    <Card sx={{
      p: 3,
    }}>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
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
            name="phone"
            label="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0',
              }}
            >
              {formik.errors.phone}
            </p>
          )}

          <TextField
            name="address"
            label="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0',
              }}
            >
              {formik.errors.address}
            </p>
          )}
     <TextField
            name="birthday"
            type='date'
            label="Birthday"
            value={formik.values.birthday}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.birthday && formik.errors.birthday && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0',
              }}
            >
              {formik.errors.birthday}
            </p>
          )}
          <BasicSelect
            data={[
              {
                value: "male",
                label: "Male"
              },
              {
                value: "female",
                label: "Female"
              },
              {
                value: "other",
                label: "Other"
              },
            ]}
            name="gender"
            label="Gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onlBur={formik.handleBlur}
          />
          {formik.touched.gender && formik.errors.gender && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0',
              }}
            >
              {formik.errors.gender}
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
          Checkout
        </LoadingButton>
      </form>
    </Card>
  );
};

export default UpdateForm;
