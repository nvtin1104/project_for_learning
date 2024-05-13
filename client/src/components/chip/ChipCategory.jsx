import { Chip } from '@mui/material'
import { PropTypes } from 'prop-types';

const ChipCategory = ({label}) => {
    ChipCategory.propTypes = {
    label: PropTypes.string.isRequired,
    }
  return (
    <Chip label={label} />
  )
}

export default ChipCategory