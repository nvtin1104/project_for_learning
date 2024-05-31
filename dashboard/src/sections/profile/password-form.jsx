import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import BasicSelect from 'src/components/select/basic';

const passwordSchema = yup.object().shape({
  oldPassword: yup.string().required('Old password is required'),
  newPassword: yup.string().required('New password is required').min(6, 'Password is too short'),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

const PasswordForm = ({ handleGetPassword }) => {
  PasswordForm.propTypes = {
    handleGetPassword: PropTypes.func,
  };
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      handleGetPassword(values);
    },
  });
  return (
    <Card sx={{
      p: 3,
    }}>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            type="password"
            name="oldPassword"
            label="Old Password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0',
              }}
            >
              {formik.errors.oldPassword}
            </p>
          )}
       <TextField
            type="password"
            name="newPassword"
            label="New Password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0',
              }}
            >
              {formik.errors.newPassword}
            </p>
          )}
       <TextField
            type="password"
            name="confirmPassword"
            label="Old Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0',
              }}
            >
              {formik.errors.confirmPassword}
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

export default PasswordForm;
