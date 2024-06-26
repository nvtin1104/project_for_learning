import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';

import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';

import { createTopic, resetCreate } from 'src/redux/slices/topicsSlice';
import { handleToast } from 'src/utils/toast';
import AddTopicForm from '../add-topic-form';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function TopicsAddView() {
  const dispatch = useDispatch();

  const handleGetContent = (content) => {
    dispatch(createTopic(content));
  };
  const statusCreate = useSelector((state) => state.topics.statusCreate);
  const error = useSelector((state) => state.topics.error);
  useEffect(() => {
    if (statusCreate === 'success') {
      handleToast('success', 'Create successful');
    }
  }, [statusCreate, dispatch]);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Topics</Typography>
      </Stack>
      <AddTopicForm handleGetContent={handleGetContent} />
    </Container>
  );
}
