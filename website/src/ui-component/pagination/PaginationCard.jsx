// import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import PaginationNumber from './PaginationNumber';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { PropTypes } from 'prop-types';
import PaginationNumberMidle from './PaginationNumberMidle';
export default function PaginationCard({ page, maxPage, handleGetPage }) {
  return (
    <Stack spacing={2} direction="row" justifyContent="space-between">
      <Button variant="text" disabled={page == 1 && true} startIcon={<IconChevronLeft />} onClick={() => handleGetPage(page - 1)}>
        Pre
      </Button>
      <div className="pagination-number-container">
        <PaginationNumber number={1} active={page === 1} clickFunc={handleGetPage} />
        {page === 1 ? (
          <div className="dot-pagination-container">
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <PaginationNumberMidle number={page} maxPage={maxPage} />
        )}
        {page === maxPage ? null : <PaginationNumber number={maxPage} clickFunc={handleGetPage} />}
      </div>
      <Button variant="text" disabled={page === maxPage && true} endIcon={<IconChevronRight />} onClick={() => handleGetPage(page + 1)}>
        Next
      </Button>
    </Stack>
  );
}
PaginationCard.propTypes = {
  page: PropTypes.number,
  maxPage: PropTypes.number,
  handleGetPage: PropTypes.func
};
