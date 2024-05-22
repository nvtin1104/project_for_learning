import { Helmet } from 'react-helmet-async';
import { ForgotPassowrdView } from 'src/sections/forgotPassowrd';


// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Forgot Password </title>
      </Helmet>

      <ForgotPassowrdView />
    </>
  );
}
