/* eslint-disable array-callback-return */

import React, { createContext, useReducer ,useContext, useState, useEffect, } from 'react'
import axiosInstance from '../../utils/axios'
import { reducer, initialState } from './cartreducer'
import useAuth from '../../hooks/useAuth'
export const CartContext = createContext()


 const CartContextProvider = ({ children }) => {
    const {gettoken,user}=useAuth()
    const [cartid,setcartid]=useState(null)
 
    const [state, dispatch] =
        useReducer(reducer, initialState)
       
        const callcarttoken=async()=>{
           
            if(user){
                
                const token= await gettoken()

                await axiosInstance.get('/usercarts',{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                }).then((res)=>{

                   
                    setcartid(res.data[0]?.id)
                dispatch({type:"ADDDATA",
                payload:res.data[0]?.plans || res.data[0]?.addons
                ?[...res.data[0].plans,...res.data[0].addons]:[]})
               
            })
     .catch((error)=>{
       
    })
            }
            else {
                dispatch({type:"ADDDATA",payload:[]})
               
               
            }
            
        }



const createcart=async(newstate)=>{
    if(user){
      
        const token=gettoken()
        
        const plaid=[]
        const addonid=[]
        newstate.map((item)=>{
            if(item.type==="subscription")
            {
                plaid.push(item?.id)
            }
            else if(item.type==="addon")
            {
                addonid.push(item?.id)
            }
         
        })
        
       await axiosInstance({
         method:'POST',
        url:'/usercarts',
        headers:{
               'Authorization':`Bearer ${token}`,
               'Content-Type':"application/json"
           },
         data:JSON.stringify({plans:plaid,addons:addonid})
    
      
           }  ).then((res)=>{
          setcartid(res.data.id)
         
     
    })
    .catch((error)=>{
      
       // UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error?.message,state:true}})
    }
    )
    }
   
}

const updatecart=async(newstate)=>{
    if(user){

    
    const plaid=[]
    const addonid=[]
    newstate.map((item)=>{
        if(item.type==="subscription")
        {
            plaid.push(item?.id)
        }
        else if(item.type==="addon")
        {
            addonid.push(item?.id)
        }
     
    })
    const token=await gettoken()
   
   await axiosInstance({
    method:'PUT',
    url:`/usercarts/${cartid}`,
    headers:{
           'Authorization':`Bearer ${token}`,
           'Content-Type':"application/json"
       },
     data:JSON.stringify({plans:plaid,addons:addonid})
    
   }).then((res)=>{
   
       
  
})
.catch((error)=>{
    console.error(error)

})
    }
   
}

const Emptycart=async()=>{
    dispatch({type:"ADDDATA",payload:[]})
    if(user){

  
    const token=await gettoken()
   
   await axiosInstance({
    method:'PUT',
    url:`/usercarts/${cartid}`,
    headers:{
           'Authorization':`Bearer ${token}`,
           'Content-Type':"application/json"
       },
     data:JSON.stringify({plans:null,addons:null})
    
   }).then((res)=>{
   
       
  
})
.catch((error)=>{
    console.error(error)
  
})
    }
   
}

useEffect(()=>{
    if(user) callcarttoken()
    
},[user])


        return (
        <CartContext.Provider
            value={{ state, dispatch,callcarttoken,updatecart,createcart ,cartid,Emptycart}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartContextProvider
