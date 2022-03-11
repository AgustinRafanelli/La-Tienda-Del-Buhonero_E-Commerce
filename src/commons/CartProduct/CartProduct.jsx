import React from 'react';
import { StyledContainer } from './style';

function CartProduct({
  id,
  title,
  brand,
  model,
  description,
  price,
  stock,
  imgUrl,
}) {
  return (
    <StyledContainer>
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
            (<button>-</button>
            {stock}
            <button>+</button>
            unidades)
          </p>
        </div>
        <h3 className='info__model'>{model}</h3>
        <p className='info__description'>{description}</p>
        <div className='info__price'>${price}</div>
      </div>
    </StyledContainer>
  );
}

export default CartProduct;
