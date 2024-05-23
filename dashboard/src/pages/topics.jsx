import { Helmet } from 'react-helmet-async';
import TopicsView from '../sections/tags/view/topics-view';

// ----------------------------------------------------------------------

export default function TopicPage() {
  return (
    <>
      <Helmet>
        <title> Topic</title>
      </Helmet>

      <TopicsView />
    </>
  );
}
