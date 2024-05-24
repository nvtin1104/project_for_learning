import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import AddProductForm from '../add-product-form';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import AddQuestion from '../add-question';
import { handleToast } from 'src/utils/toast';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, resetCreateProduct } from 'src/redux/slices/productsSlice';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function LessonsAdd() {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState([]);
  const dispach = useDispatch();
  // useEffect(() => {
  //   if (statusCreate === 'success') {
  //     handleToast('success', 'Create successful');
  //     setQuestion([]);
  //   }
  // }
  const handleGetContent = (content) => {
    console.log(content);
  };
  const handleDeleteQuestion = (i) => {
    const newQuestion = question.filter((item, index) => i !== index);
    setQuestion(newQuestion);
  };

  const handleAddQuestion = (values) => {
    const newQuestion = [...question, values];
    setQuestion(newQuestion);
  };
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} md={12} lg={7}>
          <Stack spacing={2}>
            <AddProductForm handleGetContent={handleGetContent} />
            <Card
              sx={{
                p: 3,
              }}
            >
              {question.length > 0 ? (
                question.map((item, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<Iconify icon="ic:sharp-expand-more" />}
                      aria-controls={`panel1a-content-${index}`}
                      id={`panel1a-header-${index}`}
                    >
                      <Typography>{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack
                        spacing={2}
                        sx={{
                          pl: 3,
                        }}
                      >
                        {item.options.map((option, index) => (
                          <Typography key={index} fontSize={12}>
                            {option.option} {option.isCorrect && ' (Correct)'}
                          </Typography>
                        ))}
                      </Stack>
                    </AccordionDetails>
                    <AccordionActions>
                      <Button size="small" onClick={() => handleDeleteQuestion(index)}>
                        Delete
                      </Button>
                    </AccordionActions>
                  </Accordion>
                ))
              ) : (
                <Typography>No question</Typography>
              )}
            </Card>
          </Stack>
        </Grid>
        <Grid xs={12} md={12} lg={5}>
          <AddQuestion handleAddQuestion={handleAddQuestion} />
        </Grid>
      </Grid>
    </Container>
  );
}
