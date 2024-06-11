import React from 'react';
import { Card, Button, Stack, Typography, TextField } from '@mui/material';
import { IconCards } from '@tabler/icons-react';
import RatingLesson from 'ui-component/rating/RationLesson';
import ChipCategory from 'ui-component/chip/ChipCategory';
import ChipIcon from 'ui-component/chip/ChipIcon';
import { handleToast } from '../../../../utils/toast';

const LessonDetails = ({ data, onStart }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    if (name === '') {
      handleToast('error', 'Name is requied');
    } else {
      onStart(name); // Trigger the onStart callback after form submission
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h1" component="h1" sx={{ fontSize: '32px', fontWeight: 600, margin: '16px 0' }}>
        {data.title}
      </Typography>
      <RatingLesson />
      <Typography variant="body1" component="p" sx={{ fontSize: '16px', margin: '16px 0' }}>
        {data.description}
      </Typography>
      <Stack direction="row" spacing={1}>
        <ChipCategory label={data.category.subject} />
        <ChipCategory label={`${data.questions.length} question`} />
        <ChipIcon label={data.auth} />
      </Stack>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1} sx={{ margin: '16px 0' }}>
          <TextField name="name" label="Name" />
          <Button variant="contained" color="secondary" type="submit" startIcon={<IconCards />} size="large">
            Start Test
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default LessonDetails;
