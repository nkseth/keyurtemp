import { Link as RouterLink, Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';
import {Badge} from '@mui/material'
import { ShoppingCartTwoTone } from '@mui/icons-material';
import {useContext} from 'react'
// ----------------------------------------------------------------------
import {CartContext} from '../ourlogic/Context/cartapi'
const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
 display: 'flex',
 
 justifyContent: 'space-between',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  const {state}=useContext(CartContext)
  return (
    <>
      <HeaderStyle>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
       
        <Badge badgeContent={state.length} color="primary" style={{cursor: 'pointer'}}>
        <RouterLink to="/checkout">
        <ShoppingCartTwoTone size={32} color="secondary" style={{fontSize:35}} />
        </RouterLink>
</Badge>

      </HeaderStyle>
      <Outlet />
    </>
  );
}
