import { Helmet } from 'react-helmet-async';

import { ProductsDetail } from 'src/sections/products/detail';


// ----------------------------------------------------------------------

export default function ProductsDetailPage() {
  return (
    <>
      <Helmet>
        <title> Products Detail  </title>
      </Helmet>

      <ProductsDetail />
    </>
  );
}
