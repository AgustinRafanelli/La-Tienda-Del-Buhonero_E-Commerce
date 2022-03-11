import { useEffect } from 'react';
import products from './products.json';
import Contador from './Contador';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCart } from '../../redux/cart';
import CartProduct from '../../commons/CartProduct/CartProduct';
import { StyledContainer } from './style';

const Cart = function () {
  const addToCart = () => {};

  const removeFromCart = () => {};

  const deleteFromCart = () => {};

  const cart = useSelector(state => state.cart);

  return (
    <StyledContainer>
      {cart.length ? (
        <div className='cart'>
          <h1 className='cart__title'>Cart</h1>
          {cart.map(product => (
            <CartProduct key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <h1>There are no products added</h1>
      )}

      {/* <ul>
    { products.map((product)=>(
        <li key= {product.id}>{product.name} {product.price}
        <button> Delete</button>
        <button> + </button>
        <button> - </button>
        
        </li>
        
    ))} 
    <Contador/>
       
    </ul> */}
    </StyledContainer>
  );
};

export default Cart;
