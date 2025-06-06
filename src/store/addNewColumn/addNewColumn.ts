import { createSlice } from "@reduxjs/toolkit"

interface newColumnInterface {
    isModalOpen: boolean
}

const initialState: newColumnInterface ={
    isModalOpen: false,
}

const newColumnSlice = createSlice({
    name: "New Column",
    initialState,
    reducers: {
        NewColumnModalOpen: (state) => {
            state.isModalOpen = true;
        },
        NewColumnModalClosed: (state) => {
            state.isModalOpen = false;
        }

    }
})


export const { NewColumnModalOpen, NewColumnModalClosed } = newColumnSlice.actions;

export default newColumnSlice.reducer;