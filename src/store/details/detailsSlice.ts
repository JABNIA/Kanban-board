import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types";
type taskDetailType = {
    task: Task,
    taskId: string,
    detailsOpen: boolean
}

const initialState: taskDetailType = {
    task: {
        id: "",
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
    taskId: "",
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