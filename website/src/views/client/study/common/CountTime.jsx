import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

const CountTime = ({ isRunning, timeStart, getTime }) => {
  const [time, setTime] = useState(timeStart);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
      getTime(time);
      console.log(time);
    }
    return () => clearInterval(interval);
  }, [isRunning, time, timeStart, getTime]);

  return <Typography>{time} s</Typography>;
};

export default CountTime;
