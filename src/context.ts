import React, { createContext } from "react";
import { useContext } from "react";
import { Board } from "./types";


interface BoardContextType {
    activeBoard: Board;
    setActiveBoard: React.Dispatch<React.SetStateAction<Board>>;
  }
  
  export const boardContext = createContext<BoardContextType | undefined>(undefined);

function useBoardContext() {
    const context = useContext(boardContext);
    if (context === undefined) {
        throw new Error("useBoardContext must be used within a BoardProvider");
    }
    return context;
}


export default useBoardContext;