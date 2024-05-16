import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Card, CardContent } from '@mui/material';
import { PropTypes } from 'prop-types';

export default function RadioQuestion({ question, index }) {
	RadioQuestion.propTypes = {
		question: PropTypes.object,
		handleAnswer: PropTypes.func,
		index: PropTypes.number,
	};
	const [value, setValue] = React.useState(null);
	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<Card sx={{ minWidth: 275, pl: 2, m: '16px 0' }}>
			<CardContent>
				<FormControl>
					<FormLabel id={`question-${index}`}>{question.question}</FormLabel>
					<RadioGroup
						aria-labelledby={`question-${index}`}
						name={`question-${index}`}
						value={value}
						onChange={handleChange}
					>
						{question.options.map((option, index) => (
							<FormControlLabel
								key={index}
								value={option.option}
								control={<Radio />}
								label={option.option}
							/>
						))}
					</RadioGroup>
				</FormControl>
			</CardContent>
		</Card>
	);
}
