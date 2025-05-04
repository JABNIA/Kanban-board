import { createSlice } from "@reduxjs/toolkit"

interface SelectedBoard {
    boardName: string,
}

const initialState: SelectedBoard = {
    boardName: "Platform Launch", 
}


const selectBoardSlice = createSlice({
    name: "SelectedBoard",
    initialState,
    reducers: {
        setBoardName: (state, action) =>{
            state.boardName = action.payload
        },
    }
})

export const { setBoardName } = selectBoardSlice.actions


export default selectBoardSlice.reducer