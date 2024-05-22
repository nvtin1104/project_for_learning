import { Helmet } from 'react-helmet-async';

import { IndexView } from 'src/sections/website/index/view';

// ----------------------------------------------------------------------

export default function WebsitePage() {
  return (
    <>
      <Helmet>
        <title> Shop </title>
      </Helmet>
      <IndexView />
    </>
  );
}
