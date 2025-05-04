import { createSlice } from "@reduxjs/toolkit";

interface darkModeState {
    darkMode: boolean
}

const initialState: darkModeState = {
    darkMode: false,
}


const toogleDarkMode = createSlice({
    name: "switch",
    initialState,
    reducers:{
        toogleSwitch: (state, action) => {
            state.darkMode = action.payload
        }
    }
 })


export const { toogleSwitch } = toogleDarkMode.actions


 export default toogleDarkMode.reducer;