import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import ChipCategory from '../chip/ChipCategory';
import ChipIcon from '../chip/ChipIcon';
import { PropTypes } from 'prop-types';

export default function CardLesson({lesson, navtigateToLesson}) {
  CardLesson.propTypes = {
    lesson: PropTypes.object,
    navtigateToLesson: PropTypes.func,
  };
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
    }}
    onClick={() => navtigateToLesson(lesson._id)}
    >
			<CardContent>
				<Typography variant='h2' sx={{ fontSize: 18 }} gutterBottom>
					{lesson.title}
				</Typography>
				<Stack direction="row" spacing={1}>
					<ChipCategory label={lesson?.category?.subject} />
					<ChipCategory label={`${lesson?.questions.length} questions`} />
				</Stack>
				<Typography variant="body2">{lesson.description}</Typography>
        
			</CardContent>
      <CardActions sx={{ float: 'right'}}>
        <ChipIcon label={lesson.auth} />
      </CardActions>
		</Card>
	);
}
