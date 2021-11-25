import React, { useContext, useEffect, useState } from 'react'
import Table from '../../components/Tabels/tabel'
import {orderHeadCells} from '../../components/Tabels/tabeldata'
import {Box} from '@mui/material'
import axios from '../../utils/axios'
import LoadingScreen from '../../components/Apiloading'
import InvoiceDialogs from './orderdialog'
import LogoOnlyLayout from 'src/layouts/LogoOnlyLayout'
import useAuth from 'src/hooks/useAuth'
import useUI from 'src/hooks/useUI'

function Orders() {


const [finalres,setfinalres]=useState([])
const {gettoken}=useAuth()
const {UIdispatch}=useUI()
useEffect(() => {
    //    UIdispatch({type:'LOADING',payload:true})
        const fire= async()=>{
          UIdispatch({type:'LOADING',payload:true})
          const token= await gettoken()
         await axios({
                    method:'GET',
                   url:'/orders',
                   headers:{
                          'Authorization':`Bearer ${token}`,
                          'Content-Type':"application/json"
                      }}).then(
                          (res)=>{
                        
                        let options = { year: 'numeric', month: 'long', day: 'numeric' };
                        let final=[]
                        res.data.map((item,index)=>{
                                
                                 final=[{
                                   ID:index,
                                   orderNumber:item?.id,
                                    orderDate: new Date(item.createdAt).toLocaleDateString("en-US",options),
                                    orderCompany:item?.company?.CompanyName,
                                    orderAmount:`AED ${item?.total}`,
                                    orderStatus:item?.status?'completed':'pending',
                                    orderInvoice:  <InvoiceDialogs id={item?.id}/>,
                               },...final]


                     
                    })
                    UIdispatch({type:'LOADING',payload:false}) 
                 setfinalres(final)


                   // UIdispatch({type:'LOADING',payload:false})
                })
                  .catch((error)=>{
                     // UIdispatch({type:'LOADING',payload:false})
                    //  UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error.message,state:true}})
                  }
                  )
            
            }
        
            
        fire()


        },[] )



    return (
      <>
       
        <LoadingScreen />
       
       <Box >
        <LogoOnlyLayout/>
            <Box p={4}>
            
                <Box>
               
            <Table rows={finalres} headCells={orderHeadCells}/>
            </Box>
            </Box>
        </Box>

        </>
    )
}

export default Orders