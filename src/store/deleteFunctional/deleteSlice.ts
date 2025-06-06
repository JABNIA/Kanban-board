import { createSlice } from "@reduxjs/toolkit";


interface deleteSegmentInterface {
    deleteTask: boolean,
    deleteBoard: boolean,
}



const initialState: deleteSegmentInterface = {
    deleteTask: false,
    deleteBoard: false,
}


const deleteSegment = createSlice({
    name: "delete segment",
    initialState,
    reducers: {
        deleteTaskModalOpen: (state) => {
            state.deleteTask = true;
        },
        deleteTaskModalClosed: (state) => {
            state.deleteTask = false;
        },
        deleteBoardModalOpen: (state) => {
            state.deleteBoard = true;
        },
        deleteBoardModalClosed: (state) => {
            state.deleteBoard = false;
        },
    }
})

export const {deleteTaskModalOpen, deleteTaskModalClosed, deleteBoardModalOpen, deleteBoardModalClosed} = deleteSegment.actions;


export default deleteSegment.reducer;