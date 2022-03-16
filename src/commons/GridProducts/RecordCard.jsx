import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cart';
import axios from 'axios';

export default function GridCard({ product }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleAddToCart = (e) => {
    if (!user.id) throw alert("You must be logged to perform this action")
    dispatch(addToCart({ productId: product.id }))
  }

  const handleDeleteItem = (e) => {
    if (!user.isAdmin) throw alert("You shoudn't be seeing this button")
    axios.delete(`/api/products/${product.id}`)
  }

  return (
    <Card sx={{ width: 1/1, display: 'flex', flexDirection: 'row', alignItems: 'space-between', justifyContent: 'left' }}>
      <CardContent sx={{ flexGrow: 2 }}>
        <Link to={`/product/${product.id}`}>
          <Typography gutterBottom variant="h6" component="h5" sx={{alignContent: 'left'}}>
            {product.title} {product.brand} {product.model}
          </Typography>
        </Link>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Typography > {product.cart.amount} x </Typography>
        <Typography sx={{ color: 'green' }}>
          {product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </Typography>
        <Typography > = </Typography>
        <Typography sx={{ color: 'green' }}>
          {(product.price * product.cart.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </Typography>

      </CardActions>
    </Card>
  );
}