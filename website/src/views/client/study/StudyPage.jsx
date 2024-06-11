import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Logo from 'ui-component/Logo';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { IconSearch } from '@tabler/icons-react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetLessonsById, resetStatus } from 'store/slices/lessonsSlice';
import { handleToast } from 'utils/toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../ui-component/Loader';

const StudyPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.lessons.status);
  const error = useSelector((state) => state.lessons.error);
  const data = useSelector((state) => state.lessons.lesson);
  useEffect(() => {
    if (status === 'success') {
      dispatch(resetStatus());
      navigate('/study/start', { state: { data } });
    } else if (status === 'failed') {
      handleToast('error', error.error);
    }
  }, [error, status, data]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const id = data.get('id');
    const check = /^[0-9a-fA-F]{24}$/.test(id);
    if (check) {
      dispatch(handleGetLessonsById({ id }));
    } else {
      handleToast('error', 'Invalid ObjectID format');
    }
  };

  return (
    <Stack
      sx={{
        height: '100vh',
        backgroundColor: 'secondary.dark',
        display: 'flex',
        m: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'inherit'
      }}
    >
      {status === 'loading' && <Loader />}
      <Stack spacing={2}>
        <Logo />
        <Typography color="white">Search for lessons and enter ...</Typography>
        <form onSubmit={(e) => handleSubmit(e)}>
          <OutlinedInput
            name="id"
            placeholder="Search lessons..."
            startAdornment={
              <InputAdornment position="start">
                <IconSearch stroke={1.5} />
              </InputAdornment>
            }
          />
        </form>
      </Stack>
    </Stack>
  );
};

export default StudyPage;
