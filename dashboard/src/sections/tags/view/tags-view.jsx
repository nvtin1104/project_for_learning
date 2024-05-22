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

import { createTag, deleteTag, getAllTags, resetDel } from 'src/redux/slices/tagsSlice';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import Grid from '@mui/material/Unstable_Grid2';
import AddTagsForm from '../add-tags-form';

// ----------------------------------------------------------------------

export default function TagsView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();

  const statusDel = useSelector((state) => state.tags.statusDel);
  const error = useSelector((state) => state.tags.error);
  const dataDel = useSelector((state) => state.tags.dataDel);
  const dataCreate = useSelector((state) => state.tags.create);
  const statusCreate = useSelector((state) => state.tags.statusCreate);
  useEffect(() => {
    if (statusDel === 'success' && dataDel) {
      handleToast('success', 'Delete successful');
      dispatch(resetDel());
      setTags(dataDel);
    }
    if (error && statusDel === 'failed') {
      handleToast('error', error.message);
    }
  }, [statusDel, error, dispatch, dataDel]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    if (statusCreate === 'success' && dataCreate) {
      handleToast('success', 'Create successful');
      dispatch(resetDel());
      setTags(dataCreate);
    }
    if (error && statusCreate === 'failed') {
      handleToast('error', error.message);
    }
  }, [statusCreate, error, dispatch, dataCreate]);
  useEffect(() => {
    dispatch(getAllTags()).then((res) => {
      setTags(res.payload);
      console.log(res.payload);
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
      const newSelecteds = tags.map((n) => n.name);
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
    inputData: tags,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const handleDelete = (id) => {
    dispatch(deleteTag(id));
  };
  const notFound = !dataFiltered.length && !!filterName;
  const handleGetContent = (content) => {
    dispatch(createTag(content))
  };
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Tags</Typography>
      </Stack>
      <Grid container spacing={3}>
        <Grid xs={12} md={12} lg={8}>
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
                    rowCount={tags.length}
                    numSelected={selected.length}
                    onRequestSort={handleSort}
                    onSelectAllClick={handleSelectAllClick}
                    headLabel={[
                      { id: 'name', label: 'Name' },
                      { id: 'createdAt', label: 'createdAt', align: 'center' },
                      { id: 'status', label: 'Status' },
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
                          status={row.status}
                          createdAt={row.createdAt}
                          selected={selected.indexOf(row.name) !== -1}
                          handleClick={(event) => handleClick(event, row.name)}
                          handleDelete={() => handleDelete(row._id)}
                        />
                      ))}

                    <TableEmptyRows
                      height={77}
                      emptyRows={emptyRows(page, rowsPerPage, tags.length)}
                    />

                    {notFound && <TableNoData query={filterName} />}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              page={page}
              component="div"
              count={tags.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Grid>
        <Grid xs={12} md={12} lg={4}>
          <AddTagsForm handleGetContent={handleGetContent} />
        </Grid>
      </Grid>
    </Container>
  );
}
