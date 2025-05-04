import { createSlice } from "@reduxjs/toolkit";

interface newBoardInterface {
    addNewBoard: boolean
}

const initialState: newBoardInterface = {
    addNewBoard: false
}

const newBoard = createSlice({
    name: "New board",
    initialState,
    reducers: {
        AddBoard: (state) =>
        {
            state.addNewBoard = true;
        },
        closeNewBoardModal: (state) => {
            state.addNewBoard = false;
        }
    }
})


export const { AddBoard, closeNewBoardModal } = newBoard.actions;

export default newBoard.reducer;