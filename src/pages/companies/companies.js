import React, { useContext, useEffect, useState } from 'react'
import Table from '../../components/Tabels/tabel'
import {companyHeadCells} from '../../components/Tabels/tabeldata'
import {Box} from '@mui/material'
import axios from '../../utils/axios'
import LoadingScreen from '../../components/Apiloading'
import LogoOnlyLayout from 'src/layouts/LogoOnlyLayout'
import useAuth from 'src/hooks/useAuth'
import useUI from 'src/hooks/useUI'
import CompanyDialogs from './companiesdilog'
function Orders() {


  const {UIdispatch}=useUI()
  const [finalres,setfinalres]=useState([])
  const {gettoken}=useAuth()
      useEffect(() => {
          UIdispatch({type:'LOADING',payload:true})
          const fire= async()=>{
              
               gettoken().then(async(token)=>{
                  await axios({
                      method:'GET',
                     url:'/companies',
                     headers:{
                            'Authorization':`Bearer ${token}`,
                            'Content-Type':"application/json"
                        }}).then((res)=>{
                           
                          const final=[]
                       //  let options = { year: 'numeric', month: 'long', day: 'numeric' };
                          let ff
                        res.data.map((item,index)=>{
                             ff={
                                 ID:index,
                              companyId:item.id,
                              companyName:item.CompanyName,
                             
                              domain:item.domainName,
                              adminemail:item.CompanyEmail,
                              setupDate:item.setupDate,
                              companyStatus:item.status?"ACTIVE":"INACTIVE",
                              companyurl:item.companyURL,
  
                              
                              action:<CompanyDialogs href={`/manageCompany`} id={item.id} 
                              title={item.CompanyName}
                               domain={item.domainName}
                               email={item.CompanyEmail}
                               setupdate={item.setupDate}
                               status={item.status}
                               url={item.companyURL}
                               />
                                 }
                             
                         final.push(ff)
                         
                             })
                         setfinalres(final)
                      UIdispatch({type:'LOADING',payload:false})
                     
                    })
                    .catch((error)=>{
                        UIdispatch({type:'LOADING',payload:false})
                        UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error.message,state:true}})
                    }
                    )
                 })
              }     
          fire()
          },[] )


    return (
      <>
       
        <LoadingScreen />
       
       <Box>
        <LogoOnlyLayout/>
            <Box p={4}>
            
                <Box>
               
            <Table rows={finalres} headCells={companyHeadCells}/>
            </Box>
            </Box>
        </Box>

        </>
    )
}
export default Orders