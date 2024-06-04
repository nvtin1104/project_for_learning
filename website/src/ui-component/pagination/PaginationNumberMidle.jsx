import './style.css';
import { PropTypes } from 'prop-types';

const PaginationNumberMidle = ({ number, maxPage }) => {
	return (
		<div className="midle-pagination-container">
			{number === 2? null : (
				<div className="dot-pagination-container">
					<div></div>
					<div></div>
					<div></div>
				</div>
			)}
			<div className="pagination-number active">{number}</div>
			{(number === (maxPage - 1)) || (maxPage == number)? null : (
				<div className="dot-pagination-container">
				<div></div>
				<div></div>
				<div></div>
			</div>
			)}
		</div>
	);
};

PaginationNumberMidle.propTypes = {
	number: PropTypes.number,
	maxPage: PropTypes.number,
};

export default PaginationNumberMidle;
