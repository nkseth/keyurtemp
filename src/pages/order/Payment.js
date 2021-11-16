import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Grid, Container, Typography, useMediaQuery } from '@mui/material';
// utils
import fakeRequest from '../../utils/fakeRequest';
// components
import Page from '../../components/Page';
import  PaymentSummary from './PaymentSummary'
import PaymentMethods from './PaymentMethods'
import LogoOnlyLayout from 'src/layouts/LogoOnlyLayout';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  maxHeight: '90%',
 
}));

// ----------------------------------------------------------------------

export default function Payment(props) {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  const PaymentSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    address: Yup.string().required('Address is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      subscription: 'premium',
      isMonthly: false,
      method: 'paypal',
      card: 'mastercard',
      newCardName: '',
      newCardNumber: '',
      newCardExpired: '',
      newCardCvv: ''
    },
    validationSchema: PaymentSchema,
    onSubmit: async (values, { resetForm }) => {
      const submitData = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        address: values.address,
        subscription: 'premium'
      };
      await fakeRequest(500);
      if (values.method === 'paypal') {
        alert(
          JSON.stringify(
            {
              ...submitData,
              method: values.method
            },
            null,
            2
          )
        );
      } else if (values.method !== 'paypal' && !values.newCardName) {
        alert(
          JSON.stringify(
            {
              ...submitData,
              method: values.method,
              card: values.card
            },
            null,
            2
          )
        );
      }
      if (values.newCardName) {
        alert(
          JSON.stringify(
            {
              ...submitData,
              method: values.method,
              newCardName: values.newCardName,
              newCardNumber: values.newCardNumber,
              newCardExpired: values.newCardExpired,
              newCardCvv: values.newCardCvv
            },
            null,
            2
          )
        );
      }
      resetForm();
      enqueueSnackbar('Payment success', { variant: 'success' });
    }
  });

  return (
    <>
    <RootStyle title="Payment | Minimal-UI">
      <Container >
        <Card>
          <FormikProvider value={formik}>
          
              <Grid container spacing={upMd ? 5 : 2} style={{paddingLeft:'10px'}}>
                {/* <Grid item xs={12} md={4}>
                  <PaymentBillingAddress formik={formik} />
                </Grid> */}
                <Grid item xs={12} md={8}>
                  {console.log(props.data)}
                  <PaymentMethods formik={formik} data={props.data} date={props.date} id={props.id}/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <PaymentSummary formik={formik} closed={props.closed} total={props.total} />
                </Grid>
              </Grid>
          
          </FormikProvider>
        </Card>
      </Container>
    </RootStyle>
    </>
  );
}
