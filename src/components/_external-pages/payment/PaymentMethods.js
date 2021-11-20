import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useContext, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
import {CartContext} from '../../../ourlogic/Context/cartapi'
import {Grid, IconButton} from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import  useAuth from 'src/hooks/useAuth';
// material
import { styled } from '@mui/material/styles';
import {
  Stack,
  Paper,
  Radio,
  Button,
  Collapse,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
//
import { MHidden } from '../../@material-extend';
import PaymentNewCardForm from './PaymentNewCardForm';
import { DeleteTwoTone } from '@mui/icons-material';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
  {
    value: 'paypal',
    title: 'Pay with Paypal',
    icons: ['/static/icons/ic_paypal.svg']
  },
  {
    value: 'paypal',
    title: 'Pay with Paypal',
    icons: ['/static/icons/ic_paypal.svg']
  },
 
];


const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    padding: 0,
    paddingTop: theme.spacing(5)
  }
}));

const OptionStyle = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2),
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

// ----------------------------------------------------------------------

PaymentMethods.propTypes = {
  formik: PropTypes.object
};

export default function PaymentMethods({ formik }) {
  const [show, setShow] = useState(false);
  const { values, getFieldProps } = formik;
const {user}=useAuth()
  const {state,dispatch,cartid,updatecart,createcart}=useContext(CartContext)
  const currentstate=[...state]
  const handleCollapseIn = () => {
    setShow((prev) => !prev);
  };

  const handleCollapseOut = () => {
    setShow(false);
  };

 let neewstate
  const removeitem=(item)=>{
    neewstate= currentstate.filter((items)=>items.id!==item)
     dispatch({type:'REMOVEITEM',payload:neewstate})
     console.log(user)
     if(user){
      if(cartid){
        console.log('tghididid')
     updatecart(neewstate)
     }else{
     createcart(neewstate)
      }
}

 }

  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ mb: 5 }} style={{marginLeft:'20px'}}>
        Your Plans/Addons in your Cart
      </Typography>

      <RadioGroup {...getFieldProps('method')}>
        {console.log(state)}
        <Stack spacing={4}>
          {state.map((method,index) => {
             return (
              <OptionStyle
                key={index}>
                  <Grid container style={{padding:'20px'}}>
                  <Grid item sm={12} md={1} container justifyContent="center" alignItems="center" >
                  <CheckCircleIcon color="secondary"/>
                  </Grid>

                  <Grid item xs={12} md={2} justifyContent="center" alignItems="flex-start" direction="column">
                <Typography variant="h6" sx={{ ml: 1 }} color="primary" style={{textTransform:'capitalize'}}>
                      {method.title}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ ml: 1 }} color="primary" style={{textTransform:'capitalize'}}>
                      {method.filteroption}
                    </Typography>
                    </Grid>

                    <Grid item  container xs={12} md={4} justifyContent="center"  alignItems="flex-start" direction="column">
                    <Typography variant="body2" sx={{ ml: 1 }} color="primary" style={{textTransform:'capitalize'}}>
                      Category
                    </Typography>
                <Typography variant="h6" sx={{ ml: 1 }} color="primary" style={{textTransform:'capitalize'}}>
                      {method.category}
                    </Typography>
                  
                    </Grid>

                    
                    <Grid item container sm={12} md={4} justifyContent="center" alignItems="flex-start" direction="column" >
                    <Typography variant="body2" sx={{ ml: 1 }} color="primary" style={{textTransform:'capitalize'}}>
                      price
                    </Typography>
                <Typography variant="body1" sx={{ ml: 1 }} color="primary" style={{textTransform:'capitalize',fontWeight:'bold'}}>
                      {method.price} {method.currency}/{method.tenure}
                    </Typography>
                 
                    </Grid>
                    <Grid item sm={12} md={1} container justifyContent="center" alignItems="center" >
                      <IconButton onClick={()=>removeitem(method.id)}>
                   <DeleteTwoTone color='secondary'/>
                   </IconButton>
                  </Grid>

                </Grid>

                {/* <MHidden width="smDown">
                  <Stack direction="row" alignItems="center" spacing={1}>
                <img alt="logo card" src={method.cover.formats.thumbnail.url} />
                   
                  </Stack>
                </MHidden> */}

               
              </OptionStyle>
            );
          })}
        </Stack>
      </RadioGroup>
    </RootStyle>
  );
}
