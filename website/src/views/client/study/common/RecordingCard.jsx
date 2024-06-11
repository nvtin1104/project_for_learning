import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { PieChart } from '@mui/x-charts/PieChart';
import { handleSound } from 'assets/sound';
import { handleCreateHistoryTest } from 'store/slices/historySlice';

const RecordingCard = ({ data, name, navigate, dispatch }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [current, setCurrent] = useState(0);
  const [questions, setQuestions] = useState(data.questions);
  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState({});
  const handleAnswer = (value) => {
    updateQuestion(value);
  };

  const handleAfterAnswer = (type) => {
    handleSound(type);
    if (current < questions.length - 1) {
      setTimeout(() => {
        setCurrent(current + 1);
      }, 1000);
    }
  };
  const updateQuestion = (value) => {
    const newQuestion = { ...questions[current] };
    newQuestion.answer = value;
    newQuestion.options.find((option) => option.option === value).isCorrect
      ? (newQuestion.checkAnswer = true)
      : (newQuestion.checkAnswer = false);
    newQuestion.options.find((option) => option.option === value).isCorrect ? handleAfterAnswer('correct') : handleAfterAnswer('wrong');
    const updatedQuestions = [...questions];
    updatedQuestions[current] = newQuestion;
    setQuestions(updatedQuestions);
  };
  const handleResult = (time) => {
    handleSound('success');
    let result = 0;
    questions.forEach((question) => {
      if (question.checkAnswer) {
        result += 1;
      }
    });
    let point = (result / questions.length) * 100;
    setIsResult(true);
    const resultData = {
      lessonId: data._id,
      authId: data.authId,
      name,
      point,
      time: time,
      rightAnswer: result,
      wrongAnswer: questions.length - result
    };
    dispatch(handleCreateHistoryTest({ data: resultData }));
    setResult(resultData);
  };
  const handleChangeCurrent = (value) => {
    setCurrent(value);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      handleResult(time);
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  return (
    <Card
      sx={{
        width: '1200px',
        height: '600px',
        position: 'relative',
        p: 3
      }}
    >
      {isResult ? (
        <CardResult result={result} navigate={navigate} />
      ) : (
        <>
          <Stack spacing={2} mb={3} direction="row" justifyContent="space-between">
            <Typography variant="h2" component="h1">
              {data.title}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Name: {name}</Typography>
              <Typography>{time} s</Typography>
              <Typography>{`${current + 1}/${questions.length}`}</Typography>
              <IconButton aria-label="pre" disabled={current === 0} onClick={() => handleChangeCurrent(current - 1)}>
                <IconChevronLeft />
              </IconButton>
              <IconButton aria-label="next" disabled={questions.length === current + 1} onClick={() => handleChangeCurrent(current + 1)}>
                <IconChevronRight />
              </IconButton>
            </Stack>
          </Stack>
          {questions.length > 0 && <QuestionCard questions={questions} current={current} handleAnswer={handleAnswer} />}
          <Stack
            sx={{
              position: 'absolute',
              bottom: 32,
              right: 32
            }}
          >
            {current === questions.length - 1 && (
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  mt: 3
                }}
                onClick={() => setIsRunning(false)}
                size="large"
              >
                End
              </Button>
            )}
          </Stack>
        </>
      )}
    </Card>
  );
};

const QuestionCard = ({ questions, current, handleAnswer }) => (
  <Stack>
    <Card
      sx={{
        padding: 3,
        width: '100%',
        mb: 3,
        bgcolor: 'secondary.light'
      }}
    >
      <Typography variant="h4" component="h5" color="inherit">
        {questions[current].question}
      </Typography>
    </Card>
    <Grid
      sx={{
        height: '100%'
      }}
      container
      spacing={2}
    >
      {questions[current].options.map((option, index) => (
        <OptionCard key={index} option={option} currentAnswer={questions[current].answer} handleAnswer={handleAnswer} />
      ))}
    </Grid>
  </Stack>
);

const OptionCard = ({ option, currentAnswer, handleAnswer }) => (
  <Grid item xs={12} md={6}>
    <Card
      sx={{
        p: 2,
        bgcolor:
          currentAnswer && option.isCorrect
            ? '#43a047'
            : option.option === currentAnswer && !option.isCorrect
              ? '#f44336'
              : 'secondary.light',
        ':hover': {
          bgcolor: !currentAnswer ? 'rgba(0, 0, 0, 0.2)' : null,
          cursor: 'pointer'
        }
      }}
      onClick={currentAnswer ? undefined : () => handleAnswer(option.option)}
    >
      <Typography variant="p" component="p">
        {option.option}
      </Typography>
    </Card>
  </Grid>
);
const CardResult = ({ result, navigate }) => {
  return (
    <Stack sx={{ height: '100%', position: 'relative' }} direction="row" alignItems="center" justifyContent="space-between">
      <PieChart
        colors={['green', 'yellow']}
        series={[
          {
            data: [
              { id: 0, value: result.rightAnswer, label: 'Right answer' },
              { id: 1, value: result.wrongAnswer, label: 'Wrong answer' }
            ]
          }
        ]}
        width={400}
        height={200}
      />
      <Card
        sx={{
          bgcolor: 'secondary.dark',
          height: 120,
          width: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          m: '0 32px'
        }}
      >
        <Stack>
          <Typography color="white">Name: {result.name}</Typography>
          <Typography color="white">Point: {result.point}</Typography>
          <Typography color="white">Time: {result.time} s</Typography>
        </Stack>
      </Card>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          mt: 3,
          position: 'absolute',
          bottom: 16,
          right: 16
        }}
        size="large"
        onClick={() => navigate(-1)}
      >
        Back to Lesson
      </Button>
    </Stack>
  );
};

export default RecordingCard;
