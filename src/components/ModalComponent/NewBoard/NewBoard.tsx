import { useState } from 'react'
import { NewBoardWrapper } from './NewBoard-styled'
import { addNewBoard } from '../../../store/FetchData/FetchData';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/Store';
import { AddBoard } from '../../../store/addNewBoard/addNewBoardSlice';
import { Column } from "../../../types"; 


function NewBoardComponent() {
    const dispatch = useDispatch<AppDispatch>()
    const boards = useSelector((state: RootState) => state.Boards.boards)
    const [boardName, setBoardName] = useState<string>("");
    const [columns, setColumns] = useState<Column[]>([
        {
            id: "",
            name: "",
            taskIds: []
        }
    ]
    )

    const handleAddNewColumn = () => {
        setColumns(prev => [...prev, {id: "", name: "", taskIds: []}])
    }

    const handleColumnNameChange = (name:string, columnIndex:number) => {
        setColumns(
            columns.map((column, index) => {
                if(index === columnIndex){
                    return {...column, name: name}
                }
                return column
            })
        )
    }

    const handleCreateNewBoard = () => {
        let checker = true;
        boards.forEach(board => {
            if(board.name === boardName){
                checker = false
            }
        })
        if (checker){
            dispatch(AddBoard())
            dispatch(addNewBoard({name: boardName, columns: columns}))
        }
    }

    const handleDeleteColumn = (columnIndex:number) => {
        const updated = columns.filter(((column, index) => {
            return columnIndex !== index
        }))
        setColumns(updated)
    }

  return (
    <NewBoardWrapper>
        <p className="header">Add New Board</p>
        <p className="input-name-label">Name</p>
        <input type="text" className="board-name" value={boardName} onChange={(e)=> setBoardName(e.target.value)}/>
        <div className="column-names-inputs">
            <p className="input-name-label">Columns</p>
            {
                columns.map((column, index) => {
                    return(
                        <div className='input-wrapper'>
                            <input className="column-name"type="text" value={columns[index].name} onChange={(e) => handleColumnNameChange(e.target.value, index)}/>
                            <img 
                            className="cross" 
                            src="./src/assets/icons/icon-cross.svg" 
                            alt="delete column name input" 
                            onClick={() => handleDeleteColumn(index)}
                            />
                        </div>
                    )
                })
            }
        </div>

        <button className='new-column' onClick={handleAddNewColumn}>+ Add New Column</button>
        <button className='new-board' onClick={handleCreateNewBoard}>Create New Board</button>
    </NewBoardWrapper>
  )
}

export default NewBoardComponent
