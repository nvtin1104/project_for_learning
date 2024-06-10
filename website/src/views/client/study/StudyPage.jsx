import React from 'react';
import Container from '@mui/material/Container';
import Logo from 'ui-component/Logo';

const StudyPage = (props) => {
  return (
    <Container
      sx={{
        height: '100vh',
        bgcolor: 'secondary.dark',
        color: 'inherit'
      }}
    >
      <Logo />
    </Container>
  );
};

export default StudyPage;
