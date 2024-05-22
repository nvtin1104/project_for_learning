import { Helmet } from 'react-helmet-async';

import { ProfileView } from 'src/sections/website/profile/view';


// ----------------------------------------------------------------------

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> Profile </title>
      </Helmet>

      <ProfileView />
    </>
  );
}
