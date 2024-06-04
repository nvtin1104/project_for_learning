import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const LinkNavigate = ({ to, label, color }) => {
	LinkNavigate.propTypes = {
		to: PropTypes.string,
		label: PropTypes.string,
		color: PropTypes.string,
	};
	return (
		<Link style={{ textDecoration: 'none', color: 'inherit' }} to={to}>
			{label}
		</Link>
	);
};

export default LinkNavigate;
