import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react'
import axios from 'axios'
import GridCard from './GridCard';


const theme = createTheme();

export default function GridProducts() {
  const [products, setProducts] = useState([])
  const [test, setTest] = useState({})

  useEffect(()=>{
    axios.get('http://localhost:3001/api/products')
      .then(res => setProducts(res.data))
    axios.get('http://localhost:3001/api/products/3')
      .then(res => setTest(res))
  }, []) 
  
  if(!products[0]) return <></>
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <GridCard product={product}/>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}