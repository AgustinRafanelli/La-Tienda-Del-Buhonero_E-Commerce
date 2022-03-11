import React from 'react';
import { Link } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { StyledContainer } from './style';
import { useSelector, useDispatch } from 'react-redux'
import { sendLogOutRequest } from '../../redux/user';
import { logoutCart } from '../../redux/cart';

function NavView() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = ()=>{
    dispatch(sendLogOutRequest())
      .then(()=> dispatch(logoutCart()))
      .catch(err => console.error(err))
  }

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },
  }));

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
              {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder='Search…'
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search> */}
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
