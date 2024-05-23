import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import { handleToast } from '../../utils/toast';

const topicSchema = yup.object().shape({
  name: yup.string().required('Name is required').max(255, 'Name is too long'),
  subject: yup.array().required('Category is required').max(60, 'Category is too long'),
});
const subjectSchema = yup.object().shape({
  subjectName: yup.string().required('subjectName is required').max(255, 'subjectName is too long'),
});
const AddTopicForm = ({ handleGetContent }) => {
  const [subject, setSubject] = React.useState([]);
  AddTopicForm.propTypes = {
    handleGetContent: PropTypes.func,
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      subject: '',
    },
    validationSchema: topicSchema,
    onSubmit: (values) => {
      handleGetContent(values);
    },
  });
  const subjectFormik = useFormik({
    initialValues: {
      subjectName: '',
    },
    validationSchema: subjectSchema,
    onSubmit: (values) => {
      console.log(subject);
      if (subject.includes(values.subjectName)) {
        handleToast('error', 'This subject already exists');
      } else {
        setSubject([...subject, values.subjectName]);
      }
    },
  });
  return (
    <Grid
      container
      spacing={3}
      sx={{
        p: 3,
      }}
    >
      <Grid item xs={12} lg={7}>
        <Card sx={{ p: 3 }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <Typography variant="h4" sx={{ mb: 5 }}>
                Topic Infor
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
      </Grid>
      <Grid item xs={12} lg={5}>
        <Card sx={{ p: 3 }}>
          <form onSubmit={subjectFormik.handleSubmit}>
            <Stack spacing={3}>
              <Typography variant="h4" sx={{ mb: 5 }}>
                Subject Infor
              </Typography>
              <TextField
                name="subjectName"
                label="Subject"
                value={subjectFormik.values.subjectName}
                onChange={subjectFormik.handleChange}
                onBlur={subjectFormik.handleBlur}
              />
              {subjectFormik.touched.subjectName && subjectFormik.errors.subjectName && (
                <p
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    margin: '0',
                  }}
                >
                  {subjectFormik.errors.subjectName}
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
      </Grid>
    </Grid>
  );
};

export default AddTopicForm;
