import {
	Card,
	CardContent,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@mui/material';
import { PropTypes } from 'prop-types';

export default function CardResult({ question }) {
	CardResult.propTypes = {
		question: PropTypes.object,
	};
	return (
		<Card
			sx={{
				minWidth: 275,
				pl: 2,
				m: '16px 0',
			}}
		>
			<CardContent>
				<Typography variant="h6" component="h6" color={question.checkAnswer ? '#43a047' : '#f44336'}>
					{question.question}
				</Typography>
				<List dense={false}>
					{question.options.map((option, index) => (
						<ListItem key={index}>
							<ListItemText
								primary={option.option}
								sx={{
									color:
										option.isCorrect === true
											? '#43a047'
											: option.option === question.answer &&  option.isCorrect === false
											? '#f44336'
											: 'inherit',
								}}
							/>
						</ListItem>
					))}
				</List>
			</CardContent>
		</Card>
	);
}
