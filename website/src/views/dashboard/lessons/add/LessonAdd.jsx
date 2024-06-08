import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import AddProductForm from '../add-product-form';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import AddQuestion from '../add-question';
import { handleToast } from 'utils/toast';
import { useDispatch, useSelector } from 'react-redux';
import { IconChevronDown } from '@tabler/icons-react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import { handleGetAllTopics, resetCreateLesson, handleCreateLesson } from 'store/slices/lessonsSlice';
// ----------------------------------------------------------------------

export default function LessonAdd() {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState([]);

  const [topic, setTopic] = useState([]);
  const statusCreate = useSelector((state) => state.lessons.statusCreate);

  useEffect(() => {
    dispatch(handleGetAllTopics()).then((res) => {
      if (res.payload) {
        setTopic(res.payload);
      }
    });
  }, [dispatch]);
  useEffect(() => {
    if (statusCreate === 'success') {
      handleToast('success', 'Create successful');
      dispatch(resetCreateLesson());
      setQuestion([]);
    } else if (statusCreate === 'failed') {
      handleToast('error', 'Create failed');
      // dispatch(resetCreateLesson());
    }
  }, [statusCreate]);
  const handleGetContent = (content) => {
    if (question.length > 0) {
      content.questions = question;
      dispatch(handleCreateLesson({ data: content }));
    } else {
      handleToast('error', 'Please add question');
    }
  };
  const handleDeleteQuestion = (i) => {
    const newQuestion = question.filter((item, index) => i !== index);
    setQuestion(newQuestion);
  };

  const handleAddQuestion = (values) => {
    const newQuestion = [...question, values];
    setQuestion(newQuestion);
  };
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} md={12} lg={7}>
          <Stack spacing={2}>
            <AddProductForm handleGetContent={handleGetContent} topic={topic} status={statusCreate} />
            <Card
              sx={{
                p: 3
              }}
            >
              {question.length > 0 ? (
                question.map((item, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<IconChevronDown stroke={2} />}
                      aria-controls={`panel1a-content-${index}`}
                      id={`panel1a-header-${index}`}
                    >
                      <Typography>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack
                        spacing={2}
                        sx={{
                          pl: 3
                        }}
                      >
                        {item.options.map((option, index) => (
                          <Typography key={index} fontSize={12}>
                            {option.option} {option.isCorrect && ' (Correct)'}
                          </Typography>
                        ))}
                      </Stack>
                    </AccordionDetails>
                    <AccordionActions>
                      <Button size="small" onClick={() => handleDeleteQuestion(index)}>
                        Delete
                      </Button>
                    </AccordionActions>
                  </Accordion>
                ))
              ) : (
                <Typography>No question</Typography>
              )}
            </Card>
          </Stack>
        </Grid>
        <Grid xs={12} md={12} lg={5}>
          <AddQuestion handleAddQuestion={handleAddQuestion} />
        </Grid>
      </Grid>
    </Container>
  );
}
