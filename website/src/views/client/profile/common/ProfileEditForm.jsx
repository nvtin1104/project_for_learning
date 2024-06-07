import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { handleToast } from 'utils/toast';
// assets
import { useFormik } from 'formik';
import { login } from 'store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@mui/material';
import { resetStateUpdate, updateUser } from 'store/slices/usersSlice';

// ============================|| FIREBASE - LOGIN ||============================ //

const profileSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('Name must be string')
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(255, 'Name must be at most 255 characters'),
  email: yup.string().email('Enter a valid email').required('Email is required').max(255, 'Email must be at most 255 characters'),
  birthday: yup.date().typeError('Birthday must be a date').required('Birthday is required')
});

const ProfileEditForm = ({ ...others }) => {
  const theme = useTheme();
  const [isSubmit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const [gender, setGender] = useState('');
  const [type, setType] = useState('');
  const customization = useSelector((state) => state.customization);
  const error = useSelector((state) => state.user.error);
  const status = useSelector((state) => state.user.statusUpdate);
  useEffect(() => {
    if (status === 'success') {
      handleToast('success', 'Profile updated');
      dispatch(resetStateUpdate());
      setSubmit(false);
    } else if (status === 'failed') {
      handleToast('error', error.error);
      setSubmit(false);
    }
  }, [status, error]);
  const googleHandler = async () => {
    console.error('Login');
  };
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user) {
      setGender(user.gender);
      setType(user.type);
    }
  }, [user]);
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      birthday: user.birthday || '2000-01-01'
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      values.gender = gender;
      values.type = type;
      dispatch(updateUser(values));
      setSubmit(true);
    }
  });

  return (
    <>
      <form
        style={{
          width: '100%'
        }}
        onSubmit={formik.handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <ProfileCard />
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={1}>
              <Grid
                item
                md={4}
                sx={{
                  height: 'auto',
                  m: 0
                }}
              >
                <TextField fullWidth label="Username" value={formik.values.name} disabled />
              </Grid>
              <Grid
                item
                md={8}
                sx={{
                  height: 'auto',
                  m: 0
                }}
              >
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  label="Birthday"
                  type="date"
                  name="birthday"
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.birthday && Boolean(formik.errors.birthday)}
                  helperText={formik.touched.birthday && formik.errors.birthday}
                />
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-gender-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-gender-label"
                    id="demo-simple-gender"
                    label="Gender"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                  >
                    <MenuItem value={''}>None</MenuItem>
                    <MenuItem value={'men'}>Men</MenuItem>
                    <MenuItem value={'women'}>Women</MenuItem>
                    <MenuItem value={'other'}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-type-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-type-label"
                    id="demo-simple-type"
                    label="Age"
                    name={'type'}
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                  >
                    <MenuItem value={''}>None</MenuItem>
                    <MenuItem value={'student'}>Student</MenuItem>
                    <MenuItem value={'teacher'}>Teacher</MenuItem>
                    <MenuItem value={'parent'}>Parent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmit} size="large" type="submit" variant="contained" color="secondary">
                    Save
                  </Button>
                </AnimateButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ProfileEditForm;
