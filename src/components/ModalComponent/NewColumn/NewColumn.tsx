import { useDispatch, useSelector } from "react-redux";
import { NewColumnWrapper } from "./NewColumn-styled";
import { AppDispatch, RootState } from "../../../store/Store";
import { Column } from "../../../types";
import { useEffect, useState } from "react";
import { addNewBoard, setActiveBoardColumns, setColumns } from "../../../store/FetchData/FetchData";
import { closeNewBoardModal } from "../../../store/addNewBoard/addNewBoardSlice";
import { NewColumnModalClosed } from "../../../store/addNewColumn/addNewColumn";
import { setBoard } from "../../../store/Table/TableSlice";

function NewColumn() {
  const dispatch = useDispatch<AppDispatch>();
  const boards = useSelector((state: RootState) => state.Boards.boards);
  const columns = useSelector((state: RootState) => state.Boards.columns);
  const activeColumns = useSelector((state: RootState) => state.Boards.activeBoardColumns);
  const darkMode = useSelector((state: RootState) => state.switchMode.darkMode);
  const activeBoard = useSelector((state: RootState) => state.Table);
  const [boardColumns, setBoardColumns] = useState<Column[]>([]);

  useEffect(() => {
    const getColumns = columns.filter((column) => {
      return activeBoard.columnIds.includes(column.id);
    });
    setBoardColumns(getColumns);
  }, []);

  const handleChangeColumnName = (
    inputValue: string,
    columnId: string,
    ColumnIndex: number
  ) => {
    const newColumnName = boardColumns.map((column, index) => {
      if (column.id === columnId && index === ColumnIndex) {
        return {
          ...column,
          id: `col-${inputValue.toLocaleLowerCase()}-${activeBoard.id}`,
          name: inputValue,
        };
      }
      return column;
    });

    setBoardColumns(newColumnName);
  };

  const handleAddNewColumn = () => {
    setBoardColumns((prev) => [
      ...prev,
      { id: `col-${""}-${activeBoard.id}`, name: "", taskIds: [] },
    ]);
  };

  const handleDeleteColumn = (columnId: string, columnIndex: number) => {
    const deleteBoard = boardColumns.filter((column, index) => {
      if (column.id === columnId && index === columnIndex) {
        return false;
      }
      return true;
    });
    setBoardColumns(deleteBoard);
  };

  const handleSaveChanges = () => {
    const updatedBoards = boards.map(board => {
        if(board.id === activeBoard.id){
            dispatch(setBoard({...board, columnIds: boardColumns.map(column => column.id)}))
            return {...board, columnIds: boardColumns.map(column => column.id)}
        } 
        return board;
    })

    const unusedColumns = columns.filter(column => {
      let checker = true;
      activeColumns.forEach(col => {
        if(col.id === column.id){
          checker = false;
        }
      })
      return checker
    }) 

    dispatch(addNewBoard(updatedBoards))
    dispatch(setColumns(unusedColumns.concat(boardColumns)))
    dispatch(setActiveBoardColumns([...boardColumns]))
    dispatch(closeNewBoardModal())
    dispatch(NewColumnModalClosed())
}

console.log(
  activeBoard
)
    return (
    <NewColumnWrapper darkMode={darkMode}>
      <p className="header">Add New Column</p>
      <div>
        <p className="section-name">Name</p>
        <input
          className="board-name"
          type="text"
          value={activeBoard.name}
          disabled
        />
      </div>
      <div>
        <p className="section-name">Columns</p>
        <ul className="board-columns">
          {boardColumns.map((column, index) => {
            return (
              <li>
                <input
                  className="column-name"
                  type="text"
                  value={column.name}
                  onChange={(event) =>
                    handleChangeColumnName(event.target.value, column.id, index)
                  }
                />
                <img
                  className="cross"
                  src="./src/assets/icons/icon-cross.svg"
                  alt="delete column name input"
                  onClick={() => handleDeleteColumn(column.id, index)}
             />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="buttons">
        <button className="btn new-column" onClick={handleAddNewColumn}>
          + Add New Column
        </button>
        <button className="btn save-btn" onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </NewColumnWrapper>
  );
}

export default NewColumn;
