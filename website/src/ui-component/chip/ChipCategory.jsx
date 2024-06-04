import { Chip } from '@mui/material'
import { PropTypes } from 'prop-types';

const ChipCategory = ({label}) => {
    ChipCategory.propTypes = {
    label: PropTypes.string,
    }
  return (
    <Chip label={label || 'Label'} />
  )
}

export default ChipCategory