import { useState } from 'react';
import PropTypes from 'prop-types';
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons-react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'ui-component/label';
import { useRouter } from 'routes/hooks';

// ----------------------------------------------------------------------

export default function UserTableRow({ selected, name, time, createdAt, point, id, handleClick, handleDelete }) {
  const [open, setOpen] = useState(null);
  const route = useRouter();
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const createdDate = new Date(createdAt).toDateString();
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{point}</TableCell>

        <TableCell align="center">{createdDate}</TableCell>

        <TableCell>{time} s</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <IconDotsVertical stroke={2} />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 }
        }}
      >
        <MenuItem onClick={() => route.push(`${id}`)}>
          <IconPencil stroke={2} />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleCloseMenu();
            handleDelete();
          }}
          sx={{ color: 'error.main' }}
        >
          <IconTrash stroke={2} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  time: PropTypes.any,
  handleClick: PropTypes.func,
  createdAt: PropTypes.any,
  id: PropTypes.any,
  name: PropTypes.any,
  selected: PropTypes.any,
  point: PropTypes.string,
  handleDelete: PropTypes.func
};
