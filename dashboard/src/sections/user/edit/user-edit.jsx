import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, deleteUser } from 'src/redux/slices/usersSlice';
import { handleToast } from '../../../utils/toast';
import Modal from '@mui/material/Modal';
import AddUserForm from '../add-user-form';
import { createUser } from 'src/redux/slices/usersSlice';
import EditUserForm from '../edit-user-form';
import { useParams } from 'react-router-dom';
import { getUserById } from 'src/redux/slices/usersSlice';
import { updateUser } from 'src/redux/slices/usersSlice';
// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  maxWidth: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function UserEditPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const status = useSelector((state) => state.users.statusById);
  useEffect(() => {
    dispatch(getUserById({ id })).then((res) => {
      setUser(res.payload);
    });
  }, [dispatch, id]);
  const handleUpdate = (data) => {
    dispatch(updateUser({ id, data })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        handleToast('success', 'Update user successfully');
        setUser(res.payload);
      }
    });
  };
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">User Info</Typography>
      </Stack>
      {Object.keys(user).length > 0 && user && (
        <EditUserForm user={user} handleGetContent={handleUpdate} />
      )}
    </Container>
  );
}
