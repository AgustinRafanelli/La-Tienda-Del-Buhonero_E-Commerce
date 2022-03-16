import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import GridProducts from "../../commons/GridProducts/GridProducts";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000">
        The Merchant Shop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function HistoryView() {
  const [user, setUser] = useState({})
  const [record, setRecord] = useState([])
  const {id} = useParams()

  useEffect(()=>{
    axios.get(`/api/users/${id}`)
      .then(res => setUser(res.data))
    axios.get(`/api/users/history/${id}`)
      .then(res => setRecord(res.data))
  }, [id])

  if(!user) return <></>

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="2xs" sx={{
        display: "flex",
        flexDirection: "column"
      }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2  ,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4" align="center">
            {user.name}'s order records
          </Typography>
          {!record[0] ? (
            <Typography component="h1" variant="h5" align="center" marginTop='1.5em'>
              Nothing to see here
            </Typography>
          ) : (
            <Grid container sx={{flexDirection: 'column', justifyContent: "center"}}>
              {record.map((order, i)=>{
                let total = order.reduce((partialSum, product) => partialSum + (product.price * product.cart.amount), 0)
                return(
                  <Grid item key={i} sx={{ border: '3px' }} marginTop='1.5em' >
                    <Typography component="h1" variant="h5" align="left">
                      Order N {i+1}
                    </Typography>
                    <Typography component="p" variant="p" align="left">
                      Products bought:
                    </Typography>
                    <GridProducts items={order}/>
                    <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: "right" }} >
                      <Typography>Total: </Typography>
                      <Typography sx={{ color: 'green' }}>
                        {(total).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </Typography>
                    </Container>
                  </Grid>
                )
              })}
            </Grid>
          )}
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
