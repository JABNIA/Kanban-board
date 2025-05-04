import { createSlice } from "@reduxjs/toolkit"

interface newTaskType {
    addNewTask: boolean
}
const initialState: newTaskType = {
    addNewTask: false,
}

const addNewTask = createSlice({
    name: "Add New Task",
    initialState,
    reducers: {
        newTaskModalOpen: (state) => {state.addNewTask = true},
        newTaskModalClose: (state) => {state.addNewTask = false},
    }
})


export const {newTaskModalOpen, newTaskModalClose} = addNewTask.actions;


export default addNewTask.reducer;