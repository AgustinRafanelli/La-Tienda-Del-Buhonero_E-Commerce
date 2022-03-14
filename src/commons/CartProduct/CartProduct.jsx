import React from 'react';
import { StyledContainer } from './style';
import { addToCart, removeFromCart } from '../../redux/cart';
import {useDispatch} from "react-redux";


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

  const handleLess = ()=>{
    
    let amount = cart.amount -1
    dispatch(addToCart({id, amount}))
    
  }

  const handleMore = ()=>{
    
  }

  const handleDelete = ()=>{
    
  }

  return (
    
    <StyledContainer>
    {console.log(cart.amount)}
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/6/6f/HK_USP_9mm_Pragl.jpg'
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
            <button>+</button>
            unidades)
          </p>
        </div>
        <h3 className='info__model'>{model}</h3>
        <p className='info__description'>{description}</p>
        <div className='info__price'>{ price.toLocaleString('en-US', { style: 'currency', currency: 'USD' } ) }</div>
      </div>
    </StyledContainer>
  );
}

export default CartProduct;
