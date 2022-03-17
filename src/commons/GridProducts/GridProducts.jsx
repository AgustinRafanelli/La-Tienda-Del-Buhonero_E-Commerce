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
import RecordCard from './RecordCard'
import { useLocation } from 'react-router-dom';


const theme = createTheme();

export default function GridProducts({ items }) {
  const [products, setProducts] = useState(items)
  const [test, setTest] = useState({})
  const url = useLocation()

  useEffect(() => {
    if (!products) {
      axios.get('http://localhost:3001/api/products')
        .then(res => setProducts(res.data))
    }
  }, [])

  if (!products) return <></>
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {url.pathname.includes('history') ? (
          <Container sx={{ py: 2 }} maxWidth="md">
            <Grid container sx={{ flexDirection: 'column', justifyContent: "center" }} spacing={2}>
              {products.map((product) => (
                <Grid item key={product.id}>
                  <RecordCard product={product} />
                </Grid>
              )
              )}
            </Grid>
          </Container>
        ) : (
          <Container sx={{ py: 2 }} maxWidth="md">
            <Grid container sx={{ flexDirection: 'row', justifyContent: "center" }} spacing={2}>
              {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <GridCard product={product} />
                </Grid>
              )
              )}
            </Grid>
          </Container>
        )}
      </main>
    </ThemeProvider>
  );
}