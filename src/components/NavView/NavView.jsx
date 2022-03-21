
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
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
import DropDown from "../DropDown/DropDown";

function NavView() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(sendLogOutRequest())
      .then(()=> dispatch(logoutCart()))
      .catch(err => console.error(err))
  }
  const handleRecord = () => {
    navigate(`/history/${user.id}`)
  }

  const [showCategory, setShowCategory] = useState(false);

  return (
    <StyledContainer>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="container">
            <div className="leftSide__container">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 0}}
                onClick={
                  showCategory
                    ? () => setShowCategory(false)
                    : () => setShowCategory(true)
                }
              >
                <MenuIcon />
              </IconButton>
              <img style={{ width: '30px', height: '40px' }} src="https://cdn.discordapp.com/attachments/648296571812970506/954445135805026374/poster504x498f8f8f8-pad600x600f8f8f8.png" alt="no" />
              <Link style={{color: "white", textDecoration: "none"}} to="/">
                <Typography
                  variant='h6'
                  component='div'
                  className='leftSide__title'
                >
                  theMerchantShop
                </Typography>
              </Link>

            </div>
            <div className='rightSide__container'>
              
              <Search/>
              {user.id ? (
                <>
                  <Button onClick={handleRecord} color='inherit' className='login'>
                    Previous purchase
                  </Button>
                  {user.isAdmin && <Link style={{color: "white", textDecoration: "none"}} to="/admin"><Button color='inherit' className='login'>Users</Button></Link>}
                  <Button onClick={handleLogout} color='inherit' className='login'>
                    Log Out
                  </Button>
                </>
              ) : (
                <Link
                  to="/signIn"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button color="inherit" className="login">
                    Log In
                  </Button>
                </Link>
              )}
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <Button color="inherit" size="large" className="cart">
                  <ShoppingCartOutlinedIcon />
                  <div className="cart__description">
                    C<span className="cart__description-lowercase">art</span>
                  </div>
                </Button>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      {showCategory && <DropDown />}
    </StyledContainer>
  );
}

export default NavView;
