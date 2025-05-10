import { useSelector } from "react-redux";
import { TasksWrapper } from "./Columns-styled";
import TaskItem from "./TaskItem";
import { RootState } from "../../store/Store";
import { Column } from "../../types";
import { useDroppable } from "@dnd-kit/core";

function TasksColumn({ column, }: 
  { 
    column: Column, 
  }) {
  const darkMode = useSelector((state: RootState) => state.switchMode.darkMode);
  const tasks = useSelector((state: RootState) => state.Boards.tasks);

  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: "column",
    },
  });

  return (
    <div ref={setNodeRef}>
      <h3 className="status-header" key={column.name} style={{color: isOver ? "blue" : "black"}}>
        {column.name} ({column.taskIds.length})
      </h3>
      
        <TasksWrapper darkMode={darkMode}>
          {column.taskIds.map((taskId) => (
            <TaskItem key={taskId} taskId={taskId} columnName={column.name} />
          ))}
        </TasksWrapper>
    </div>
  );
}

export default TasksColumn;
