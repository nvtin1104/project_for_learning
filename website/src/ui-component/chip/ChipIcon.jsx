import { Chip } from '@mui/material';
// import { FaRegUserCircle } from "react-icons/fa";
import PropTypes from 'prop-types';
import { IconUser } from '@tabler/icons-react';

const ChipIcon = ({ label }) => {
  ChipIcon.propTypes = {
    label: PropTypes.string
  };

  return <Chip size="large" sx={{ padding: '0 8px' }} icon={<IconUser />} label={label || 'Icon'} />;
};

export default ChipIcon;
