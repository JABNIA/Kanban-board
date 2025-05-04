import { createSlice } from "@reduxjs/toolkit"
import { Board } from "../FetchData/FetchData"



const initialState: Board = {name: "", columns: [], id: ""};
    

export const TableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        setBoard: (state, action) => {
            state.name = action.payload.name;
            state.columns = action.payload.columns;
            state.id = action.payload.id;
        }
    }})

export const { setBoard } = TableSlice.actions

export default TableSlice.reducer