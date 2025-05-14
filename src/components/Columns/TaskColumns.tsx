import { StatusColumnsWrapper } from "./Columns-styled";
import useBoardContext from "../../context";
import TasksColumn from "./Column";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { Column } from "../../types";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { setColumns, setTasks } from "../../store/FetchData/FetchData";
import { act, useCallback, useEffect, useState } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter/";


function TaskColumns() {
  const dispatch = useDispatch<AppDispatch>();
  const { activeBoard, setActiveBoard } = useBoardContext();
  const columns = useSelector((state: RootState) => state.Boards.columns);
  const currentLyActiveColumns = columns.filter((column: Column) => activeBoard.columnIds.includes(column.id))
  const [activeBoardColumns, setActiveBoardColumns] = useState<Column[]>(currentLyActiveColumns);
  const inActiveBoardColumns = columns.filter((column: Column) => !activeBoard.columnIds.includes(column.id));
  const tasks = useSelector((state: RootState) => state.Boards.tasks);

  const handleDrop = ({ source, location }) => {
    const destination = location.current.dropTargets.length;
    if (!destination) return;

    if(location.current.dropTargets[0].data.type === "task"){
      
      const updatedColumns = activeBoardColumns.map((column) => {
        if (column.id === location.current.dropTargets[1].data.columnId && 
          location.current.dropTargets[1].data.columnId !== location.initial.dropTargets[1].data.columnId
        ) {
          const newIndex = column.taskIds.indexOf(source.data.taskId);
          const newTaskIds = [...column.taskIds];
       ``
          newTaskIds.splice(newIndex, 0, source.data.taskId);
       
          return {...column, taskIds: newTaskIds };
        }

        if(location.current.dropTargets[1].data.columnId === location.initial.dropTargets[1].data.columnId &&
          location.current.dropTargets[1].data.columnId === column.id
        ){
          console.log(location.current.dropTargets[1].data.columnId, column.id)
          
          const newIndex = column.taskIds.indexOf(location.current.dropTargets[0].data.taskId);
          console.log(newIndex)
          const reorderedTaskIds = column.taskIds.filter(task => task !== source.data.taskId);

          console.log(reorderedTaskIds)
          reorderedTaskIds.splice(newIndex, 0 , source.data.taskId);
          console.log(reorderedTaskIds)
          return {...column, taskIds: reorderedTaskIds};
        }

        if (column.id === location.initial.dropTargets[1].data.columnId) {
          
          return {...column, taskIds: column.taskIds.filter(taskId => taskId !== source.data.taskId)};
        }
        return column;
      })

      setActiveBoardColumns(updatedColumns);
    }

    if(location.current.dropTargets[0].data.type === "column"){
      const updatedColumns = activeBoardColumns.map((column) => {
        if(column.id === location.current.dropTargets[0].data.columnId) {
            return {...column, taskIds: [...column.taskIds, source.data.taskId]};
          }
        if (column.id === location.initial.dropTargets[1].data.columnId) {
          return {...column, taskIds: column.taskIds.filter(taskId => taskId !== source.data.taskId)};
        }
      return column;
      })
      setActiveBoardColumns(updatedColumns);
    }
     
  };



  useEffect(() => {
    if (activeBoardColumns.length === 0) {
      setActiveBoardColumns(currentLyActiveColumns);
    }
  
    return monitorForElements({
      onDrop: handleDrop,
    })
  }, [currentLyActiveColumns])  
  

  
  return (   
      <div>
        <StatusColumnsWrapper>
              {activeBoardColumns.map((column: Column) => {
                return (
                  <SortableContext
                  key={column.id}
                  items={column.taskIds}
                  strategy={verticalListSortingStrategy}
                >
                  <TasksColumn key={column.id} column={column} />
                  </SortableContext>
                );
              })}
        </StatusColumnsWrapper>
      </div>
  );
}

export default TaskColumns;




