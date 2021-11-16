import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useContext, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';

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
//import { MHidden } from '../../@material-extend';

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

export default function PaymentMethods({ formik,data,date,id }) {
  const [show, setShow] = useState(false);
  const { values, getFieldProps } = formik;
const {user}=useAuth()
 
  const handleCollapseIn = () => {
    setShow((prev) => !prev);
  };

  const handleCollapseOut = () => {
    setShow(false);
  };



  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ mb: 1 }} style={{marginLeft:'20px'}}>
       Order Id: {id}
      </Typography>
      <Typography variant="subtitle1"  sx={{ mb: 2 }} style={{marginLeft:'20px'}}>
      Date: {date}
      </Typography>

      <RadioGroup {...getFieldProps('method')}>
      
        <Stack spacing={2}>
            {console.log(id,date)}
           {data?.map((method,index) => {
             return (
              <OptionStyle
                key={index}>
                  <Grid container style={{padding:'10'}}>
                 

                  <Grid item xs={12} md={3} justifyContent="center" alignItems="flex-start" direction="column">
                <Typography variant="h6" sx={{ ml: 1 }} color="primary" style={{textTransform:'capitalize'}}>
                      {method.title}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ ml: 1 }} color="primary" style={{textTransform:'capitalize'}}>
                      {method.filteroption}
                    </Typography>
                    </Grid>

                    <Grid item  container xs={12} md={5} justifyContent="center"  alignItems="flex-start" direction="column">
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
