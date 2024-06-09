import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';
const RecordingCard = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [current, setCurrent] = useState(0);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (state) {
      setData(state.data);
      setQuestions(state.data.questions);
    } else {
      navigate(`/lessons/${id}`);
    }
  }, [state, id]);
  return (
    <Card
      sx={{
        p: 3,
        height: '100%'
      }}
    >
      <Stack spacing={2} mb={3} direction="row" justifyContent="space-between">
        <Typography variant="h2" component="h1">
          {data.title}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>{`${current + 1}/${questions.length}`}</Typography>
          <IconButton aria-label="pre" disabled={current === 0}>
            <IconChevronLeft />
          </IconButton>
          <IconButton aria-label="next" disabled={questions.length === current + 1}>
            <IconChevronRight />
          </IconButton>
        </Stack>
      </Stack>
      {questions.length > 0 && (
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
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    p: 2,
                    bgcolor: 'secondary.light',
                    ':hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.2)',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <Typography variant="p" component="p">
                    Item 1
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
    </Card>
  );
};
export default RecordingCard;
