import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import shieldFill from '@iconify/icons-eva/shield-fill';
// material
import { useSnackbar } from 'notistack';
import { styled } from '@mui/material/styles';
import { Box, Switch, Divider, Typography, Stack,Select, FormControl, InputLabel, MenuItem, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
//
import axiosInstance from '../../../utils/axios'
import Label from '../../Label';
import {CartContext} from '../../../ourlogic/Context/cartapi'
import { CompanyContext } from 'src/ourlogic/Context/companycontext';
import {useContext,useEffect,useState} from 'react'
import useAuth from 'src/hooks/useAuth';
import { useNavigate } from 'react-router';

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

export default function PaymentSummary({ formik }) {
  const { getFieldProps, isSubmitting } = formik;
const {state,Emptycart}=useContext(CartContext)
  const {cstate,callcompanytoken}=useContext(CompanyContext)
  const [selectedcompany, setselectedcompany] = useState("")
const [total,settotal]=useState(0)
const {gettoken}=useAuth()
const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(()=>{
    
    let total1=0
  state.map((item)=>total1=total1+item.price)
    settotal(total1)


  },[state])

  useEffect(() => {
console.log("sadfsdfsd",cstate)
callcompanytoken()
  },[])


  const comnfrmcheckout=async()=>{
    if(selectedcompany==="")  enqueueSnackbar('Please select a company to continue Or Create One',{ variant:'error'})
   else{
    enqueueSnackbar('please wait loading',{ variant:'success'})
   // UIdispatch({type:"LOADING",payload:true})
    const token=await gettoken()
   
    await axiosInstance({
     method:'POST',
    url:'/orders',
    headers:{
           'Authorization':`Bearer ${token}`,
           'Content-Type':"application/json"
       },
     data:JSON.stringify({cart:state,companyid:selectedcompany})
    }).then((res)=>{

  // UIdispatch({type:"LOADING",payload:false})
Emptycart()
   // history.push('/thankyou')
     enqueueSnackbar('your order has been Placed',{ variant:'success'})   
})
.catch((error)=>
{
    
  enqueueSnackbar(error?.response?.data?.message,{ variant:'error'})

    // UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error?.response?.data?.message,status:true}})
    // UIdispatch({type:"LOADING",payload:false})
    
})
   }
}

const history=useNavigate()

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
          <Typography sx={{ color: 'text.secondary' }}>{state.length>0?state[0].currency:""}</Typography>
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
  <InputLabel id="demo-simple-select-label">Select Company</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
   value={selectedcompany}
    label="Select Company"
   onChange={(e)=>{setselectedcompany(e.target.value)}}
  >
    {cstate.map((item)=>{

return <MenuItem value={item.id}>{item.CompanyName}</MenuItem>
    })}
   
  </Select>
  <Typography variant="subtitle2" color="primary" style={{cursor: 'pointer'}} onClick={()=>{history('/createcompany')}}>Add a new Company</Typography>
</FormControl>
     
      <Button onClick={comnfrmcheckout}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ mt: 5, mb: 3 }}
      >
        Upgrade My Plan
      </Button>

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box component={Icon} icon={shieldFill} sx={{ width: 20, height: 20, color: 'primary.main' }} />
          <Typography variant="subtitle2">Secure credit card payment</Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          This is a secure 128-bit SSL encrypted payment
        </Typography>
      </Stack>
    </RootStyle>
  );
}
