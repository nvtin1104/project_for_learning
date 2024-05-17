import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function RatingLesson() {
  const [value, setValue] = React.useState(2);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="Rating"
        value={value}
        precision={0.5}
        size="small"
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Box sx={{ ml: 2 }}>
        (4 Rating)
      </Box>
    </Box>
  );
}
