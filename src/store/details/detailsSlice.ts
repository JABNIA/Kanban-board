import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../FetchData/FetchData";



type taskDetailType = {
    task: Task,
    detailsOpen: boolean
}

const initialState: taskDetailType = {
    task: {
        title: "",
        description: "",
        status: "",
        subtasks: [
          {
            title: "",
            isCompleted: true
          }
        ]
      },
    detailsOpen: false,
}


const detailsSlice = createSlice({
    name: "details",
    initialState,
    reducers: {
       open: (state) => {
        state.detailsOpen = true;
       },
       close: (state) => {
        state.detailsOpen = false;
       },
       setTask: (state, action) => {
        state.task = action.payload;
       },
       updateTask: (state, action) => {
            state.task = {...state.task, status: action.payload}; 
      },
      edit:(state, action) => {
        state.task = action.payload
      }
}})

export const { open, close, setTask, updateTask, edit } = detailsSlice.actions;

export default detailsSlice.reducer