export const initialState = {
    loading:false,
    snackbar:{type:"",message:"",status:false}
}
   

export const reducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
          return {...state,loading:action.payload }   
        case "SNACKBAR":
           return {...state,snackbar:action.payload}
           case "SNACKBARCLOSE":
            return {...state,snackbar:{...state.snackbar,...action.payload}}  
        default:
            return state
    }
}