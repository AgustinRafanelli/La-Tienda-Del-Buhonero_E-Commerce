import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart";
import axios from "axios";
import { useState, useEffect } from "react";

export default function AddToCategoryCard({ product }) {
  const user = useSelector((state) => state.user);

  const [categoryPoducts, setCategoryProducts] = useState([]);
  const [reset, setReset] = useState(1);

  const url = useLocation();
  const category = url.search.slice(1);

  const addToCategory = (e) => {
    if (!user.id) throw alert("You must be logged to perform this action");
    axios
      .post(`/api/category/${category}`, {
        productId: product.id,
      })
      .then(() => setReset(reset + 1));
  };

  const deleteProductCart = () => {
    if (!user.id) throw alert("You must be logged to perform this action");
    axios
      .delete(`/api/category/${category}/${product.id}`)
      .then(() => setReset(reset + 1));
  };

  useEffect(() => {
    axios
      .get(`/api/category/${category}`)
      .then((res) => res.data)
      .then((data) => setCategoryProducts(data));
  }, [reset, url]);

  const catego = categoryPoducts.filter((category) => {
    return category.id == product.id;
  });

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "space-between",
        justifyContent: "left",
      }}
    >
      <Link to={`/product/${product.id}`}>
        <CardMedia
          component="img"
          image="https://source.unsplash.com/random"
          alt="random"
        />
      </Link>
      <CardContent sx={{ height: "100px" }}>
        <Typography gutterBottom variant="h5" component="h2">
          {product.title} {product.brand} {product.model}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Typography sx={{ color: "green" }}>
          {product.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Typography>
      </CardActions>
      {catego.length > 0 ? (
        <Button onClick={deleteProductCart}>Delete product to category</Button>
      ) : (
        <Button onClick={addToCategory}>Add product to category</Button>
      )}
    </Card>
  );
}