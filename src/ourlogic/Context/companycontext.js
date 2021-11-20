/* eslint-disable react-hooks/exhaustive-deps */

import React, { createContext, useReducer ,useEffect,useContext, useState} from 'react'
import axiosInstance from '../../utils/axios'
import { reducer, initialState } from './companyreducer'
import useAuth from '../../hooks/useAuth'



export const CompanyContext = createContext()


 const CompanyContextProvider = ({ children }) => {
    
    const {gettoken,user}=useAuth()
    const [cartid]=useState(null)
 
    const [cstate, cdispatch] =
        useReducer(reducer, initialState)
       
        const callcompanytoken=async()=>{
           
            if(user)
            { 
                 const  token= await gettoken()
               
                await axiosInstance.get('/companies',{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                }).then((res)=>{
                 
                  
                cdispatch({type:"ADDDATA",payload:res.data?res.data:[]})
                }).catch((error)=>{
                   
                })
            }
            else 
            cdispatch({type:"ADDDATA",payload:[]})
        }



const createcompany=async(newstate)=>{
  
  
    const token=await gettoken()
    
    await axiosInstance({
     method:'POST',
    url:'/companies',
    headers:{
           'Authorization':`Bearer ${token}`,
           'Content-Type':"application/json"
       },
     data:JSON.stringify({...newstate})

  
       }  ).then((res)=>{
        
        cdispatch({type:"ADDITEM",payload:res.data})
  

 
})
.catch((error)=>{
   
    console.error(error)})
}



useEffect(() => {
   
  callcompanytoken()
 console.log("assddadf")
 }, [])

        return (
        <CompanyContext.Provider
            value={{cstate, cdispatch,callcompanytoken,createcompany ,cartid}}>
            {children}
        </CompanyContext.Provider>
    )
}
export default CompanyContextProvider
