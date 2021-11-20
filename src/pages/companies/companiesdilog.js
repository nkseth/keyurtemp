/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {Box, Container, Grid} from '@mui/material'
import axios from '../../utils/axios'
import { createStyles, makeStyles } from '@mui/styles';
import useAuth from 'src/hooks/useAuth';
import useUI from 'src/hooks/useUI'

import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import { Stack, TextField, Alert,Card ,CardContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {CompanyContext} from '../../ourlogic/Context/companycontext'
import {Switch} from '@mui/material';
// hooks


const useStyles = makeStyles((theme) =>
  createStyles({
  imageset:{
  
        maxWidth:'100%',
    
      [theme.breakpoints.up('md')]:{
        maxWidth:'50%'
      },
      
  }
  }),
);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const  InvoiceDialogs=(props) =>{


    const [open, setOpen] = React.useState(false);
  const {gettoken}=useAuth()
  const {UIdispatch}=useUI()
  const [activeaddons,setactiveaddons]=React.useState([])
  const [activeplan,setactiveplan]=React.useState([])
  const [cstatus,setcstatus]=React.useState({})
  const [userdata,setuserdata]=React.useState({
      CompanyEmail:"",
          CompanyName: "",
          companyURL: "",
          domainName: "",
          setupDate:"",
          
  })
   const {createcompany}=React.useContext(CompanyContext)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const ProspectSchema = Yup.object().shape({
    companyName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Company Name is required'),
    domainName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Company Domain Name required'), 
    companyurl: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Company Url required'), 
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    steupDate:Yup.date().required('Startup Date is required')
  });

  
  React.useEffect(() => {
  
     setuserdata({
      email:props.email,
      companyName: props.title,
      companyurl: props.url,
      domainName: props.domain,
      steupDate:props.setupdate,
     
     })
     setcstatus(props.status)
  }, [])
  
    
     
      const fire= async()=>{
          UIdispatch({type:'LOADING',payload:true})
           gettoken().then(async(token)=>{
            
                      await axios({
                          method:'GET',
                         url:`/activeadonscompany/${props.id}`,
                         headers:{
                                'Authorization':`Bearer ${token}`,
                                'Content-Type':"application/json"
                            }}).then(async(resa)=>{
                              setactiveaddons(resa.data)
                            
                              await axios({
                                  method:'GET',
                                 url:`/activeplanscompany/${props.id}`,
                                 headers:{
                                        'Authorization':`Bearer ${token}`,
                                        'Content-Type':"application/json"
                                    }}).then(async(resffff)=>{
                                  
                                        setactiveplan(resffff?.data)
                                       
                                        UIdispatch({type:'LOADING',payload:false})
                                        setOpen(true);
                                     
                                     })
                            })
                 
                }).catch((error)=>{
                    UIdispatch({type:'LOADING',payload:false})
                    UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error.message,state:true}})
                    setOpen(false);
                  }
                )
          }     
     


          const formik = useFormik({
            initialValues: userdata ,
            enableReinitialize:true,
            validationSchema: ProspectSchema,
            
            onSubmit: async (values, { setErrors, setSubmitting }) => {
              
            const callplan=async()=>{
              handleClose()
              UIdispatch({type:'LOADING',payload:true})
              const token=await gettoken()
                 
                 await axios({
                  method:'PUT',
                 url:`/companies/${props.id}`,
                 headers:{
                        'Authorization':`Bearer ${token}`,
                        'Content-Type':"application/json"
                    },
                  data: {CompanyEmail: values.email,
                    CompanyName: values.companyName,
                    companyURL: values.companyurl,
                    
                    domainName:values.domainName,
                    setupDate:values.steupDate,
                    status:cstatus
                  }
                 })
                 .then(async(res1)=>{
                  window.location.reload()
                  UIdispatch({type:'LOADING',payload:false})
                  
                  enqueueSnackbar("company updated Successfully",{variant:'success'})
        
               
                 
               }).catch((err)=>{
                     UIdispatch({type:'LOADING',payload:false})
                     UIdispatch({type:'LOADING',payload:false})
                     enqueueSnackbar(err?.message,{variant:'error'})
                 })
             }
             callplan()
            }
        
            
          })

          
          const handleClickOpen = () => {
            fire()
          };

          const handleClose = () => {
      
            setOpen(false);
          };
          


          const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
      <>
    <div>
      
      <Button variant="outlined" style={{borderRadius:'20px'}} onClick={handleClickOpen}>
      Manage
      </Button>
      <BootstrapDialog
       // onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      maxWidth="xl"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
         MANAGE COMPANY
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Grid container spacing={3} justifyContent='flex-start' alignItems='center'>
     {  activeplan.length>0 ||  activeaddons.length>0? <Grid item sm={12} md={7} >
        {
               
               activeplan.length>0?(
                    <>

            <Grid
                justifyContent='center' alignItems='center'   >
                <Typography variant="h6" color='primary'>Active Plan</Typography>

                </Grid>
            <Grid item container xs={12}  justifyContent='space-between' alignItems='center' 
            style={{marginTop:'10px',marginBottom:'10px',padding:'10px', boxShadow:'0 0 10px gray',borderRadius:'20px',
            paddingTop:'20px',paddingBottom:'20px'
            }}>
               
               {/* <Grid item container xs={4} lg={2} justifyContent='center' alignItems='center'>
               <img 
                                   src={activeplan[0].plan?.cover?.formats?.medium?.url?
                                       `${process.env.REACT_APP_ENDPOINT}${activeplan[0].plan?.cover?.formats?.medium?.url}`
                                       :`${process.env.REACT_APP_ENDPOINT}${activeplan[0].plan?.cover?.formats?.thumbnail?.url}`}
                                   alt={activeplan[0].plan.title}
                                  className={classes.imageset}
                                   />
             </Grid> */}
             <Grid item container  xs={8} lg={4}  justifyContent='flex-start' alignItems='center'>
             <Box style={{display:'flex',flexWrap:'wrap'}}>
                 <Box>
             <Typography style={{color:activeplan[0].plan.headercolor,fontSize:'1.2rem',fontWeight:'bold'}}>{activeplan[0].plan.title}</Typography>
             <Typography style={{textTransform:'capitalize',fontSize:'.8rem',fontWeight:'bold'}}>{`${activeplan[0].plan.currency} ${activeplan[0].plan.price} / User / ${activeplan[0].plan.tenure}`}</Typography>
            </Box>
          
             </Box>
               </Grid>
               <Grid item container xs={6} lg={3} justifyContent='flex-start' alignItems='center'>
             <Box style={{display:'flex',flexWrap:'wrap'}}>
                 <Box>
             <Typography style={{color:activeplan[0].plan.headercolor,fontSize:'1rem',fontWeight:'bold'}}>Activation Date</Typography>
           <Typography style={{textTransform:'capitalize',fontSize:'.8rem',fontWeight:'bold'}}>{activeplan[0].startdate}</Typography>
            </Box>
          
             </Box>
               </Grid>

               <Grid item container xs={6} lg={3}   justifyContent='flex-start' alignItems='center'>
             <Box style={{display:'flex',flexWrap:'wrap'}}>
                 <Box>
             <Typography style={{color:activeplan[0].plan.headercolor,fontSize:'1rem',fontWeight:'bold'}}>Expiry Date</Typography>
           <Typography style={{textTransform:'capitalize',fontSize:'.8rem',fontWeight:'bold'}}>{activeplan[0].enddate}</Typography>
            </Box>
          
             </Box>
               </Grid>
              
               </Grid>
               </>):null
} 

               

             {
             activeaddons.length>0?
            <>
         <Grid
            justifyContent='space-between' alignItems='center'   >
             <Typography variant="h6" color='primary'>Active Addons</Typography>

             </Grid>

             {activeaddons.map((item)=>{
                     return (
                        <Grid item container xs={12}  justifyContent='space-between' alignItems='center'
                         style={{marginTop:'10px',marginBottom:'10px',padding:'10px', 
                         boxShadow:'0 0 10px gray',borderRadius:'20px', paddingTop:'20px',paddingBottom:'20px'}}>
               
                        {/* <Grid item container xs={4} lg={2}  justifyContent='center' alignItems='center'>
                        <img 
                                            src={item?.cover?.formats?.medium?.url?
                                                `${process.env.REACT_APP_ENDPOINT}${item?.addon.cover?.formats?.medium?.url}`
                                                :`${process.env.REACT_APP_ENDPOINT}${item?.addon.cover?.formats?.thumbnail?.url}`}
                                            alt={item.title}
                                           className={classes.imageset}
                                            />
                      </Grid> */}
                      <Grid item container xs={8} lg={4}  justifyContent='flex-start' alignItems='center'>
                      <Box style={{display:'flex',flexWrap:'wrap'}}>
                          <Box>
                      <Typography style={{fontSize:'1.2rem',fontWeight:'bold'}}>{item.addon.title}</Typography>
                    <Typography style={{textTransform:'capitalize',fontSize:'.8rem',fontWeight:'bold'}}>{`${item.addon.currency} ${item.addon.price} / User / ${item.addon.tenure}`}</Typography>
                     </Box>
                   
                      </Box>
                        </Grid>
                        <Grid item container xs={6} lg={3} justifyContent='flex-start' alignItems='center'>
             <Box style={{display:'flex',flexWrap:'wrap'}}>
                 <Box>
             <Typography style={{fontSize:'1rem',fontWeight:'bold'}}>Activation Date</Typography>
           <Typography style={{textTransform:'capitalize',fontSize:'.8rem',fontWeight:'bold'}}>{item.startdate}</Typography>
            </Box>
          
             </Box>
               </Grid>

               <Grid item container xs={6} lg={3}   justifyContent='flex-start' alignItems='center'>
             <Box style={{display:'flex',flexWrap:'wrap'}}>
                 <Box>
             <Typography style={{fontSize:'1rem',fontWeight:'bold'}}>Expiry Date</Typography>
           <Typography style={{textTransform:'capitalize',fontSize:'.8rem',fontWeight:'bold'}}>{item.enddate}</Typography>
            </Box>
          
             </Box>
               </Grid>
                        </Grid>
                        
                     )
                    })}
                    </>
                :null
                }
               </Grid>  :null
              }
      <Grid item sm={12} md={activeplan.length>0 ?4:12} >
      { activeplan.length>0 ? null:<Box justifyContent="center" align="center" display="flex" m={2} style={{fontWeight: 'bold'
  
    }}>NO ACTIVE PLAN FOUND</Box>}
    <FormikProvider value={formik}>

      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
  
        <Stack spacing={3}>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

          

            <TextField
              fullWidth
              label="Company Name"
              {...getFieldProps('companyName')}
              error={Boolean(touched.companyName && errors.companyName)}
              helperText={touched.companyName && errors.companyName}
            />

            <TextField
              fullWidth
              label="Domain Name"
              {...getFieldProps('domainName')}
              error={Boolean(touched.domainName && errors.domainName)}
              helperText={touched.domainName && errors.domainName}
            />
          </Stack>
          <TextField
              fullWidth
              label="Company Webite"
              {...getFieldProps('companyurl')}
              error={Boolean(touched.companyurl && errors.companyurl)}
              helperText={touched.companyurl && errors.companyurl}
            />

<TextField
              fullWidth
              type="date"
              label="Company setup Date"
              {...getFieldProps('steupDate')}
              error={Boolean(touched.steupDate && errors.steupDate)}
              helperText={touched.steupDate && errors.steupDate}
              InputLabelProps={{ shrink: true }}
            />
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Company Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
         <Box justifyContent="center" alignItems="center" display="flex" m={2}>
          <Typography>Company Status</Typography>
 <Switch checked={cstatus} onChange={()=>{setcstatus(!cstatus)}}/>
 </Box>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
           Update 
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
</Grid>
</Grid>
        </DialogContent>

      
      </BootstrapDialog>
    </div>
    </>
  );
}
export default InvoiceDialogs