import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { IconChevronRight, IconChevronLeft, IconCards } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { PieChart } from '@mui/x-charts/PieChart';

const RecordingCard = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [current, setCurrent] = useState(0);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState({});
  useEffect(() => {
    fetchData();
  }, [state, id]);

  const fetchData = () => {
    if (state) {
      setData(state.data);
      setQuestions(state.data.questions);
    } else {
      navigate(`/lessons/${id}`);
    }
  };

  const handleAnswer = (value) => {
    updateQuestion(value);
  };

  const updateQuestion = (value) => {
    const newQuestion = { ...questions[current] };
    newQuestion.answer = value;

    newQuestion.options.find((option) => option.option === value).isCorrect
      ? (newQuestion.checkAnswer = true)
      : (newQuestion.checkAnswer = false);
    const updatedQuestions = [...questions];
    updatedQuestions[current] = newQuestion;
    setQuestions(updatedQuestions);
  };
  const handleResult = () => {
    let result = 0;
    questions.forEach((question) => {
      if (question.checkAnswer) {
        result += 1;
      }
    });
    let point = (result / questions.length) * 100;
    setIsResult(true);
    setResult({
      point,
      rightAnswer: result,
      wrongAnswer: questions.length - result
    });
  };
  const handleChangeCurrent = (value) => {
    setCurrent(value);
  };

  return (
    <Card
      sx={{
        p: 3,
        height: '100%'
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
          <Button
            variant="contained"
            color="secondary"
            sx={{
              mt: 3
            }}
            onClick={() => handleResult()}
            size="large"
          >
            End
          </Button>
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
          height: 80,
          width: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          m: '0 32px'
        }}
      >
        <Typography color="white">Point: {result.point}</Typography>
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
