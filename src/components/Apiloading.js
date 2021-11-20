import React from 'react'
import LoadingScreen from './LoadingScreen2'
import useUI from 'src/hooks/useUI'
const Loading=({open})=>{
 const {UIstate}=useUI()
    return(
        <>
        {
        UIstate.loading?<LoadingScreen/>:null
        }
        </>
    )
}
export default Loading
