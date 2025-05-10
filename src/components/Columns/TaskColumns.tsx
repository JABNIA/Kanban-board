import { StatusColumnsWrapper, TasksWrapper } from "./Columns-styled";
import useBoardContext from "../../context";
import { closestCenter, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import TasksColumn from "./Column";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { Column, Task } from "../../types";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { setColumns, setTasks } from "../../store/FetchData/FetchData";
import { useState } from "react";
import TaskItem from "./TaskItem";

function TaskColumns() {
  const dispatch = useDispatch<AppDispatch>();
  const { activeBoard, setActiveBoard } = useBoardContext();
  const columns = useSelector((state: RootState) => state.Boards.columns);
  const activeBoardColumns = columns.filter((column: Column) => activeBoard.columnIds.includes(column.id));
  const inActiveBoardColumns = columns.filter((column: Column) => !activeBoard.columnIds.includes(column.id));
  const darkMode = useSelector((state:RootState) => state.switchMode.darkMode)
  const tasks = useSelector((state: RootState) => state.Boards.tasks);
  const [activeTask, setActiveTask] = useState<string>("")
  const [columnName, setColumnName] = useState<string>("")
  
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveTask(active.id as string);
    tasks.forEach(
      task => {
        if (task.id === activeTask){
          setColumnName(task.status)
        }
      }
    )
  }

  const handleDragEnd = (event: DragEndEvent) => {
  
  const {active, over} = event;
    
  if (!over) return;

  
  const activeTask: Task = active.data.current?.task;
  const overTask: Task = over.data.current?.task;
  const overId = over.id as string

  const dragActionColumnUpdate = activeBoardColumns.map(column => {
    const updatedColumn = {...column, taskIds: column.taskIds.filter(t => t !== activeTask.id)}
    
    if(over.data.current?.type === "column") {
      if(updatedColumn.id === overId){
        return {...updatedColumn, taskIds:[...updatedColumn.taskIds, activeTask.id]}
      }
    }
    
    if (over.data.current?.type === "task") {
      if(
        over.data.current?.columnName === active.data.current?.columnName &&
        active.data.current?.columnName === column.name
      ){
        const newIndex = column.taskIds.indexOf(overTask.id);
        const updatedTaksIds = column.taskIds.filter(taskId => taskId !== activeTask.id);
        
        updatedTaksIds.splice(newIndex, 0, activeTask.id)
        
        return {...updatedColumn, taskIds: updatedTaksIds};
      }
      console.log(over)
      if(over.data.current?.columnName === column.name){
        const newIndex = column.taskIds.indexOf(overTask.id);
        const updatedTaksIds = [...column.taskIds];
        updatedTaksIds.splice(newIndex, 0, activeTask.id)
        
        return {...updatedColumn, taskIds: updatedTaksIds};
      }
    }
    console.log(over.data.current?.type)


    // if(column.taskIds.includes(activeTask.id) && column.taskIds.includes(overTask.id)){
    //   const newIndex = column.taskIds.indexOf(overTask.id);
    //   const updatedTaksIds = column.taskIds.filter(taskId => taskId !== activeTask.id);

    //   updatedTaksIds.splice(newIndex, 0, activeTask.id)

    //   return {...column, taskIds: updatedTaksIds}
    // }

    // if(!column.taskIds.includes(activeTask.id) && column.taskIds.includes(overTask.id)){
    //   const newIndex = column.taskIds.indexOf(overTask.id);
    //   const updatedTaskIdList = [...column.taskIds];
    //   const tasksUpdated = tasks.map(task => {
    //    if(task.id === activeTask.id){
    //     return {...task, status: column.name}
    //    }
    //    return task;
    //   })

    //   dispatch(setTasks(tasksUpdated))
    //   updatedTaskIdList.splice(newIndex, 0, activeTask.id);

    //   return {...column, taskIds: updatedTaskIdList}
    // }
    
    return updatedColumn;
  });
    dispatch(setColumns(inActiveBoardColumns.concat(dragActionColumnUpdate)))
  }

  return (
    <DndContext 
    onDragStart={handleDragStart} 
    onDragEnd={handleDragEnd}
    collisionDetection={closestCenter}>
      <div>
        <StatusColumnsWrapper>
              {activeBoardColumns.map((column: Column) => {
                return (
                  <SortableContext
                  key={column.id}
                  items={[...column.taskIds, activeTask]}
                  strategy={verticalListSortingStrategy}
                >
                  <TasksColumn key={column.id} column={column} />
                  </SortableContext>
                );
              })}
              <DragOverlay>
                {
                  activeTask !== "" ?
                  <TasksWrapper darkMode={darkMode}>
                    <TaskItem taskId={activeTask} columnName={columnName} />
                  </TasksWrapper>
                  :
                  null
                }
              </DragOverlay>
        </StatusColumnsWrapper>
      </div>
    </DndContext>
  );
}

export default TaskColumns;
