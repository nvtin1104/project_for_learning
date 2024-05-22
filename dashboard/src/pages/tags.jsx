import { Helmet } from 'react-helmet-async';
import { ProductsView } from 'src/sections/products/view';
import { TagsView } from 'src/sections/tags/view';


// ----------------------------------------------------------------------

export default function TagsPage() {
  return (
    <>
      <Helmet>
        <title> Tags</title>
      </Helmet>

      <TagsView />
    </>
  );
}
