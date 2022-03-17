import "./CartProductStyle.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as React from "react";
import ImageList from "@mui/material/ImageList";
import { CardMedia, Typography } from "@mui/material";

const CartProduct = () => {
  const [product, setProduct] = useState([]);
  const productId = useParams();

  const showProduct = async () => {
    axios
      .get(`http://localhost:3001/api/products/${productId.id}`)
      .then((res) => res.data)
      .then((data) => {
        setProduct(data);
      });
  };

  useEffect(() => {
    showProduct();
  }, [productId]);
  
  if(!product.id) return <></>
  
  return (
    <div className="CardOne">
      <ImageList
        sx={{ width: 1 / 1, height: 1 / 1 }}
        cols={2}
        rowHeight={"auto"}
      >
        <CardMedia
          className="img"
          component="img"
          height="100%"
          image={product.imgUrl ? product.imgUrl : "https://http.cat/404"}
          alt={product.title ? product.title : "Cat"}
        />

        <div className="texts">
          <Typography gutterBottom variant="h2" component="div">
            {product.title} {product.brand} {product.model}
          </Typography>
          <hr></hr>
          <Typography gutterBottom variant="h6" component="div">
            <strong>Description:</strong> {product.description}
          </Typography>
          <hr></hr>
          <Typography gutterBottom variant="h3" component="div">
            <strong>Price:</strong>{" "}
            {product.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            <strong>Stock:</strong> {product.stock} unidades
          </Typography>
          <hr></hr>
        </div>
      </ImageList>
    </div>
  );
};

export default CartProduct;
