import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Grid, Typography, useTheme } from '@mui/material';
import { PropTypes } from 'prop-types';
import CardLesson from '../../../components/card/CardLesson';
import PaginationCard from '../../../components/pagination/PaginationCard';

const AntTabs = styled(Tabs)({
	borderBottom: '1px solid #e8e8e8',
	'& .MuiTabs-indicator': {
		backgroundColor: '#1890ff',
	},
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
	({ theme }) => ({
		textTransform: 'none',
		minWidth: 0,
		[theme.breakpoints.up('sm')]: {
			minWidth: 0,
		},
		fontWeight: theme.typography.fontWeightRegular,
		marginRight: theme.spacing(1),
		color: 'rgba(0, 0, 0, 0.85)',
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:hover': {
			color: '#40a9ff',
			opacity: 1,
		},
		'&.Mui-selected': {
			color: '#1890ff',
			fontWeight: theme.typography.fontWeightMedium,
		},
		'&.Mui-focusVisible': {
			backgroundColor: '#d1eaff',
		},
	})
);
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

export default function ContainerTab() {
	const [value, setValue] = React.useState(0);
	const [subValue, setSubValue] = React.useState(0);

	// const theme = useTheme();
	const handleChange = (event, newValue) => {
    setSubValue(0);
		setValue(newValue);
	};
	const handleSubChange = (event, newValue) => {
		setSubValue(newValue);
	};
	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ bgcolor: '#fff' }}>
				<AntTabs
					value={value}
					onChange={handleChange}
					aria-label="ant example"
					variant="scrollable"
					scrollButtons
				>
					<AntTab label="All" />
					<AntTab label="New" />
					<AntTab label="Trend" />
				</AntTabs>
				<AntTabs
					value={subValue}
					onChange={handleSubChange}
					aria-label="Subject"
					variant="scrollable"
					scrollButtons
				>
					<AntTab label="All" />
					<AntTab label="New" />
					<AntTab label="Trend" />
				</AntTabs>
				<Grid container spacing={2} sx={{margin: '32px 0', width: '100% !important'}}>
					<Grid item lg={3} md={4} xs={12}>
						<CardLesson />
					</Grid>
					<Grid item lg={3} md={4} xs={12}>
						<CardLesson />
					</Grid>
					<Grid item lg={3} md={4} xs={12}>
						<CardLesson />
					</Grid>
					<Grid item lg={3} md={4} xs={12}>
						<CardLesson />
					</Grid>
          <Grid item lg={3} md={4} xs={12}>
						<CardLesson />
					</Grid>
				</Grid>
        <PaginationCard/>
			</Box>
		</Box>
	);
}
