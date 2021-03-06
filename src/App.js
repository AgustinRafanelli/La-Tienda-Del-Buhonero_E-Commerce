import React, { useEffect } from 'react';
import './App.css';
import Cart from './components/CartView/Cart';
import NavView from './components/NavView/NavView';
import RegisterView from './components/RegisterView/RegisterView';
import LogInView from './components/LogInView/LogInView';
import { Navigate, Route, Routes } from 'react-router-dom';
import CartProduct from './commons/Product/CartProduct';
import GridProducts from './commons/GridProducts/GridProducts';
import { useDispatch } from 'react-redux';
import {getUser} from "./redux/user"
import {getCart} from "./redux/cart"
import AddModifyProductView from './components/AddModifyProductView/AddModifyProduct';
import Checkout from './components/CheckoutView/Checkout';
import Search from './components/SearchView/Search';
import SearchedElements from './components/SearchedElements/SearchedElements';
import HistoryView from './components/HistoryView/HistoryView'
import AddToCategory from './components/AddToCategory/AddToCategory';
import CategoryView from './components/CategoryView/CategoryView';
import AdminView from './components/AdminView/AdminView';

function App() {
  
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getUser())
    .then((data)=>{
      if(data.payload){
        console.log(data.payload)
        dispatch(getCart())
      }
    })
    .catch((ERR)=> console.error(ERR))
  }, [])

  return (
    <div className='App'>
      <NavView />
      <Routes>
        <Route path='/cart' element={<Cart />} />
        <Route path='/register' element={<RegisterView />} />
        <Route path='/signIn' element={<LogInView />} />
        <Route path='/home' element={<GridProducts/>} />
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/product/:id' element={<CartProduct />} />
        <Route path='/product/:id/modify' element={<AddModifyProductView />} />
        <Route path='/product/addProduct' element={<AddModifyProductView />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/search/:title' element={<SearchedElements />} />
        <Route path='/history/:id' element={<HistoryView />} />
        <Route path="/addToCategory" element={<AddToCategory />} />
        <Route path="/categories/:name" element={<CategoryView />} />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </div>
  );
}

export default App;
