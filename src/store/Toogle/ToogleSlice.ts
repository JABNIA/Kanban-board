import { createSlice } from "@reduxjs/toolkit"

interface ToogleState {
    open: boolean,
    firstLoad: boolean
}

const initialState:ToogleState = {
    open: false,
    firstLoad: true
} 

const toogleSlice = createSlice({
    name: "Toogle",
    initialState,
    reducers: {
        toogle: (state, action) => {
            state.open = action.payload 
            state.firstLoad = false
        }
    }
})


export const { toogle } = toogleSlice.actions

export default toogleSlice.reducer;