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

import { resetPassword, resetStatusPassword } from 'store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../ui-component/Loader';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthForgotPassword = ({ ...others }) => {
  const theme = useTheme();
  const [isSubmit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.statusReset);
  const error = useSelector((state) => state.auth.error);
  const data = useSelector((state) => state.auth.reset);
  const navigate = useNavigate();
  useEffect(() => {
    if (status === 'success') {
      setSubmit(false);
      handleToast('success', 'New password has been sent to your email.');
      navigate('/login', { state: { reset: true } });
      dispatch(resetStatusPassword());
    } else if (status === 'failed') {
      dispatch(resetStatusPassword());
      setSubmit(false);
      handleToast('error', error.error);
    }
  }, [status, error]);

  const handleSubmit = (values) => {
    setSubmit(true);
    dispatch(resetPassword(values));
  };
  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        {status === 'loading' && <Loader />}
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Formik
            initialValues={{
              username: ''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required('Username is required')
            })}
            onSubmit={handleSubmit}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit} {...others}>
                <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-login">Username</InputLabel>
                  <OutlinedInput
                    sx={{
                      width: '240px'
                    }}
                    id="outlined-adornment-email-login"
                    type="username"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Username"
                    inputProps={{}}
                  />
                  {touched.username && errors.username && (
                    <FormHelperText error id="standard-weight-helper-text-username-login">
                      {errors.username}
                    </FormHelperText>
                  )}
                </FormControl>

                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmit} fullWidth size="large" type="submit" variant="contained" color="secondary">
                      Send
                    </Button>
                  </AnimateButton>
                </Box>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthForgotPassword;
