import { Helmet } from 'react-helmet-async';
import { UserEditView } from 'src/sections/user/edit';

// ----------------------------------------------------------------------

export default function UserEditPage() {
  return (
    <>
      <Helmet>
        <title> User Detail</title>
      </Helmet>

      <UserEditView />
    </>
  );
}
