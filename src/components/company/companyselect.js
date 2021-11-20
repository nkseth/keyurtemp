/* eslint-disable react-hooks/exhaustive-deps */
import {  Fab, FormControl, InputLabel, MenuItem, Select, Tooltip,Box } from '@mui/material'

import React,{useContext, useState,useEffect} from 'react'
import { CompanyContext } from '../../ourlogic/Context/companycontext'

import AddIcon from '@mui/icons-material/Add';
const Companyselect=(props)=>{
const {cstate,callcompanytoken}=useContext(CompanyContext)
const [company,setcompany]=useState([])
useEffect(() => {
  
const newdata=[]
   cstate.map((item,index)=>{
          if(item.status) newdata.push({label:item.CompanyName,value:item.id})
        })
        setcompany(newdata)
  }, [cstate])


  useEffect(()=>{
    callcompanytoken()
  },[])
return(
    <Box p={2} style={{display:'flex',width:'fit-content'}}>
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Select company</InputLabel>
   
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
        style={{minWidth:'250px',maxWidth:'95vw', width:'100%',boxShadow:'0px  0 5px lightblue'}}
        defaultValue=""
        value={props.value}
      label="Select company"
      onChange={props.onchange}
    >
    
{company.map((item,index)=>{
    return <MenuItem value={item.value}>{item.label}</MenuItem>
})}
     
    </Select>
    
  </FormControl>
  <Box ml={2}>
  <Tooltip  title="Add New Company" >
      
  <Fab color="primary" aria-label="ADD NEW COMPANY" label onClick={()=>{props.history.push('/createCompany')}}>
        <AddIcon />
      </Fab>
      </Tooltip>
  </Box>
    </Box>
)
}
export default Companyselect