import { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { handleToast } from 'src/utils/toast';

import { UserContext } from 'src/context/user.context';
import { resetAuthAction } from 'src/redux/slices/authSlice';
import { useRouter } from 'src/routes/hooks';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    link: '/profile',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    link: '/settings',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [user, setUser] = useState({});
  const { setLogin } = useContext(UserContext);
  const data = useSelector((state) => state.users.me);
  const status = useSelector((state) => state.users.statusMe);
  const dataLogin = useSelector((state) => state.auth.user);
  const statusLogin = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (status === 'success') {
      setUser(data);
    }
    if (statusLogin === 'success') {
      setUser(dataLogin);
    }
  }, [data, status, dataLogin, statusLogin]);
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClose = () => {
    setOpen(null);
  };
  const handleLogout = async () => {
    await dispatch(resetAuthAction());
    handleToast('success', 'Logout successful');
    setLogin(false);
    localStorage.removeItem('token');
    router.push('/');
  };
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.avatar}
          alt={user.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {/* {user?.name.charAt(0).toUpperCase()} */}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            <Link to={option.link}>{option.label}</Link>
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
