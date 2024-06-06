import Container from '@mui/material/Container';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BreadcrumbLesson from 'src/ui-component/breadcrumb/BreadcrumbLesson';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import RatingLesson from 'src/ui-component/rating/RationLesson';
import ChipCategory from 'src/ui-component/chip/ChipCategory';
import ChipIcon from 'src/ui-component/chip/ChipIcon';
import { IconNotebook, IconCards } from '@tabler/icons-react';

import RadioQuestion from 'src/ui-component/radio/RadioQuestion';
import CardResult from 'src/ui-component/cards/CardResult';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetLessonsById } from 'src/store/slices/lessonsSlice';
import { SET_MENU } from '../../../../store/actions';

export default function DetailView() {
  const [data, setData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const { state } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const lesson = useSelector((state) => state.lessons.lesson);
  const status = useSelector((state) => state.lessons.status);
  useEffect(() => {
    dispatch({ type: SET_MENU, opened: false });
    if (state) {
      setData(state.data);
      setQuestions(state.data.questions);
    } else {
      dispatch(handleGetLessonsById({ id }));
    }
  }, [state, id, dispatch]);
  const handleAnswer = (value) => {
    setAnswer((prevAnswer) => {
      // Check if the item with the same index already exists
      const existingItemIndex = prevAnswer.findIndex((item) => item.index === value.index);

      if (existingItemIndex !== -1) {
        const updatedAnswer = [...prevAnswer];
        updatedAnswer[existingItemIndex] = value;
        return updatedAnswer;
      } else {
        return [...prevAnswer, value];
      }
    });
  };
  useEffect(() => {
    if (lesson !== null && status === 'success') {
      setData(lesson);
      setQuestions(lesson.questions);
    }
  }, [lesson, status]);
  const handleCheckAnswer = () => {
    questions.forEach((element, index) => {
      if (answer.find((item) => item.index === index)) {
        element = answer.find((item) => item.index === index);
      }
    });
    setQuestions(questions);
    setCheckAnswer(true);
    // Log the data
  };
  const handleResetTest = () => {
    setCheckAnswer(false);
    setQuestions(data.questions);
    setAnswer([]);
  };
  return (
    <Container>
      {data !== null && (
        <>
          <BreadcrumbLesson label={data.title} />
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: '32px',
              fontWeight: 600,
              margin: '16px 0'
            }}
          >
            {data.title}
          </Typography>
          <RatingLesson />
          <Typography
            variant="p"
            component="p"
            sx={{
              fontSize: '16px',
              margin: '16px 0'
            }}
          >
            {data.description}
          </Typography>
          <Stack direction="row" spacing={1}>
            <ChipCategory label={data.category.subject} />
            <ChipCategory label={`${data.questions.length} question`} />
            <ChipIcon label={data.auth} />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              margin: '16px 0'
            }}
          >
            <Button variant="contained" color="secondary" startIcon={<IconCards />} size="large">
              Recording Card
            </Button>
            <Button variant="contained" color="secondary" startIcon={<IconNotebook />} size="large">
              Test
            </Button>
          </Stack>
        </>
      )}
      <Divider />
      <Box>
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontSize: '18px',
            fontWeight: 600,
            margin: '16px 0'
          }}
        >
          Question in lesson ({questions.length} questions)
        </Typography>
        {data !== null && data.type === 'test' ? (
          <Typography>This lesson cannot be learned in advance</Typography>
        ) : (
          <>
            {checkAnswer === false
              ? questions.map((question, index) => (
                  <RadioQuestion key={index} question={question} index={index} handleAnswer={handleAnswer} />
                ))
              : questions.map((question, index) => <CardResult key={index} question={question} />)}
            {checkAnswer === false ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCheckAnswer}
                sx={{
                  margin: '16px 0'
                }}
              >
                Check Answer
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleResetTest}
                sx={{
                  margin: '16px 0'
                }}
              >
                Reset
              </Button>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}
