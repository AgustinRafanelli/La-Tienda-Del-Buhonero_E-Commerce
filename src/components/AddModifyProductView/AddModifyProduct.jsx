import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import useInput from "../../hooks/useInput";
import { useParams } from "react-router-dom";
import { useState } from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
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

export default function AddProductView() {
  const params = useParams();

  const [product, setProduct] = useState({});
  const [oldProduct, setOldProduct] = useState({});

  React.useEffect(() => {
    if(params.id) {
      axios
        .get(`http://localhost:3001/api/products/${params.id}`)
        .then((product) => setProduct(product.data));
    }
  }, []);

  const title = useInput("title", product.title);
  const brand = useInput("brand");
  const model = useInput("model");
  const description = useInput("description");
  const price = useInput("price");
  const stock = useInput("stock");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      return axios.put(`http://localhost:3001/api/products/${params.id}`, {
          title: title.value,
          brand: brand.value,
          model: model.value,
          description: description.value,
          stock: stock.value,
          price: price.value,
        })
        .then((res) => setProduct(res.data))
        // .then(()=>{return axios.get(`http://localhost:3001/api/products/${params.id}`).then(res => )});
    } else {
      return axios.post("http://localhost:3001/api/products", {
        title: title.value,
        brand: brand.value,
        model: model.value,
        description: description.value,
        stock: stock.value,
        price: price.value,
      });
    }
  };

  React.useEffect(()=>{
      return axios.get(`http://localhost:3001/api/products/${params.id}`).then(res => setOldProduct(res.data));
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            {params.id ? "Modify Product" : "New Product"}
          </Typography>
          <Typography component="h6" variant="h6" align="start">
            {params.id ? "Please insert your changes and press the button 'Modify Product'" : "Please indicate the main characteristics of your product and press the button 'Add Product'."}
            
            {" "}
          </Typography>
          {oldProduct.id && 
          <>
          <p>Please verify the information below and insert changes in the form: </p>
          <div>
            <strong>Title: </strong><span>{oldProduct.title}</span><br></br>
            <strong>Brand: </strong><span>{oldProduct.brand}</span><br></br>
            <strong>Model: </strong><span>{oldProduct.model}</span><br></br>
            <strong>Description: </strong><span>{oldProduct.description}</span><br></br>
            <strong>Price: </strong><span>{oldProduct.price}</span><br></br>
            <strong>Stock: </strong><span>{oldProduct.stock}</span><br></br>
          </div>
          </>
          }
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="title"
                name={title.name}
                value={title.value}
                onChange={title.handleChange}
                label="Product Type"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="brand"
                name={brand.name}
                value={brand.value}
                onChange={brand.handleChange}
                label="Brand"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="model"
                name={model.name}
                value={model.value}
                onChange={model.handleChange}
                label="Model"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="price"
                name={price.name}
                value={price.value}
                onChange={price.handleChange}
                label="Price"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="stock"
                name={stock.name}
                value={stock.value}
                onChange={stock.handleChange}
                label="Stock"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="description"
                name={description.name}
                value={description.value}
                onChange={description.handleChange}
                label="Description"
                fullWidth
                multiline
                variant="standard"
              />
            </Grid>
            {/* <Grid item sm={12}>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <Button variant="contained" component="span">
                  Upload photo
                </Button>
              </label>
            </Grid> */}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 5, ml: 43 }}
            >
              {params.id ? "Modify Product" : "Add Product"}
            </Button>
          </Grid>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
