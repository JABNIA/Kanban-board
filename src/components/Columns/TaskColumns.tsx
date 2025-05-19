import { StatusColumnsWrapper } from "./Columns-styled";
import TasksColumn from "./Column";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { Column } from "../../types";
import { useEffect } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter/";
import { setActiveBoardColumns } from "../../store/FetchData/FetchData";


function TaskColumns() {
  const dispatch = useDispatch<AppDispatch>();
  const columns = useSelector((state: RootState) => state.Boards.columns);
  const currentLyActiveColumns = useSelector((state: RootState) => {
    return state.Table.columnIds
  });
  const activeBoardColumns = useSelector((state: RootState) => state.Boards.activeBoardColumns)
  
  
  const handleDrop = ({ source, location }: any) => {
    const destination = location.current.dropTargets.length;
    if (!destination) return;

    if(location.current.dropTargets[0].data.type === "task"){
      
      const updatedColumns = activeBoardColumns.map((column) => {
        //To remove the task from the column it was dragged from
        if (column.id === location.initial.dropTargets[1].data.columnId) {
          return {...column, taskIds: column.taskIds.filter(taskId => taskId !== source.data.taskId)};
        }
        
        // when dragging in to different column
        if (column.id === location.current.dropTargets[1].data.columnId && 
          location.current.dropTargets[1].data.columnId !== location.initial.dropTargets[1].data.columnId
        ) {
          const newIndex = column.taskIds.indexOf(source.data.taskId);
          const newTaskIds = [...column.taskIds];

          newTaskIds.splice(newIndex, 0, source.data.taskId);
       
          return {...column, taskIds: newTaskIds };
        }
        // When dragging in to the same column
        if(location.current.dropTargets[1].data.columnId === location.initial.dropTargets[1].data.columnId &&
          location.current.dropTargets[1].data.columnId === column.id
        ){
          
          const newIndex = column.taskIds.indexOf(location.current.dropTargets[0].data.taskId);
          const reorderedTaskIds = column.taskIds.filter(task => task !== source.data.taskId);

          reorderedTaskIds.splice(newIndex, 0 , source.data.taskId);
          return {...column, taskIds: reorderedTaskIds};
        }
    
        return column;
      })

      dispatch(setActiveBoardColumns(updatedColumns));
    }

    if(location.current.dropTargets[0].data.type === "column"){
      const updatedColumns = activeBoardColumns.map((column) => {
        if(column.id === location.current.dropTargets[0].data.columnId) {
          const deleteTaskId = column.taskIds.filter(task => task !== source.data.taskId);
            return {...column, taskIds: [...deleteTaskId, source.data.taskId]};
          }
        if (column.id === location.initial.dropTargets[1].data.columnId) {
          return {...column, taskIds: column.taskIds.filter(taskId => taskId !== source.data.taskId)};
        }
      return column;
      })
      dispatch(setActiveBoardColumns(updatedColumns));
    }
     
  };

  useEffect(() => {
    const getColumns = columns.filter((column: Column) => currentLyActiveColumns.includes(column.id));
    dispatch(setActiveBoardColumns([...getColumns]));
  
    return monitorForElements({
      onDrop: handleDrop,
    })
  }, [currentLyActiveColumns, columns])  
  
  return (   
      <div>
        <StatusColumnsWrapper>
              {
              activeBoardColumns.map((column: Column) => {
                return <TasksColumn key={column.id} column={column} />
              })}
        </StatusColumnsWrapper>
      </div>
  );
}

export default TaskColumns;




