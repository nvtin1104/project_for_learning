import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { MdOutlineNavigateNext, MdNavigateBefore } from 'react-icons/md';
import PaginationNumber from './PaginationNumber';
import PaginationNumberMidle from './PaginationNumberMidle';
export default function PaginationCard() {
	return (
		<Stack spacing={2} direction="row" justifyContent="space-between">
			<Button variant="text" startIcon={<MdNavigateBefore />}>
				Pre
			</Button>
     <div className='pagination-number-container'>
     <PaginationNumber number={1} active />
      <PaginationNumberMidle number={3} maxPage={3} />
      <PaginationNumber number={5} />

     </div>
			<Button variant="text" disabled endIcon={<MdOutlineNavigateNext />}>
				Next
			</Button>
		</Stack>
	);
}
