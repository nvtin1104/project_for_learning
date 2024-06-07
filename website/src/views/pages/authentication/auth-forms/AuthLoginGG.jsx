import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { handleToast } from 'utils/toast';
// assets

import Google from 'assets/images/icons/social-google.svg';
import { loginWithGG } from 'store/slices/authSlice';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseApp } from 'config/firebase';
import Loader from 'ui-component/Loader';

const AuthLoginGG = ({ matchDownSM, theme, handleDispatch, navigate }) => {
  const [isSubmit, setSubmit] = useState(false);
  const customization = useSelector((state) => state.customization);
  const status = useSelector((state) => state.auth.statusGG);
  const error = useSelector((state) => state.auth.error);
  const data = useSelector((state) => state.auth.user);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const googleHandler = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        const data = {
          name: user.displayName,
          avatar: user.photoURL,
          email: user.email
        };
        setSubmit(true);
        handleDispatch(loginWithGG(data));
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  useEffect(() => {
    if (status === 'success') {
      handleToast('success', 'Login success full');
      localStorage.setItem('token', data.accssesToken);
      navigate('/', { state: { login: true } });
    } else if (status === 'failed') {
      handleToast('error', error.error);
      setSubmit(false);
    }
  }, [status, error]);
  return (
    <>
      {status === 'loading' && <Loader />}
      <AnimateButton>
        <Button
          disableElevation
          disabled={isSubmit}
          fullWidth
          onClick={googleHandler}
          size="large"
          variant="outlined"
          sx={{
            color: 'grey.700',
            backgroundColor: theme.palette.grey[50],
            borderColor: theme.palette.grey[100]
          }}
        >
          <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
            <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
          </Box>
          Sign in with Google
        </Button>
      </AnimateButton>
    </>
  );
};

export default AuthLoginGG;
