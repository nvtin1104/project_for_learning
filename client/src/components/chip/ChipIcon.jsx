import { Chip } from '@mui/material';
import { FaRegUserCircle } from "react-icons/fa";
import PropTypes from 'prop-types';

const ChipIcon = ({ label }) => {
  ChipIcon.propTypes = {
    label: PropTypes.string
  };

  return (
    <Chip size='large' sx={{ padding: '0 8px'}} icon={<FaRegUserCircle />} label={label || 'Icon'} />
  );
};

export default ChipIcon;
