import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import { Stack, TextField, Alert,Typography, Button,Card ,CardContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';
import axiosInstance from "../../../utils/axios";
import ProspectFormCount from "./ProspectFormCount";
import {useState} from "react";
import Prospect from "../../../pages/authentication/Prospect";
import {SeoIllustration} from "../../../assets";
import { styled } from '@mui/material/styles';
import useEffect from "../../../hooks/useEffect";

// ----------------------------------------------------------------------

export default function ProspectForm() {
  const { prospect } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const ProspectSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: ''
    },
    validationSchema: ProspectSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await axiosInstance({
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          url: '/prospects',
          data: JSON.stringify({
            firstname:  values.firstName,
            lastname: values.lastName,
            email: values.email
          })
        }).then(async (response) => {

               })
        enqueueSnackbar('',{
          variant:'success',
          action: (key) => (
         <ProspectFormCount/>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
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
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Try Now
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>


  );
}
