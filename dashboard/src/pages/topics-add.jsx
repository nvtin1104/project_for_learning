import { Helmet } from 'react-helmet-async';
import TopicsAddView from '../sections/tags/add/topics-add';

// ----------------------------------------------------------------------

export default function TopicAddPage() {
  return (
    <>
      <Helmet>
        <title> Topic</title>
      </Helmet>

      <TopicsAddView />
    </>
  );
}
