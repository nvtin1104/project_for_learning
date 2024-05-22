import { Helmet } from 'react-helmet-async';

import { CartView } from 'src/sections/website/cart/view';


// ----------------------------------------------------------------------

export default function CartPage() {
  return (
    <>
      <Helmet>
        <title> Cart </title>
      </Helmet>

      <CartView />
    </>
  );
}
