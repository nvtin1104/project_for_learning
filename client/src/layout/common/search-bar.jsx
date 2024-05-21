import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { IoMdSearch } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleSearchLessons } from '../../redux/slices/searchSlice';
import { useNavigate } from 'react-router-dom';

import {
	Box,
	Divider,
	Fade,
	List,
	ListItem,
	ListItemText,
	Popper,
	Typography,
	useTheme,
} from '@mui/material';
const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('sm')]: {
			width: 'auto',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

export default function SearchAppBar() {
	const [search, setSearch] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const dispatch = useDispatch();
	const data = useSelector((state) => state.search.data);
	const status = useSelector((state) => state.search.status);
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const elementRef = useRef(null);
	const [width, setWidth] = useState(0);
	const theme = useTheme();
	const navigate = useNavigate();
	useEffect(() => {
		if (elementRef.current) {
			setWidth(elementRef.current.offsetWidth);
		}
	}, [width]);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		setOpen((previousOpen) => !previousOpen);
	};

	const canBeOpen = open && Boolean(anchorEl);
	const id = canBeOpen ? 'transition-popper' : undefined;
	useEffect(() => {
		if (data && status === 'success') {
			setSearchResults(data);
		}
	}, [data, status]);
	useEffect(() => {
		const timer = setTimeout(() => {
			if (search === '') {
				setSearchResults([]);
				return;
			}
			dispatch(handleSearchLessons({ search }));
		}, 1500);

		// Cleanup function to clear the timeout if the component unmounts or search changes
		return () => clearTimeout(timer);
	}, [search, dispatch]);
	return (
		<>
			<Search
				sx={{
					flexGrow: 1,
				}}
				ref={elementRef}
			>
				<SearchIconWrapper>
					<IoMdSearch />
				</SearchIconWrapper>
				<StyledInputBase
					placeholder="Search…"
					inputProps={{ 'aria-label': 'search' }}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					aria-describedby={id}
					onClick={handleClick}
				/>
			</Search>
			<Popper
				id={id}
				open={open}
				anchorEl={anchorEl}
				sx={{
					zIndex: 100000,
				}}
        onClose={() => setOpen(false)}
				transition
			>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps} timeout={350}>
						<Box
							sx={{
								border: 1,
								borderColor: theme.palette.primary,
								p: 1,
								width: width,
								bgcolor: 'background.paper',
							}}
						>
							Result of search
							<List
								sx={{
									width: '100%',
									bgcolor: 'background.paper',
								}}
							>
								{searchResults && searchResults.length > 0 ? (
									searchResults.map((result) => (
											<ListItem alignItems="flex-start" key={result._id}>
												<ListItemText
													sx={{
														cursor: 'pointer',
													}}
													onClick={() => navigate(`/lessons/${result._id}`)}
													primary={result.title}
													secondary={
														<Typography
															sx={{ display: 'inline' }}
															component="span"
															variant="body2"
															color="text.primary"
														>
															{new Date(result.createdAt).toDateString()}
														</Typography>
													}
												/>
											<Divider component="span" />

											</ListItem>
									))
								) : (
									<Typography>No result found</Typography>
								)}
							</List>
						</Box>
					</Fade>
				)}
			</Popper>
		</>
	);
}
