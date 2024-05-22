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
import { login, loginWithGG } from 'src/redux/slices/authSlice';
import { UserContext } from 'src/context/user.context';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { Link, useLocation } from 'react-router-dom';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
// ----------------------------------------------------------------------
const loginSchema = yup.object().shape({
  email: yup.string().email('Email must be a valid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});
export default function LoginView() {
  const provider = new GoogleAuthProvider();

  const auth = getAuth();
  const handleLoginGG = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const dataLogin = {
          email: user.email,
          name: user.displayName,
          avatar: user.photoURL,
          accessToken: token,
        };
        dispatch(loginWithGG(dataLogin))
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        // ...
      });
  };

  const { setUser, setLogin } = useContext(UserContext);
  const theme = useTheme();

  const router = useRouter();

  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (error) {
      handleToast('error', error.message);
    }
  }, [error]);

  useEffect(() => {
    if (user && status === 'success') {
      handleToast('success', 'Login successful');
      localStorage.setItem('token', user.token);
      setUser(user);
      setLogin(true);
      router.push(location?.state?.from || '/');
    }
  }, [user, status, router, setUser, setLogin, location]);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(login(values));
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

        <TextField
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
      </Stack>
      <p
        style={{
          color: 'red',
          fontSize: '12px',
          margin: '0',
        }}
      >
        {formik.errors.password && formik.touched.password ? formik.errors.password : null}
      </p>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link to="/forgot-password" variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
        Login
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
          <Typography variant="h4">Sign in to Admin</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link to="/register" variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
              onClick={handleLoginGG}
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
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
