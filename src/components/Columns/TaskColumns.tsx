import { StatusColumnsWrapper } from "./Columns-styled";
import useBoardContext from "../../context";
import { closestCenter, DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import TasksColumn from "./Column";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { Column, Task } from "../../types";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { setColumns, setTasks } from "../../store/FetchData/FetchData";

function TaskColumns() {
  const dispatch = useDispatch<AppDispatch>();
  const { activeBoard, setActiveBoard } = useBoardContext();
  const columns = useSelector((state: RootState) => state.Boards.columns);
  const activeBoardColumns = columns.filter((column: Column) => activeBoard.columnIds.includes(column.id));
  const inActiveBoardColumns = columns.filter((column: Column) => !activeBoard.columnIds.includes(column.id));
  const tasks = useSelector((state: RootState) => state.Boards.tasks);
  
  
  
  const handleDragEnd = (event: DragEndEvent) => {
  
  const {active, over} = event;
    
  if (!over) return;

  
  const activeTask: Task = active.data.current?.task;
  const overTask: Task = over.data.current?.task;
  
  console.log(over);
  
  const dragActionColumnUpdate = activeBoardColumns.map(column => {
    const updatedColumn = {...column, taskIds: column.taskIds.filter(t => t !== activeTask.id)}
    if (over.id === column.id) {
      console.log("id match")
      return {...column, taskIds: [...column.taskIds, activeTask.id]}
    }

    if(column.taskIds.includes(activeTask.id) && column.taskIds.includes(overTask.id)){
      const newIndex = column.taskIds.indexOf(overTask.id);
      const updatedTaksIds = column.taskIds.filter(taskId => taskId !== activeTask.id);

      updatedTaksIds.splice(newIndex, 0, activeTask.id)

      return {...column, taskIds: updatedTaksIds}
    }

    if(!column.taskIds.includes(activeTask.id) && column.taskIds.includes(overTask.id)){
      const newIndex = column.taskIds.indexOf(overTask.id);
      const updatedTaskIdList = [...column.taskIds];
      const tasksUpdated = tasks.map(task => {
       if(task.id === activeTask.id){
        return {...task, status: column.name}
       }
       return task;
      })

      dispatch(setTasks(tasksUpdated))
      updatedTaskIdList.splice(newIndex, 0, activeTask.id);

      return {...column, taskIds: updatedTaskIdList}
    }
    
    return updatedColumn;
  
  });
    dispatch(setColumns(inActiveBoardColumns.concat(dragActionColumnUpdate)))
  }

const handleDragOver = (event: DragOverEvent) => {
  const {active, over} = event;

  console.log(over)
  console.log(active)
}

  return (
    <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver} collisionDetection={closestCenter}>
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
    </DndContext>
  );
}

export default TaskColumns;
