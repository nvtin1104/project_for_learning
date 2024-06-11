import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import RecordingCard from './common/RecordingCard';

import LessonDetails from './common/LessonDetail';
import { useDispatch } from 'react-redux';

const StartStudyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [start, setStart] = useState(false);
  const { state } = useLocation();
  const [name, setName] = useState('');
  useEffect(() => {
    if (state && state.data) {
      setData(state.data);
    } else {
      navigate('/study');
    }
  }, [state, navigate]);

  const handleStart = (name) => {
    setName(name);
    setStart(true);
  };

  return (
    <Grid
      sx={{
        height: '100vh',
        bgcolor: 'secondary.dark',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'inherit'
      }}
    >
      {data && !start ? (
        <LessonDetails data={data} onStart={handleStart} />
      ) : (
        start && <RecordingCard name={name} data={data} navigate={navigate} dispatch={dispatch} />
      )}
    </Grid>
  );
};

export default StartStudyPage;
