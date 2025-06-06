import { createSlice } from "@reduxjs/toolkit"

interface ModalInterface {
    isOpen: boolean
}


const initialState: ModalInterface  = {
    isOpen: false
}

const Modal= createSlice({
    name: "Modal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false; 
        }
    }
})


export const { openModal, closeModal } = Modal.actions; 

export default Modal.reducer