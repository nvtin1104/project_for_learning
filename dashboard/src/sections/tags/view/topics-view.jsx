import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { handleToast } from 'src/utils/toast';

import { createTag, deleteTopic, getAllTopics, resetDel } from 'src/redux/slices/topicsSlice';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import Button from '@mui/material/Button';
import Iconify from '../../../components/iconify';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function TopicsView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();

  const statusDel = useSelector((state) => state.topics.statusDel);
  const error = useSelector((state) => state.topics.error);
  const dataDel = useSelector((state) => state.topics.dataDel);
  const dataCreate = useSelector((state) => state.topics.create);
  const statusCreate = useSelector((state) => state.topics.statusCreate);
  useEffect(() => {
    if (statusDel === 'success' && dataDel) {
      handleToast('success', 'Delete successful');
      dispatch(resetDel());
      dispatch(getAllTopics()).then((res) => {
        setTopics(res.payload);
      });
    }
    if (error && statusDel === 'failed') {
      handleToast('error', error.message);
    }
  }, [statusDel, error, dispatch, dataDel]);
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    if (statusCreate === 'success' && dataCreate) {
      handleToast('success', 'Create successful');
      dispatch(resetDel());
      setTopics(dataCreate);
    }
    if (error && statusCreate === 'failed') {
      handleToast('error', error.message);
    }
  }, [statusCreate, error, dispatch, dataCreate]);
  useEffect(() => {
    dispatch(getAllTopics()).then((res) => {
      setTopics(res.payload);
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
      const newSelecteds = topics.map((n) => n.name);
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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
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
    inputData: topics,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const handleDelete = (id) => {
    dispatch(deleteTopic(id));
  };
  const notFound = !dataFiltered.length && !!filterName;
  const handleGetContent = (content) => {
    dispatch(createTag(content));
  };
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Tags</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="add">
            New Topic
          </Link>
        </Button>
      </Stack>
      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={topics.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'createdAt', label: 'Created At', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row._id}
                      name={row.name}
                      createdAt={row.createdAt}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      handleDelete={() => handleDelete(row._id)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, topics.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={topics.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
