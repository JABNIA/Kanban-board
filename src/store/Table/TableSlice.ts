import { createSlice } from "@reduxjs/toolkit"
import { Board } from "../../types"



const initialState: Board = {name: "", columnIds: [], id: ""};
    

export const TableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        setBoard: (state, action) => {
            state.name = action.payload.name;
            state.columnIds = action.payload.columnIds;
            state.id = action.payload.id;
        }
    }})

export const { setBoard } = TableSlice.actions

export default TableSlice.reducer