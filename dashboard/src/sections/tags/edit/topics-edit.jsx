import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';

import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';

import { createTopic, getTopicById, resetCreate } from 'src/redux/slices/topicsSlice';
import { handleToast } from 'src/utils/toast';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditTopicForm from '../edit-topic-form';

// ----------------------------------------------------------------------

export default function TopicEditView() {
  const dispatch = useDispatch();
  const [topic, setTopic] = useState({});
  const { id } = useParams();
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

      <EditTopicForm handleGetContent={handleGetContent} />
    </Container>
  );
}
