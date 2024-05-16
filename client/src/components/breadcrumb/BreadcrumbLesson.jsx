import Breadcrumbs from '@mui/material/Breadcrumbs';
import { PropTypes } from 'prop-types';
import { Link as LinkNav } from 'react-router-dom';
import Link from '@mui/material/Link';
import LinkNavigate from '../link/LinkNavigate';

export default function BreadcrumbLesson({ label, id }) {
	BreadcrumbLesson.propTypes = {
		label: PropTypes.string,
		id: PropTypes.string,
	};
	return (
		<div role="presentation">
			<Breadcrumbs aria-label="breadcrumb">
				<LinkNavigate label={'Home'} to="/" />
				<LinkNavigate label={'Topic'} to="/topic" />

				<Link underline="none" color="text.primary" aria-current="page">
					{label}
				</Link>
			</Breadcrumbs>
		</div>
	);
}
