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
import { handleToast } from 'utils/toast';

const productSchema = yup.object().shape({
  title: yup.string().required('Name is required').max(255, 'Name is too long'),
  description: yup.string().required('Description is required').max(255, 'Description is too long'),
  limit: yup
    .number()
    .typeError('Limit must be number')
    .required('Limit is required')
    .min(0, 'Limit is too small')
    .max(1000, 'Limit is too large'),
  auth: yup.string().required('Author is required').max(255, 'Author is too long').min(5, 'Author is too short'),
  type: yup.string().typeError('Type must be string').required('Type is required')
});

const AddProductForm = ({ handleGetContent, topic, status }) => {
  AddProductForm.propTypes = {
    handleGetContent: PropTypes.func,
    topic: PropTypes.array
  };
  const formik = useFormik({
    initialValues: {
      title: '',
      auth: '',
      description: '',
      type: 'test',
      limit: ''
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      if (selectedTopic === '' || selectedSubject === '') {
        handleToast('error', 'Please select topic and subject');
      } else {
        values.category = {
          topicId: selectedTopic,
          subject: selectedSubject
        };
        handleGetContent(values);
      }
    }
  });
  useEffect(() => {
    if (status === 'success') {
      formik.resetForm();
    }
  }, [status]);
  const [selectedTopic, setSelectedTopic] = React.useState('');
  const [subject, setSubject] = React.useState([]);
  const [selectedSubject, setSelectedSubject] = React.useState('');
  useEffect(() => {
    if (selectedTopic) {
      const newTopic = topic.find((item) => item._id === selectedTopic);
      setSubject(newTopic.subject);
    }
  }, [selectedTopic]);

  const handleChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  return (
    <Card
      sx={{
        p: 3
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Lesson Info
          </Typography>
          <TextField name="title" label="Title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.title && formik.errors.title && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0'
              }}
            >
              {formik.errors.title}
            </p>
          )}
          <TextField name="auth" label="Auth" value={formik.values.auth} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.auth && formik.errors.auth && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0'
              }}
            >
              {formik.errors.auth}
            </p>
          )}
          <TextField name="limit" label="Limit" value={formik.values.limit} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.limit && formik.errors.limit && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0'
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
                margin: '0'
              }}
            >
              {formik.errors.description}
            </p>
          )}
          <FormControl fullWidth>
            <InputLabel id="select-type-label">Type</InputLabel>
            <Select
              labelId="select-type-label"
              id="select-type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Type"
              // onChange={handleChange}
            >
              <MenuItem value="test">TEST</MenuItem>
              <MenuItem value="lesson">LESSON</MenuItem>
              <MenuItem value="memo">MEMO</MenuItem>
            </Select>
          </FormControl>
          {formik.touched.type && formik.errors.type && (
            <p
              style={{
                color: 'red',
                fontSize: '12px',
                margin: '0'
              }}
            >
              {formik.errors.type}
            </p>
          )}
          {topic.length > 0 && (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Topic</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedTopic}
                label="Topic"
                onChange={handleChange}
              >
                {topic.map((item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {subject.length > 0 && (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-subject-label">Subject</InputLabel>
              <Select
                labelId="demo-simple-subject-label"
                id="demo-simple-subject"
                value={selectedSubject}
                label="Subject"
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subject.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Stack>

        <LoadingButton sx={{ mt: 1 }} fullWidth size="large" type="submit" variant="contained" color="secondary">
          Save
        </LoadingButton>
      </form>
    </Card>
  );
};

export default AddProductForm;
