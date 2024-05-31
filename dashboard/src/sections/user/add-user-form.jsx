import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { handleToast } from '../../utils/toast';

const userSchema = yup.object().shape({
  name: yup.string().required('Name is required').max(30, 'Name is too long'),
  username: yup.string().required('Username is required').max(20, 'Username is too long'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password is too small')
    .max(100, 'Password is too large'),
  role: yup.string().required('Role is required'),
  type: yup.string().typeError('Type must be string').required('Type is required'),
});

const AddUserForm = ({ handleGetContent }) => {
  AddUserForm.propTypes = {
    handleGetContent: PropTypes.func,
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      role: '',
      type: '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      handleGetContent(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          User Info
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
          name="username"
          label="User Name"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username && (
          <p
            style={{
              color: 'red',
              fontSize: '12px',
              margin: '0',
            }}
          >
            {formik.errors.username}
          </p>
        )}
        <TextField
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <p
            style={{
              color: 'red',
              fontSize: '12px',
              margin: '0',
            }}
          >
            {formik.errors.password}
          </p>
        )}
        <FormControl fullWidth>
          <InputLabel id="select-type-label">Type</InputLabel>
          <Select
            labelId="select-type-label"
            id="select-type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Type"
          >
            <MenuItem value="teacher">Teacher</MenuItem>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="parent">Parent</MenuItem>
          </Select>
        </FormControl>
        {formik.touched.type && formik.errors.type && (
          <p
            style={{
              color: 'red',
              fontSize: '12px',
              margin: '0',
            }}
          >
            {formik.errors.type}
          </p>
        )}
        <FormControl fullWidth>
          <InputLabel id="select-role-label">Role</InputLabel>
          <Select
            labelId="select-role-label"
            id="select-role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Role"
          >
            <MenuItem value="admin">ADMIN</MenuItem>
            <MenuItem value="user">USER</MenuItem>
          </Select>
        </FormControl>
        {formik.touched.role && formik.errors.role && (
          <p
            style={{
              color: 'red',
              fontSize: '12px',
              margin: '0',
            }}
          >
            {formik.errors.role}
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
  );
};

export default AddUserForm;
