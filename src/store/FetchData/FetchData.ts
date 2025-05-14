import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Board, Column, Data, Task } from "../../types";

interface dataState {
    boards: Board[],
    columns: Column[],
    tasks: Task[],
    status: string
}


const initialState: dataState = {
    boards: [],
    columns: [],
    tasks: [],
    status:"idle"
}

export const data = createSlice({
    name: "BoardData",
    initialState,
    reducers: {
        addNewBoard: (state, action) => {
            state.boards = action.payload.boards
            state.columns = action.payload.columns
            state.tasks = action.payload.tasks
        },
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        setColumns: (state, action) => {
            state.columns = action.payload
        }
            },
        extraReducers: (builder) => {
            builder.addCase(fetchBoardData.pending, (state) => {
                state.status = "idle"
            }).addCase(fetchBoardData.fulfilled, (state: dataState, action: PayloadAction<Data>) => {
                state.status = "succseeded";
                state.boards = action.payload.boards;
                state.columns = action.payload.columns;
                state.tasks = action.payload.tasks;
            });
        }
        });

export const status = (state: dataState) => state.status; 


export const fetchBoardData = createAsyncThunk(
    "fetchBoardData",
    async () => {
        const boardsData = await axios.get("http://localhost:3000/boards").then(response => response.data)
        const columnsData = await axios.get("http://localhost:3000/columns").then(response => response.data)
        const tasksData = await axios.get("http://localhost:3000/tasks").then(response => response.data)


        return {boards: boardsData, columns: columnsData, tasks: tasksData};
    }
)

export const { addNewBoard, setTasks, setColumns } = data.actions

export default data.reducer;

