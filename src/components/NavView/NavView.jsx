import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { StyledContainer } from './style';
import { useSelector, useDispatch } from 'react-redux'
import { sendLogOutRequest } from '../../redux/user';
import { logoutCart } from '../../redux/cart';
import Search from "../SearchView/Search";

function NavView() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = ()=>{
    dispatch(sendLogOutRequest())
      .then(()=> dispatch(logoutCart()))
      .catch(err => console.error(err))
  }


  return (
    <StyledContainer>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar className='container'>
            <div className='leftSide__container'>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant='h6'
                component='div'
                sx={{ flexGrow: 1 }}
                className='leftSide__title'
              >
                #theMerchantShop
              </Typography>
            </div>
            <div className='rightSide__container'>
              <Search/>
              {user.id ? (
                  <Button onClick={handleLogout} color='inherit' className='login'>
                    Logout
                  </Button>
              ) : (
                <Link
                    to = '/signIn'
                    style = {{ textDecoration: 'none', color: 'white' }}
                  >
                  <Button color='inherit' className='login'>
                    Login
                  </Button>
                </Link>
              )}
              <Link to='/cart' style={{ textDecoration: 'none' }}>
                <Button color='inherit' size='large' className='cart'>
                  <ShoppingCartOutlinedIcon />
                  <div className='cart__description'>
                    C<span className='cart__description-lowercase'>art</span>
                  </div>
                </Button>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </StyledContainer>
  );
}

export default NavView;
