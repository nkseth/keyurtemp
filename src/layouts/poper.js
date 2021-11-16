import React from 'react';
import Popover from '@mui/material/Popover';

import { Magic } from 'magic-sdk';
import { useNavigate } from 'react-router';
import { Avatar,Box, Button, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import {NavLink} from 'react-router-dom';
import { deepOrange } from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessIcon from '@mui/icons-material/Business';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import PaymentIcon from '@mui/icons-material/Payment';

 const BasicPopover=({user})=> {
  const [anchorEl, setAnchorEl] = React.useState(null);
const history=useNavigate()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const m = new Magic(process.env.REACT_APP_MAGIC_PUBLIC_KEY);

const Logoutclick= async()=>{
   
        await m.user.logout().then(()=>{
        
          history.push('/')
         document.location.reload()
        })
      
     
}
const linkstyle={
  display:'flex',
  
  alignItems:'center',
marginTop:"5px",
color:'black',
textDecoration: 'none',

}
 
  return (
    <div>
      
      <Avatar  aria-describedby={id} style={{cursor:'pointer',marginLeft:'10px',maginRight:'10px'}}  onClick={handleClick}
      sx={{ bgcolor: "orange",color:'white'  }}
      >{ user[0].toUpperCase()}</Avatar>
     
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
          <Box px={5} py={2} style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <Box
           
           
            >
                <Typography  color="primary">{user}</Typography></Box>
         <NavLink 
         style={linkstyle}
          to="/Profile">
              <PersonIcon/>
               Profile
              </NavLink>
              <NavLink  style={linkstyle}  color="inherit" to="/orders">
             <AssignmentIcon/>
               Orders
              </NavLink>
              <NavLink  style={linkstyle}  color="inherit" to="/companies">
             <BusinessIcon/>
              Companies
              </NavLink>
              <NavLink  style={linkstyle} color="inherit" to="/subscriptions">
              <CardMembershipIcon/>
               Subscriptions
              </NavLink>
              {/* <NavLink  style={linkstyle}  color="inherit" to="/paymentMethod">
              <PaymentIcon/> Payment Method
              </NavLink> */}
              <Button   style={{marginTop:'10px'}} onClick={Logoutclick}>
               Logout
              </Button>
              </Box>
      </Popover>
    </div>
  );
}
export default BasicPopover
