import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledContainer } from './style';
import { addToCart, removeFromCart } from '../../redux/cart';
import {useDispatch} from "react-redux";
import { useState } from 'react';
import { useEffect } from 'react';


function CartProduct({
  id,
  title,
  brand,
  model,
  description,
  price,
  stock,
  imgUrl,
  cart,
  
}) {

  const dispatch= useDispatch();
  const [amountPrice, setAmountPrice] = useState('')

  useEffect(() => { 
    setAmountPrice(price*cart.amount)
  }, [cart.amount])

  const handleLess = ()=>{
    let amount = cart.amount - 1
    dispatch(addToCart({ productId: id, amount }))
      .catch(err => console.error(err))
  }

  const handleMore = ()=>{
    let amount = cart.amount + 1
    dispatch(addToCart({ productId: id, amount }))
      .catch(err => console.error(err))
  }

  const handleDelete = ()=>{
    dispatch(removeFromCart(id))
      .catch(err => console.error(err))
  }
  
  return ( 
    <StyledContainer>
      <img
        src={imgUrl || "https://source.unsplash.com/random"}
        alt='Not found'
        className='img'
      />
      <div className='info'>
        <div className='info__header'>
          <p className='header__title'>{title}</p>
          <p className='header__brand'>{brand}</p>
          <p className='header__stock'>
            (<button onClick= {handleLess}>-</button>
            {cart.amount}
            <button onClick={handleMore}>+</button>
            unidades)
          </p>
            <DeleteIcon onClick={handleDelete}></DeleteIcon>
        </div>
        <h3 className='info__model'>{model}</h3>  
        <p className='info__description'>{description}</p>
        <div className='info__price'>{amountPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' } ) }</div>
      </div>
    </StyledContainer>
  );
}

export default CartProduct;
