import { configureStore } from "@reduxjs/toolkit";
import toogleReducer from "./Toogle/ToogleSlice";
import darkModeSwitch from "./darkmode/DarkMode";
import data from "./FetchData/FetchData";
import selectBoardSlice from "./SelectBoard/SelectBoard"
import detailsSlice from "./details/detailsSlice";
import TableSlice from "./Table/TableSlice";
import newBoard from "./addNewBoard/addNewBoardSlice";
import newTask from "./addNewTask/addNewTaskSlisce";


export const store = configureStore({
    reducer: { 
       toogleMenu: toogleReducer,
       switchMode: darkModeSwitch,
       boardName: selectBoardSlice,
       Table: TableSlice,
       Boards: data,
       taskDetailsModal: detailsSlice,
       NewBoard: newBoard,
       AddNewTask: newTask,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
