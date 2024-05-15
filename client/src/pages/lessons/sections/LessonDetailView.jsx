import Container from '@mui/material/Container';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BreadcrumbLesson from '../../../components/breadcrumb/BreadcrumbLesson';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import RatingLesson from '../../../components/rating/RationLesson';
import ChipCategory from '../../../components/chip/ChipCategory';
import ChipIcon from '../../../components/chip/ChipIcon';
import { FaRegNoteSticky } from 'react-icons/fa6';
import { FaPaperclip } from 'react-icons/fa';
export default function LessonDetailView() {
	const [data, setData] = useState(null);
	const [questions, setQuestions] = useState([]);
	const { state } = useLocation();
	useEffect(() => {
		if (state) {
			setData(state.data);
			setQuestions(state.data.questions);
      console.log(state.data.questions);
		} else {
			alert('Not found');
		}
	}, [state]);
	return (
		<Container
			sx={{
				height: '100vh',
			}}
		>
			{data !== null && (
				<>
					<BreadcrumbLesson label={data.title} />
					<Typography
						variant="h1"
						component="h1"
						sx={{
							fontSize: '32px',
							fontWeight: 600,
							margin: '16px 0',
						}}
					>
						{data.title}
					</Typography>
					<RatingLesson />
					<Typography
						variant="p"
						component="p"
						sx={{
							fontSize: '16px',
							margin: '16px 0',
						}}
					>
						{data.description}
					</Typography>
					<Stack direction="row" spacing={1}>
						<ChipCategory label={data.category.subject} />
						<ChipCategory label={`${data.questions.length} question`} />
						<ChipIcon label={data.auth} />
					</Stack>
					<Stack
						direction="row"
						spacing={1}
						sx={{
							margin: '16px 0',
						}}
					>
						<Button variant="outlined" startIcon={<FaPaperclip />} size="large">
							Recording Card
						</Button>
						<Button
							variant="outlined"
							startIcon={<FaRegNoteSticky />}
							size="large"
						>
							Test
						</Button>
					</Stack>
				</>
			)}
			<Divider />
			<Box>
				<Typography
					variant="h4"
					component="h4"
					sx={{
						fontSize: '18px',
						fontWeight: 600,
						margin: '16px 0',
					}}
				>
					Question in lesson ({questions.length} questions)
				</Typography>
			</Box>
		</Container>
	);
}
