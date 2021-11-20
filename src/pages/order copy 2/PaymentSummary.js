import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import shieldFill from '@iconify/icons-eva/shield-fill';
// material
import { useSnackbar } from 'notistack';
import { styled } from '@mui/material/styles';
import { Box, Switch, Divider, Typography, Stack,Select, FormControl, InputLabel, MenuItem, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
//

import Label from '../../components/Label';

import {useContext,useEffect,useState} from 'react'



// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    borderRadius: theme.shape.borderRadiusMd,
    backgroundColor: theme.palette.background.neutral
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

PaymentSummary.propTypes = {
  formik: PropTypes.object
};

export default function PaymentSummary({ formik,closed,total}) {
  const { getFieldProps, isSubmitting } = formik;

  const [selectedcompany, setselectedcompany] = useState("")


const { enqueueSnackbar, closeSnackbar } = useSnackbar();




  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        Summary
      </Typography>

      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Label color="error" variant="filled">
          Subtotal
          </Label>
        </Stack>

       

        <Stack direction="row" justifyContent="flex-end">
          {/* <Typography sx={{ color: 'text.secondary' }}>{state.length>0?state[0].currency:""}</Typography> */}
          <Typography variant="h2" sx={{ mx: 1 }}>
          {total}
          </Typography>
         
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
            Total Billed
          </Typography>
          <Typography variant="h6" component="p">
          {total}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
      </Stack>

      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
        * Plus applicable taxes
      </Typography>
      <FormControl fullWidth style={{marginTop:'20px'}}>
 
  
  
</FormControl>
     
      <Button 
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ mt: 5, mb: 3 }}
        onClick={closed}
      >
        close
      </Button>

   
    </RootStyle>
  );
}
