/* eslint-disable react-hooks/exhaustive-deps */

import React, { createContext, useReducer } from 'react'

import { reducer, initialState } from './UIreducer'



export const UIContext = createContext()

 const UIContextProvider=({children})=>{

    const [UIstate, UIdispatch] =
    useReducer(reducer, initialState)
    return (
        <UIContext.Provider
            value={{UIstate, UIdispatch}}>
            {children}
        </UIContext.Provider>
    )
 }      
       
export default UIContextProvider;
