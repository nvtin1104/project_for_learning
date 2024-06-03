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
import Grid from '@mui/material/Grid';

const userSchema = yup.object().shape({
  name: yup.string().required('Name is required').max(30, 'Name is too long'),
  username: yup.string().required('Username is required').max(20, 'Username is too long'),
  gender: yup.string().required('Gender is required'),
  status: yup.string().required('Status is required'),
  birthday: yup.string(),
  email: yup.string().email('Invalid email'),
  role: yup.string().required('Role is required'),
  type: yup.string().typeError('Type must be string').required('Type is required'),
});

const EditUserForm = ({ handleGetContent, user }) => {
  EditUserForm.propTypes = {
    handleGetContent: PropTypes.func,
    user: PropTypes.any,
  };
  const formik = useFormik({
    initialValues: {
      name: user?.name,
      username: user?.username,
      role: user?.role,
      type: user?.type,
      gender: user?.gender,
      status: user?.status,
      birthday: user.birthday !== null ? user.birthday : '2004-01-01T17:00:00.000Z',
      email: user?.email,
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      const data = { ...values };
      delete data.username;
      delete data.role;
      handleGetContent(data);
    },
  });
  return (
    <Card
      sx={{
        p: 3,
        m: 3,
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="username"
              label="User Name"
              disabled
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="birthday"
              label="Birthday"
              type="date"
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
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-gender-label">Gender</InputLabel>
              <Select
                labelId="select-gender-label"
                id="select-gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Gender"
              >
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
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
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-role-label">Role</InputLabel>
              <Select
                disabled
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
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-status-label">Status</InputLabel>
              <Select
                labelId="select-status-label"
                id="select-status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            {formik.touched.status && formik.errors.status && (
              <p
                style={{
                  color: 'red',
                  fontSize: '12px',
                  margin: '0',
                }}
              >
                {formik.errors.status}
              </p>
            )}
          </Grid>
        </Grid>

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

export default EditUserForm;
