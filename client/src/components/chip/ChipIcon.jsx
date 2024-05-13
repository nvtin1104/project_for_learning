import { Chip } from '@mui/material';
import { FaRegUserCircle } from "react-icons/fa";
const ChipIcon = () => {
  return (
    <Chip size='large' sx={{ padding: '0 8px'}} icon={<FaRegUserCircle />} label="Auth" />
  )
}

export default ChipIcon