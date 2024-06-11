import React, { useEffect, useState } from 'react';
import { IconCards, IconNotebook, IconSearch } from '@tabler/icons-react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card } from '@mui/material';
import RatingLesson from 'ui-component/rating/RationLesson';
import ChipCategory from 'ui-component/chip/ChipCategory';
import ChipIcon from 'ui-component/chip/ChipIcon';
import RecordingCard from './common/RecordingCard';

const StartStudyPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [start, setStart] = useState(false);
  const { state } = useLocation();
  useEffect(() => {
    if (state) {
      setData(state.data);
    } else {
      navigate('/study');
    }
  }, [state]);

  return (
    <Stack
      sx={{
        height: '100vh',
        bgcolor: 'secondary.dark',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'inherit'
      }}
    >
      <Stack spacing={2}>
        {data !== null && !start && (
          <Card
            sx={{
              p: 3
            }}
          >
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
              <Button variant="contained" color="secondary" onClick={() => setStart(true)} startIcon={<IconCards />} size="large">
                Start Test
              </Button>
            </Stack>
          </Card>
        )}
        {start && <RecordingCard data={data} navigate={navigate} />}
      </Stack>
    </Stack>
  );
};

export default StartStudyPage;
