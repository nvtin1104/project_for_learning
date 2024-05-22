import { Helmet } from 'react-helmet-async';
import { ProductsAdd } from 'src/sections/products/add';


// ----------------------------------------------------------------------

export default function ProductsAddPage() {
  return (
    <>
      <Helmet>
        <title> Products  </title>
      </Helmet>

      <ProductsAdd />
    </>
  );
}
