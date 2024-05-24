import { Helmet } from 'react-helmet-async';
import { TopicEditView } from '../sections/tags/edit';
// ----------------------------------------------------------------------

export default function TopicEditPage() {
  return (
    <>
      <Helmet>
        <title> Topic</title>
      </Helmet>

      <TopicEditView />
    </>
  );
}
