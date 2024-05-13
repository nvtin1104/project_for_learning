import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import ChipCategory from '../chip/ChipCategory';
import ChipIcon from '../chip/ChipIcon';

export default function CardLesson() {
	return (
		<Card variant="outlined" sx={{
      borderRadius: 3,
      position: 'relative',
      cursor: 'pointer',
      '&:hover::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '4px',
        backgroundColor: 'rgb(88, 105, 252)',
      },
    }}>
			<CardContent>
				<Typography variant='h2' sx={{ fontSize: 18 }} gutterBottom>
					Name of the word
				</Typography>
				<Stack direction="row" spacing={1}>
					<ChipCategory label="Category" />
				</Stack>
				<Typography variant="body2">Description of the word</Typography>
        
			</CardContent>
      <CardActions>
        <ChipIcon />
      </CardActions>
		</Card>
	);
}
