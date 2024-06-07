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
import { resetStateUpdate, updatePassword } from 'store/slices/usersSlice';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ============================|| FIREBASE - LOGIN ||============================ //

const passwordSchema = yup.object().shape({
  oldPassword: yup.string().required('Old password is required'),
  newPassword: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(255, 'Password is too long')
    // .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must contain at least one letter and one number.')
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required')
});
const PasswordEditForm = ({ ...others }) => {
  const [isSubmit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const status = useSelector((state) => state.user.statusPassword);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (status === 'success') {
      handleToast('success', 'Password updated successfully');
      dispatch(resetStateUpdate());
      setSubmit(false);
    } else if (status === 'failed') {
      handleToast('error', error.error);
      setSubmit(false);
    }
  }, [status, error]);
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: ''
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      const data = { ...values };
      delete data.confirmPassword;
      console.log(data);
      dispatch(updatePassword(data));
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
        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
          <FormControl
            sx={{ m: 1, width: '25ch' }}
            error={Boolean(formik.touched.oldPassword && formik.errors.oldPassword)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={'oldPassword'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {formik.touched.oldPassword && formik.errors.oldPassword && (
              <FormHelperText error id="standard-weight-helper-text-oldPassword-login">
                {formik.errors.oldPassword}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            sx={{ m: 1, width: '25ch' }}
            error={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={'newPassword'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <FormHelperText error id="standard-weight-helper-text-newPassword-login">
                {formik.errors.newPassword}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            sx={{ m: 1, width: '25ch' }}
            error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={'confirmPassword'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <FormHelperText error id="standard-weight-helper-text-confirmPassword-login">
                {formik.errors.confirmPassword}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
        <Box sx={{ mt: 2 }}>
          <AnimateButton>
            <Button disableElevation disabled={isSubmit} size="large" type="submit" variant="contained" color="secondary">
              Save
            </Button>
          </AnimateButton>
        </Box>
      </form>
    </>
  );
};

export default PasswordEditForm;
