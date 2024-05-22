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
});

const AddTagsForm = ({ handleGetContent }) => {
  AddTagsForm.propTypes = {
    handleGetContent: PropTypes.func,
  };
  const formik = useFormik({
    initialValues: {
      name: '',
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
            Tags Infor
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

export default AddTagsForm;
