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
import Payment from './Payment';
import useUI from '../../hooks/useUI'
import LoadingScreen from 'src/components/LoadingScreen2';

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

const {UIdispatch}=useUI()
const {gettoken}=useAuth()
const [total,settotal]=React.useState(0)
const [finalres,setfinalres]=React.useState([])
const [res,setres]=React.useState("")


const handleClickOpen = () => {
    fire()
   
   
  };
  const handleClose = () => {
      
    setOpen(false);
  };
  
 
 

    
   
    const fire= async()=>{
        UIdispatch({type:'LOADING',payload:true})
         gettoken().then(async(token)=>{
            await axios({
                method:'GET',
               url:`/orders/${props.id}`,
               headers:{
                      'Authorization':`Bearer ${token}`,
                      'Content-Type':"application/json"
                  }}).then((res)=>{
                     
                      let papi= new Date(res?.data?.createdAt).toLocaleDateString('en-US');
                  
                    setres(papi)
                    const final=[]
                    
            const  item=res.data
                    final.push(item.plan)
                    item.addons.map((itema)=>{
                        final.push(itema)
                    })  
                  
                    setfinalres(final)
                   
                   settotal(item.total)
               UIdispatch({type:'LOADING',payload:false})
                setOpen(true);
              })
              .catch((error)=>{
              UIdispatch({type:'LOADING',payload:false})
//UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error.message,state:true}})
                  setOpen(false);
                }
              )
           })
        }     
   


const classes=useStyles()

  return (
      <>
    <div>
      
      <Button variant="outlined" style={{borderRadius:'20px'}} onClick={handleClickOpen}>
       View Invoice
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      maxWidth="xl"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
         INVOICE
        </BootstrapDialogTitle>
        <DialogContent dividers>
            {console.log(finalres)}
       <Payment closed={handleClose} total={total} data={finalres} date={res} id={props.id}/>
        </DialogContent>

      
      </BootstrapDialog>
    </div>
    </>
  );
}
export default InvoiceDialogs