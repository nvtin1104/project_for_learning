import { Helmet } from 'react-helmet-async';

import { WebsiteProductsView } from 'src/sections/website/products/view';

// ----------------------------------------------------------------------

export default function WebsiteProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products </title>
      </Helmet>

      <WebsiteProductsView />
    </>
  );
}
