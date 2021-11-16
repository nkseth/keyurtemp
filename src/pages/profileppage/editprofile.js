import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import { Stack, TextField, Alert,Typography, Button,Card ,CardContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useUI from '../../hooks/useUI'
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
//
import axiosInstance from "../../utils/axios";


import LogoOnlyLayout from 'src/layouts/LogoOnlyLayout';
import { useEffect, useState } from 'react';
import Loading from 'src/components/Apiloading';
;

// ----------------------------------------------------------------------

export default function ProspectForm(props) {
  const [userdetail,setuserdetail]=useState({
    username:"",
    lastname: "",
    firstname: "",
    email: "",
  })
 const {gettoken}=useAuth()
 const {UIdispatch,UIstate}=useUI()
  useEffect(() => {
    
    const callplan=async()=>{
      const token=await gettoken()
        UIdispatch({type:'LOADING',payload:true})
        await axiosInstance({
          method:'GET',
          url:'/users/me',
          headers:{
                 'Authorization':`Bearer ${token}`,
                 'Content-Type':"application/json"
             },
          }).then(async(res1)=>{
          
            UIdispatch({type:'LOADING',payload:false})
            //(res1)
            console.log({email:res1.data.email,firstname:res1.data.firstname,lastname:res1.data.lastname,username:res1.data.username,id:res1.data.id})
            setuserdetail({email:res1.data.email,firstname:res1.data.firstname,lastname:res1.data.lastname,username:res1.data.username,id:res1.data.id})
         }).catch((err)=>{
             console.log(err)
             enqueueSnackbar("error",err?.response?.error?.message)
           })
       }
   callplan()
      
   }, [])


  const callplan=async(values)=>{
    UIdispatch({type:'LOADING',payload:true})
    const token=await gettoken()
       
       await axiosInstance({
        method:'PUT',
       url:`/users/${userdetail.id}`,
       headers:{
        'Authorization':`Bearer ${token}`,
        'Content-Type':"application/json"
    },
       data:{firstname:values.firstname,lastname:values.lastname,username:values.username}
        
       }).then((res1)=>{
        UIdispatch({type:'LOADING',payload:false})
        enqueueSnackbar("profile updated succesfully",{variant:'success'})
      
       console.log(res1)
      console.log({email:res1.data.email,firstname:res1.data.firstname,lastname:res1.data.lastname,username:res1.data.username})
        setuserdetail({email:res1.data.email,firstname:res1.data.firstname,lastname:res1.data.lastname,username:res1.data.username})
     }).catch((err)=>{
         UIdispatch({type:'LOADING',payload:false})
         enqueueSnackbar(err?.response?.data?.message,{variant:'error'})
        //   UIdispatch({type:'SNACKBAR',payload:{type:'error',message:err?.response?.data?.message,status:true}})
       })
   }


  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const ProspectSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('username is required'),
    firstname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First Name is required'), 
    lastname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last Name is required'), 
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  
  });

  

  const formik = useFormik({
    initialValues: userdetail,
    enableReinitialize:true,
    validationSchema: ProspectSchema,
    
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      callplan(values)
}
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
      <>
    <FormikProvider value={formik} enableReinitialize={true} initialValues={userdetail}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
  
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <TextField
              fullWidth
              label="Username"
              {...getFieldProps('username')}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

          

          
  <TextField
            fullWidth
            label="First Name"
            {...getFieldProps('firstname')}
            error={Boolean(touched.firstname && errors.firstname)}
            helperText={touched.firstname && errors.firstname}
          />
          <TextField
              fullWidth
              label="Last Name"
              {...getFieldProps('lastname')}
              error={Boolean(touched.lastname && errors.lastname)}
              helperText={touched.lastname && errors.lastname}
            />
           
          </Stack>
        

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            inputProps={
              { readOnly: true, }
            }
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
