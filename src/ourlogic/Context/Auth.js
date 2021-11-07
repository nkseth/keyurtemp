/* eslint-disable react-hooks/exhaustive-deps */
import React,{useContext, useEffect,useState} from "react"
import { Magic } from "magic-sdk";
//import { UIContext } from "./Context/UIcontextapi";
import {useNavigate} from 'react-router'
import { OAuthExtension } from '@magic-ext/oauth';

export const AuthContext= React.createContext();

const AuthProvider =({children})=>{
    const history=useNavigate()
   // const {UIdispatch}=useContext(UIContext)
const [currentUser,setCurrentUser]= useState(null);

const magic= new Magic(process.env.REACT_APP_MAGIC_PUBLIC_KEY)
const magicoauth= new Magic(process.env.REACT_APP_MAGIC_PUBLIC_KEY,{
    extensions: [new OAuthExtension()]})



const checkuser= async()=>{
   // UIdispatch({type:'LOADING',payload:true})
 return  await magic.user.isLoggedIn().then(async(isLoggedIn)=>{
    
    if(isLoggedIn){

               return  await magic.user.getMetadata().then((userdata)=>{
                    setCurrentUser(userdata)
                   
                 //  UIdispatch({type:'LOADING',payload:false})
                    return true
                 })
             }else {
               
                setCurrentUser(null)
            return false
            }

        }).catch((error)=>{
         //   UIdispatch({type:'LOADING',payload:false})
         //   UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error.message}})
        })


       
      
}

const onlogin= async(email)=>{
     
    await magic.auth.loginWithMagicLink({email}).then((res)=>{
   
    if(res)
     history('/marketplace')

    })
    .catch((err)=>{
      
    })
 
    
 }

 const Oauthlogin=async(provider)=>{

    await magicoauth.oauth.loginWithRedirect({
        provider: provider,
        redirectURI: `https://${process.env.REACT_APP_DOMAIN_NAME}/login`,
        scope: ['user:email'] /* optional */,
      });
       await magicoauth.oauth.getRedirectResult().then((res)=>{

      
       if(res)
        history('/marketplace')
   
       })
       .catch((err)=>{
        
       })
      
      
 
    }

const gettoken=async()=>{
    let resi=""
    
    if(currentUser){
        await magic.user.getIdToken().then((res)=>{
           resi=res
        }).catch((error)=>{
            
          //  UIdispatch({type:'SNACKBAR',payload:{type:'error',message:error.message,status:true}})
        })  
      
    }
    return resi
}

useEffect(()=>{
    
   
 checkuser()

},[]);

return(
    <AuthContext.Provider
    value={{currentUser,checkuser,gettoken,onlogin,Oauthlogin}}
>
    {children}
</AuthContext.Provider>
    )
}
export default AuthProvider