import React from 'react';
import './App.css';
import Cart from './components/CartView/Cart';
import NavView from './components/NavView/NavView';
import RegisterView from './components/RegisterView/RegisterView';
import LogInView from './components/LogInView/LogInView';
import { Navigate, Route, Routes } from 'react-router-dom';
import CartProduct from './commons/Product/CartProduct';

function App() {
  return (
    <div className='App'>
      <NavView />
      <Routes>
        <Route path='/cart' element={<Cart />} />
        <Route path='/register' element={<RegisterView />} />
        <Route path='/signIn' element={<LogInView />} />
        <Route path='/home' element={<h1>HOME</h1>} />
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/product/:id' element={<CartProduct />} />
      </Routes>
    </div>
  );
}

export default App;
