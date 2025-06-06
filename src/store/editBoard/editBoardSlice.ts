import { createSlice } from "@reduxjs/toolkit";


interface editBoardInterface {
    editBoardModal :boolean,
}


const initialState: editBoardInterface = {
    editBoardModal: false,
}


const editBoardMoadalSlice = createSlice({
    name: "edit board",
    initialState,
    reducers: {
        editBoardModalOpen: (state) => {
            state.editBoardModal = true
        },
        editBoardModalClose: (state) => {
            state.editBoardModal = false
        }
    }
})

export const { editBoardModalOpen, editBoardModalClose } = editBoardMoadalSlice.actions;

export default editBoardMoadalSlice.reducer