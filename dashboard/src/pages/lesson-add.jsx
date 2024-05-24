import { Helmet } from 'react-helmet-async';
import { ProductsAdd } from 'src/sections/products/add';
import { LessonsAdd } from '../sections/lessons/add';

// ----------------------------------------------------------------------

export default function LessonsAddPage() {
  return (
    <>
      <Helmet>
        <title> Lessons Add </title>
      </Helmet>

      <LessonsAdd />
    </>
  );
}
