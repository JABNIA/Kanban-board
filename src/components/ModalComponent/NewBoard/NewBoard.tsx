import { useState } from 'react'
import { NewBoardWrapper } from './NewBoard-styled'
import { addNewBoard, setColumns } from '../../../store/FetchData/FetchData';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { Column } from '../../../types';
import { closeNewBoardModal } from '../../../store/addNewBoard/addNewBoardSlice';


function NewBoardComponent() {
    const dispatch = useDispatch<AppDispatch>();
    const darkMode = useSelector((state: RootState) => state.switchMode.darkMode )
    const boards = useSelector((state: RootState) => state.Boards.boards);
    const [boardName, setBoardName] = useState<string>("");
    const [columns, setBoardColumns] = useState<string[]>([""]);
    const globalColumns = useSelector((state: RootState) => state.Boards.columns)


    const handleAddColumn = () => {
        setBoardColumns(prev => [...prev, ""])
    }

    const handleDeleteColumn = (deletingIndex: number) => {
        const updatedColumn = columns.filter((col, index) => deletingIndex !== index )

        setBoardColumns(updatedColumn)
    }

    const handleSetColumnName = (name:string, index:number) => {
        const input = name;

        setBoardColumns(prev => prev.map((columnName, columnIndex) => {
            if(index === columnIndex){
                return input;
            }
                return columnName;
        }))
    }

    const handleCreateNewBoard = () => {
        const boardId = generateIdForBoard();
        const newBoard = {
            id: boardId,
            name: boardName,
            columnIds: columns.map(colName => `col-${colName}-${boardId}`),
        };

        const createNewcolumns = () => {
            const newColumns:Column[] = columns.map( columnName => {
                return {
                    id: `col-${columnName}-${newBoard.id}`,
                    name: columnName,
                    taskIds: [],
                }
            }
           )
           return newColumns;
        };

            const newColumns = createNewcolumns();
        
        dispatch(addNewBoard([...boards, newBoard]));
        dispatch(setColumns([...globalColumns, ...newColumns]));
        dispatch(closeNewBoardModal())
    }
    
  return (
    <NewBoardWrapper darkMode={darkMode}>
        <p className="header">Add New Board</p>
        <p className="input-name-label">Name</p>
        <input type="text" className="board-name" value={boardName} onChange={(e)=> setBoardName(e.target.value)}/>
        <div className="column-names-inputs">
            <p className="input-name-label">Columns</p>
            {
                columns.map((column, index) => {
                    return(
                        <div className='input-wrapper'>
                            <input className="column-name"type="text" value={column} onChange={(event) => handleSetColumnName(event.target.value, index)}/>
                            <img 
                            className = "cross" 
                            src = "./src/assets/icons/icon-cross.svg" 
                            alt = "delete column name input" 
                            onClick = {() => handleDeleteColumn(index)}
                            />
                        </div>
                    )
                })
            }
        </div>

        <button className='new-column' onClick={handleAddColumn}>+ Add New Column</button>
        <button className='new-board' onClick={handleCreateNewBoard} >Create New Board</button>
    </NewBoardWrapper>
  )
}


export default NewBoardComponent;


const generateIdForBoard = () => {
    const chars = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
    'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', 
    '4', '5', '6', '7', '8', '9'
    ];
    let id = '';
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        id += chars[randomIndex];
    }
    return id;
}