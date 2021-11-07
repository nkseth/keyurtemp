import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import { Stack, TextField, Alert,Typography, Button,Card ,CardContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
//

import axiosInstance from "../../utils/axios";
import {useContext, useRef, useState} from "react";
import {CompanyContext} from '../../ourlogic/Context/companycontext';
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

  

  const formik = useFormik({
    initialValues: {
      companyName: '',
      domainName: '',
      companyurl: '',
      email: '',
      steupDate:""
    },
    validationSchema: ProspectSchema,
    
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      
      createcompany({
        CompanyEmail: values.email,
        CompanyName: values.companyName,
        companyURL: values.companyurl,
        
        domainName:values.domainName,
        setupDate:values.steupDate,
        status:true
    })
  }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  
  
 

 const cref=useRef()

  return (
      <>
      <LogoOnlyLayout/>
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
  
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

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
            Create Now
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>

</>
  );
}
