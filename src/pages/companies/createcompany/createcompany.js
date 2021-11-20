import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import { Stack, TextField, Alert,Typography, Button,Card ,CardContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from '../../../utils/axios'
import * as React  from 'react'
// hooks
import useAuth from '../../../hooks/useAuth';

import useUI from '../../../hooks/useUI';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//

import axiosInstance from "../../../utils/axios";
import {useContext, useRef, useState} from "react";
import {CompanyContext} from '../../../ourlogic/Context/companycontext';
import LogoOnlyLayout from 'src/layouts/LogoOnlyLayout';
;

// ----------------------------------------------------------------------

export default function ProspectForm(props) {
  
  const {createcompany}=useContext(CompanyContext)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const ProspectSchema = Yup.object().shape({
    companyName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Company Name is required'),
    domainName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Company Domain Name required'), 
    companyurl: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Company Url required'), 
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    steupDate:Yup.date().required('Startup Date is required')
  });


    const [open, setOpen] = React.useState(false);
  const {gettoken}=useAuth()
  const {UIdispatch}=useUI()
  const [activeaddons,setactiveaddons]=useState([])
  const [activeplan,setactiveplan]=useState([])
  const [cstatus,setcstatus]=useState({})
  const [userdata,setuserdata]=useState({
      CompanyEmail:"",
          CompanyName: "",
          companyURL: "",
          domainName: "",
          setupDate:"",
          
  })
  
  
  React.useEffect(() => {
  
     setuserdata({
      CompanyEmail:props.email,
      CompanyName: props.title,
      companyURL: props.url,
      domainName: props.domain,
      setupDate:props.setupdate,
     
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
                    enqueueSnackbar(error?.message,{variant:'error'})
                  
                    setOpen(false);
                  }
                )
          }     
     
  
        const handleClickOpen = () => {
            fire()
           
           
          };


  const formik = useFormik({
    initialValues: userdata ,
    enableReinitialize:true,
    validationSchema: ProspectSchema,
    
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      
    const callplan=async()=>{
      UIdispatch({type:'LOADING',payload:true})
      const token=await gettoken()
         
         await axios({
          method:'PUT',
         url:`/companies/${props.id}`,
         headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':"application/json"
            },
            CompanyEmail: values.email,
            CompanyName: values.companyName,
            companyURL: values.companyurl,
            
            domainName:values.domainName,
            setupDate:values.steupDate,
             status:cstatus
         })
         .then(async(res1)=>{
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

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  


  const cref=useRef()

  return (
      <>
    
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

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
           Update Now
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>

</>
  );
}
