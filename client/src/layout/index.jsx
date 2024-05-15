import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Outlet, useNavigate } from 'react-router-dom';
import { MdOutlineMenu } from 'react-icons/md';
import SearchAppBar from './common/search-bar';
import AvatarBox from './common/avatar';
import FooterLayout from './common/footer';
import { navItems } from './config-layout';
import { MdOutlineLightMode } from 'react-icons/md';
import { MdModeNight } from "react-icons/md";
import { useTheme } from '@emotion/react';
import { ColorModeContext } from '../app';
const drawerWidth = 240;

const MainLayout = (props) => {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const navigate = useNavigate();
	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				MUI
			</Typography>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item.name} disablePadding>
						<ListItemButton
							sx={{ textAlign: 'center' }}
							onClick={() => navigate(item.path)}
						>
							<ListItemText primary={item.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar component="nav">
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { md: 'none' } }}
					>
						<MdOutlineMenu />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ display: { xs: 'none', md: 'block' } }}
					>
						LOGO
					</Typography>
					<Box sx={{ display: { xs: 'none', md: 'block' } }}>
						{navItems.map((item) => (
							<Button
								key={item.name}
								sx={{ color: '#fff' }}
								onClick={() => navigate(item.path)}
							>
								{item.name}
							</Button>
						))}
					</Box>
					<SearchAppBar />
					<AvatarBox/>
					<IconButton aria-label="Mode" onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <MdModeNight /> : <MdOutlineLightMode />}
					</IconButton>
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', md: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
			</nav>
			<Box component="main" sx={{ p: 3, width: '100vw' }}>
				<Toolbar />
				<Outlet />
				<FooterLayout />
			</Box>
		</Box>
	);
};

MainLayout.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default MainLayout;
