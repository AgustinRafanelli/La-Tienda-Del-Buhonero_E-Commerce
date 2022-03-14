import { useEffect } from 'react';
import products from './products.json';
import Contador from './Contador';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCart } from '../../redux/cart';
import CartProduct from '../../commons/CartProduct/CartProduct';
import { StyledContainer } from './style';
import { useState } from 'react';

const Cart = function () {
  const [totalPrice, setTotalPrice] = useState('')
  const cart = useSelector(state => state.cart);

  useEffect(()=>{
    setTotalPrice(cart.reduce((partialSum, product) => partialSum + (product.price * product.cart.amount), 0))
  }, [cart])

  return (
    <StyledContainer>
      {cart.length ? (
        <div className='cart'>
          <h1 className='cart__title'>Cart</h1>
          {cart.map(product => (
            <CartProduct key={product.id} {...product} />
          ))}
          <div className='checkout' >
            {totalPrice}
            <button>Buy Cart</button>
          </div>
        </div>
      ) : (
        <h1>There are no products added</h1>
      )}
    </StyledContainer>
  );
};

export default Cart;
