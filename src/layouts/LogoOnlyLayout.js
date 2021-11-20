import { Link as RouterLink, Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';
import {Avatar, Badge} from '@mui/material'
import { ShoppingCartTwoTone } from '@mui/icons-material';
import {useContext} from 'react'
import useAuth from '../hooks/useAuth';
import Popper from './poper'
// ----------------------------------------------------------------------
import {CartContext} from '../ourlogic/Context/cartapi'
import { Box } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
 display: 'flex',
 
 justifyContent: 'space-between',
  position:'absolute',
  zIndex:100,
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  const {state}=useContext(CartContext)
  const {user}=useAuth()
  return (
    <>
      <HeaderStyle>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      <Box style={{display: 'flex'}}> 
        <Badge badgeContent={state.length} color="primary" style={{cursor: 'pointer'}}>
        <RouterLink to="/checkout">
        <ShoppingCartTwoTone size={32} color="secondary" style={{fontSize:35}} />
        </RouterLink>
        </Badge>

        <Badge badgeContent={"200"} color="primary" style={{cursor: 'pointer',marginLeft:'10px'}}  max={9999}>
        <RouterLink to="/checkout">
        <AccountBalanceWalletIcon size={32} color="secondary" style={{fontSize:35}} />
        </RouterLink>
        </Badge>

 <Popper user={user.email}  />
      </Box>
      
      </HeaderStyle>
      <Outlet />
    </>
  );
}
