import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { IconPlus } from '@tabler/icons-react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import Scrollbar from 'ui-component/scrollbar';

import TableNoData from '../common/detail/table-no-data';
import UserTableHead from '../common/detail/user-table-head';
import TableEmptyRows from '../common/detail/table-empty-rows';
import UserTableToolbar from '../common/detail/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { Link, useParams } from 'react-router-dom';
import { handleToast } from 'utils/toast';
import { handleGetLessonsByUserId, handleDeleteLessonById } from 'store/slices/lessonsSlice';
import UserTableRow from '../user-table-row';
import { handleGetHistoryTest } from 'store/slices/historySlice';

// ----------------------------------------------------------------------

export default function DetailView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();

  const statusDel = useSelector((state) => state.lessons.statusDel);
  const error = useSelector((state) => state.lessons.error);
  const [lessons, setLessons] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if (statusDel === 'success') {
      handleToast('success', 'Delete successful');
      // dispatch(resetDeleteProduct());
      dispatch(handleGetHistoryTest({ id })).then((res) => {
        res.payload.listTest && setLessons(res.payload.listTest);
      });
    }
    if (error && statusDel === 'failed') {
      handleToast('error', error.message);
    }
  }, [statusDel, error, dispatch]);
  useEffect(() => {
    dispatch(handleGetHistoryTest({ id })).then((res) => {
      console.log(res.payload);
      res.payload && setLessons(res.payload);
    });
  }, [dispatch]);
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = lessons.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: lessons,
    comparator: getComparator(order, orderBy),
    filterName,
    name: 'name'
  });
  const handleDelete = (id) => {
    dispatch(handleDeleteLessonById({ id }));
  };
  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Lessons Detail</Typography>
      </Stack>

      <Card>
        <UserTableToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <UserTableHead
              order={order}
              orderBy={orderBy}
              rowCount={lessons.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: 'name', label: 'Name' },
                { id: 'point', label: 'Point' },
                { id: 'createdAt', label: 'createdAt', align: 'center' },
                { id: 'time', label: 'Time' },
                { id: '' }
              ]}
            />
            <TableBody>
              {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <UserTableRow
                  key={row._id}
                  id={row._id}
                  name={row.name}
                  point={row.point}
                  time={row.time}
                  createdAt={row.createdAt}
                  selected={selected.indexOf(row.name) !== -1}
                  handleClick={(event) => handleClick(event, row.name)}
                  handleDelete={() => handleDelete(row._id)}
                />
              ))}

              <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, lessons.length)} />

              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          page={page}
          component="div"
          count={lessons.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
