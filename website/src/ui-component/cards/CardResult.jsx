import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import Stack from '@mui/material/Stack';

export default function CardResult({ question }) {
  CardResult.propTypes = {
    question: PropTypes.object
  };
  return (
    <Card
      sx={{
        minWidth: 275,
        pl: 2,
        m: '16px 0'
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" component="h6" color={question.checkAnswer ? '#43a047' : '#f44336'}>
            {question.question}
          </Typography>
          <Typography variant="p" component="p" color={question.checkAnswer ? '#43a047' : '#f44336'}>
            {question.answer === undefined ? 'No answer' : question.checkAnswer ? 'Correct' : 'Incorrect'}
          </Typography>
        </Stack>
        <List dense={false}>
          {question.options.map((option, index) => (
            <ListItem key={index}>
              <Typography
                sx={{
                  color:
                    option.isCorrect === true
                      ? '#43a047'
                      : option.option === question.answer && option.isCorrect === false
                        ? '#f44336'
                        : 'inherit'
                }}
              >
                {option.option}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
