import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../../redux/cart';
import axios from 'axios';
import { useState, useEffect} from 'react';
import Valoration from '../Valoration/Valoration'

export default function GridCard({product}) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.cart)
  const [reset, setReset] = useState('0')
  const [onCart, setOnCart] = useState([])

  const handleAddToCart = (e) => {
    if (!user.id) throw alert("You must be logged to perform this action")
    dispatch(addToCart({productId:product.id}))
      .then(() => setReset(reset - 1))
  }

  const handleDeleteItem = e => {
    if (!user.isAdmin) throw alert("You shoudn't be seeing this button");
    axios.delete(`/api/products/${product.id}`);
  };

  const handleRemoveFromCart = ()=>{
    dispatch(removeFromCart(product.id))
      .then(()=>setReset(reset-1))
  }

  useEffect(()=>{
    setOnCart(cart.filter(productCart => productCart.id == product.id))
  },[reset])

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
        justifyContent: 'left',
      }}
    >
      {
        user.isAdmin ? 
         (
          <Button onClick={handleDeleteItem} sx={{ color: 'red', fontweight: 'bold' }} size="small">X</Button>
         ) 
         : 
         (<></>)
       }
      <Link to={`/product/${product.id}`}>
        <CardMedia
          component='img'
          image='https://source.unsplash.com/random'
          alt='random'
        />
      </Link>
      <Valoration id={product.id} />
      <CardContent sx={{ height: '100px' }}>
        <Typography gutterBottom variant='h5' component='h2'>
          {product.title} {product.brand} {product.model}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography sx={{ color: 'green' }}>
          { product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' } ) }
          </Typography>
          {onCart.length > 0 ? (
          <Button onClick={handleRemoveFromCart} sx={{ color: 'red'}} size="small">Remove from Cart</Button>
          ) : (
            <Button onClick = { handleAddToCart } size = "small">Add to Cart</Button>
          )}
        </CardActions>
    </Card>
  );
}
