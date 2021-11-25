import React, { useContext, useEffect, useState } from 'react'
import Table from '../../components/Tabels/tabel'
import {subHeadCells} from '../../components/Tabels/tabeldata'
import {Box} from '@mui/material'
import axios from '../../utils/axios'
import LoadingScreen from '../../components/Apiloading'
import LogoOnlyLayout from 'src/layouts/LogoOnlyLayout'
import useAuth from 'src/hooks/useAuth'
import useUI from 'src/hooks/useUI'

function Orders() {


    const {UIdispatch}=useUI()
    const {gettoken}=useAuth()
    const [activeaddon,setactiveaddons]=useState([])
    const [activeplan,setactiveplan]=useState([])
   const [finalarry,setfinalaary]=useState([])
    const fire= async()=>{
        UIdispatch({type:'LOADING',payload:true})
         gettoken().then(async(token)=>{
          
                    await axios({
                        method:'GET',
                       url:`/activeadons`,
                       headers:{
                              'Authorization':`Bearer ${token}`,
                              'Content-Type':"application/json"
                          }}).then(async(resa)=>{
                            setactiveaddons(resa.data)
                            
                            await axios({
                                method:'GET',
                               url:`/activeplans`,
                               headers:{
                                      'Authorization':`Bearer ${token}`,
                                      'Content-Type':"application/json"
                                  }}).then(async(resffff)=>{
                                    
                                      setactiveplan(resffff?.data)
                                     
                                      UIdispatch({type:'LOADING',payload:false})
                                    
                                   })
                          })
               
              }).catch((error)=>{
                  UIdispatch({type:'LOADING',payload:false})
                  UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error.message,state:true}})
                }
              )
        }     
   useEffect(() => {
       fire()
   },[])

   useEffect(() => {

 
       let paa=[]
       activeplan.map((item,index)=>{
        let p={
            ID:index,
        subName:item?.plan?.title,
        companyname:item?.company?.CompanyName,
        startDate:item?.startdate,
        endDate:item?.enddate,
        renewDate:item?.enddate,
        subStatus:item?.status?'Active':'Inactive',
       
        }
    paa.push(p)
       })
     
       activeaddon.map((item,index)=>{
        let p={
            ID:index+activeplan?.length,
        subName:item?.addon?.title,
        companyname:item?.company?.CompanyName,
        startDate:item?.startdate,
        endDate:item?.enddate,
        renewDate:item?.enddate,
        subStatus:item?.status?'Active':'Inactive',
       
        }
    paa.push(p)
       })
      
     
    setfinalaary(paa)
},[activeaddon,activeplan])


    return (
      <>
       
        <LoadingScreen />
       
       <Box >
        <LogoOnlyLayout/>
            <Box p={4}>
            
                <Box>
               
            <Table rows={finalarry} headCells={subHeadCells}/>
            </Box>
            </Box>
        </Box>

        </>
    )
}
export default Orders