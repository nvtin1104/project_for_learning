import './style.css';
import { PropTypes } from 'prop-types';

const PaginationNumber = ({ number, active = false }) => {
	return (
		<div className={`pagination-number ${active ? 'active' : ''}`}>
			{number}
		</div>
	);
};

PaginationNumber.propTypes = {
	number: PropTypes.number.isRequired,
	active: PropTypes.bool,
};

export default PaginationNumber;
