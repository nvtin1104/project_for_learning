import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function AddQuestion() {
  const [otion, setOption] = React.useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    console.log(value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAddOption = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    console.log(value);
    console.log(otion);
    setOption([...otion, { option: value.option, isCorrect: false }]);
    handleClose();
  };
  return (
    <Card sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Typography variant="h4">Add Question</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <TextField fullWidth label="Question" name="question" type="text" />
            </Grid>
            <Grid item xs={12} md={4}>
              <LoadingButton
                sx={{ mt: 1 }}
                fullWidth
                size="large"
                type="button"
                onClick={handleOpen}
                variant="contained"
                color="inherit"
              >
                Add Option
              </LoadingButton>
            </Grid>
          </Grid>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Options</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {otion.map((item, i) => (
                <FormControlLabel
                  key={i}
                  value={item.option}
                  control={<Radio />}
                  label={item.option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Stack>

        <LoadingButton
          sx={{ mt: 1 }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
        >
          Add
        </LoadingButton>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleAddOption}>
            <Stack spacing={3}>
              <Typography variant="h4">Add Option</Typography>
              <TextField fullWidth label="Option" name="option" type="text" />
              <LoadingButton
                sx={{ mt: 1 }}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
              >
                Add
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Modal>
    </Card>
  );
}
