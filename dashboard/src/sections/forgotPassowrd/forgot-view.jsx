/* eslint-disable import/no-unresolved */
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { handleToast } from 'src/utils/toast';

import { bgGradient } from 'src/theme/css';
import {
  changePassword,
  getOTP,
  resetChangePassword,
  resetOTP,
} from 'src/redux/slices/authSlice';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { Link, useLocation } from 'react-router-dom';
// ----------------------------------------------------------------------
const sendMail = yup.object().shape({
  email: yup.string().email('Email must be a valid email address').required('Email is required'),
});
const changPassword = yup.object().shape({
  OTP: yup
    .string()
    .required('OTP is required')
    .min(6, 'OTP must be at least 6 characters')
    .max(6, 'OTP must be at most 6 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  comfirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password is required'),
});
export default function ForgotPassowrdView() {
  const theme = useTheme();

  const router = useRouter();

  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const otp = useSelector((state) => state.auth.otp);
  const statusOTP = useSelector((state) => state.auth.statusOTP);
  const statusChange = useSelector((state) => state.auth.statusChange);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      handleToast('error', error.message);
    }
  }, [error]);

  useEffect(() => {
    if (otp && statusOTP === 'success') {
      handleToast('success', 'Send OTP successful');
    }
  }, [otp, statusOTP]);
  useEffect(() => {
    if (statusChange === 'success') {
      handleToast('success', 'Change password successful');
      dispatch(resetChangePassword());
      dispatch(resetOTP());
      router.push('/login');
    }
  }, [statusChange, router, dispatch]);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: sendMail,
    onSubmit: (values) => {
      dispatch(getOTP(values));
    },
  });
  const formikPassword = useFormik({
    initialValues: {
      OTP: '',
      password: '',
      comfirmPassword: '',
    },
    validationSchema: changPassword,
    onSubmit: (values) => {
      console.log(values);
      if (values.OTP == otp.OTP) {
        const dataUpdate = {
          password: values.password,
          id: otp.userId,
        };
        dispatch(changePassword(dataUpdate));
      } else {
        handleToast('error', 'OTP is incorrect');
      }

      // dispatch(getOTP(values));
    },
  });
  const renderForm = (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <p
          style={{
            color: 'red',
            fontSize: '12px',
            margin: '0',
          }}
        >
          {formik.errors.email && formik.touched.email ? formik.errors.email : null}
        </p>

        {/* <TextField
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      <p style={{
          color: 'red',
          fontSize: '12px',
          margin: '0',
        }}>
          {formik.errors.password && formik.touched.password ? (formik.errors.password) : null}
        </p>
 */}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        sx={{ mt: 3 }}
      >
        Send
      </LoadingButton>
    </form>
  );
  const renderFormPassword = (
    <form onSubmit={formikPassword.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="OTP"
          label="OTP"
          value={formikPassword.values.OTP}
          onChange={(e) => {
            formikPassword.handleChange(e);
          }}
          type="text"
        />
        <p
          style={{
            color: 'red',
            fontSize: '12px',
            margin: '0',
          }}
        >
          {formikPassword.errors.OTP && formikPassword.touched.OTP
            ? formikPassword.errors.OTP
            : null}
        </p>
        <TextField
          name="password"
          label="Password"
          value={formikPassword.values.password}
          onChange={(e) => {
            formikPassword.handleChange(e);
          }}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <p
          style={{
            color: 'red',
            fontSize: '12px',
            margin: '0',
          }}
        >
          {formikPassword.errors.password && formikPassword.touched.password
            ? formikPassword.errors.password
            : null}
        </p>
        <TextField
          name="comfirmPassword"
          label="Comfirm Password"
          value={formikPassword.values.comfirmPassword}
          onChange={formikPassword.handleChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <p
          style={{
            color: 'red',
            fontSize: '12px',
            margin: '0',
          }}
        >
          {formikPassword.errors.comfirmPassword && formikPassword.touched.comfirmPassword
            ? formikPassword.errors.comfirmPassword
            : null}
        </p>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        sx={{ mt: 3 }}
      >
        Send
      </LoadingButton>
    </form>
  );
  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Forgot Password</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Have an account?
            <Link to="/login" variant="subtitle2" sx={{ ml: 0.5 }}>
              Login
            </Link>
          </Typography>

          {/* <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider> */}

          {statusOTP !== 'success' ? renderForm : renderFormPassword}
        </Card>
      </Stack>
    </Box>
  );
}
