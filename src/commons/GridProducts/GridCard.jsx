
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
import Valoration from "../Valoration/Valoration";
import Comment from "../Comment/Comment";
import {StyledContainer} from "./style"

export default function GridCard({ product }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const param = useLocation();

  const handleAddToCart = (e) => {
    if (!user.id) throw alert("You must be logged to perform this action");
    dispatch(addToCart({ productId: product.id }));
  };

  const handleDeleteItem = (e) => {
    if (!user.isAdmin) throw alert("You shoudn't be seeing this button");
    axios.delete(`/api/products/${product.id}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "space-between",
        justifyContent: "left",
      }}
    >
      {user.isAdmin ? (
        <StyledContainer>
        <Button
          onClick={handleDeleteItem}
          sx={{ color: "red", fontweight: "bold", width:"100%"  }}
          size="small"
          className="btn-delete"
        >
          Delete Product
        </Button>
        </StyledContainer>
      ) : (
        <></>
      )}
      <Link to={`/product/${product.id}`}>
        <CardMedia
          component="img"
          image={product.imgUrl || "https://source.unsplash.com/random"}
          alt="random"
        />
      </Link>
      <Valoration id={product.id} />
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
        <Button onClick={handleAddToCart} size="small">
          Add to Cart
        </Button>
      </CardActions>
      <Comment id={product.id} />
    </Card>
  );
}
