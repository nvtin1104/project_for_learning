import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { handleToast } from '../../utils/toast';
import Iconify from '../../components/iconify';
import { getTopicById, resetUpdate, updateTopic } from '../../redux/slices/topicsSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const topicSchema = yup.object().shape({
  name: yup.string().required('Name is required').max(255, 'Name is too long'),
});
const subjectSchema = yup.object().shape({
  subjectName: yup
    .string()
    .required('subjectName is required')
    .min(3, 'subjectName must be 3 characters')
    .max(255, 'subjectName is too long'),
});

const EditTopicForm = ({ handleGetContent }) => {
  EditTopicForm.propTypes = {
    handleGetContent: PropTypes.func,
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  const [subject, setSubject] = React.useState([]);
  const status = useSelector((state) => state.topics.statusUpdate);
  const error = useSelector((state) => state.topics.error);
  useEffect(() => {
    if (status === 'success') {
      dispatch(resetUpdate());
      handleToast('success', 'Update successful');
    }
    if (status === 'failed') {
      handleToast('error', error.message);
    }
  }, [status, error]);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: topicSchema,
    onSubmit: (values) => {
      if (subject.length === 0) {
        handleToast('error', 'Please add subject');
      } else {
        values.subject = subject;
        dispatch(updateTopic({ id, data: values }));
      }
    },
  });
  useEffect(() => {
    if (id) {
      dispatch(getTopicById(id)).then((res) => {
        formik.setValues({
          name: res.payload.name,
        });
        setSubject(res.payload.subject);
      });
    }
  }, [id]);

  const handleDelete = (index) => {
    const newSubject = subject.filter((item, i) => i !== index);
    setSubject(newSubject);
  };
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
                Topic Info
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
            <Stack>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Objects
              </Typography>
              <List>
                {subject.length > 0 ? (
                  subject.map((item, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete(index)}
                        >
                          {/*<DeleteIcon />*/}
                          <Iconify icon="material-symbols:delete" />
                        </IconButton>
                      }
                    >
                      <ListItemText primary={item} />
                    </ListItem>
                  ))
                ) : (
                  <Typography>Object not found</Typography>
                )}
              </List>
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
                Subject Info
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

export default EditTopicForm;
