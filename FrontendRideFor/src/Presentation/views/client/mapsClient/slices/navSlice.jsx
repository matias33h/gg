import {createSlice} from '@reduxjs/toolkit'

// este es un sector de informacion que luego lo voy a mostrar en el mapa o en alguna parte  de las navegaciones 
// voy a esteblecer otigen y destino , informacion sobre el tiempo de viaje  

const initialState={
     origin: null,
     destination: null,
    //  tiempo en que el cliente va a llegar a destino 
     travelTimeInformation:null,
}


// sirve para exportar la informacion 
export const navSlice = createSlice({
    name:'nav',
    initialState,
    reducer:{
        setOrigin:(state,action)=>{
            state.origin= action.payload
        },
        setDestination:(state,action)=>{
            state.destination= action.payload
        },
        setTravelTimeInformation:(state,action)=>{
            state.travelTimeInformation= action.payload
        },
    },
})

export const {setOrigin,setDestination,setTravelTimeInformation}=navSlice.actions;

// selector para cada estado inicial 

export const selectOrigin=(state)=>state.nav.origin;
export const selectDestination=(state)=>state.nav.destination;
export const selectTravelTimeInformation=(state)=>state.nav.TravelTimeInformation;


export default navSlice.reducer
