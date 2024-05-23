import { Helmet } from 'react-helmet-async';
import LessonsView from 'src/sections/lessons/view/lessons-view';
// ----------------------------------------------------------------------

export default function LessonsPage() {
  return (
    <>
      <Helmet>
        <title> Lessons </title>
      </Helmet>
      <LessonsView />
    </>
  );
}
