import { createSlice } from "@reduxjs/toolkit"
import { Column } from "../FetchData/FetchData"
import { useSelector } from "react-redux";
import { RootState } from "../Store";

interface Board {
    name: string,
    columns: Column[]
}

const columns = useSelector((state: RootState) => state.Boards.boards.filter(board => board.name === state.boardName.boardName)[0]);

const initialState:Board = {
    name: columns.name,
    columns: columns.columns
}

export const updateBoardSlice = createSlice({
    name: "updateBoard",
    initialState,
    reducers: {
        setBoard: (state, action) => {
            state = action.payload
        }
    }})


export default updateBoardSlice.reducer