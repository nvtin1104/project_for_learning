import './style.css';
import { PropTypes } from 'prop-types';

const PaginationNumber = ({ number, active = false, clickFunc }) => {
	return (
		<div className={`pagination-number ${active ? 'active' : ''}`} onClick={()=> clickFunc(number)}>
			{number}
		</div>
	);
};

PaginationNumber.propTypes = {
	number: PropTypes.number.isRequired,
	active: PropTypes.bool,
	clickFunc: PropTypes.func,
};

export default PaginationNumber;
