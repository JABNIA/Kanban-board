import { useSelector } from "react-redux";
import { TasksWrapper } from "./Columns-styled";
import PragmaticTaskItem from "./TaskItem";
import { RootState } from "../../store/Store";
import { Column } from "../../types";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";

function TasksColumn({ column, }: 
  { 
    column: Column, 
  }) {
  const darkMode = useSelector((state: RootState) => state.switchMode.darkMode);
  const tasks = useSelector((state: RootState) => state.Boards.tasks);
  const ref = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  useEffect(() => {
      const el = ref.current;
      invariant(el, "Element ref is not set");

    return dropTargetForElements({
      element: el,
      onDragStart: () => setIsDraggedOver(true),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
      getData: () => ({ type: "column", columnId: column.id }),
      getIsSticky: () => true,
      
    });
  },[])
  return (
    <div ref={ref} style={{ backgroundColor: isDraggedOver ? "lightblue" : "transparent" }}>
      <h3 className="status-header" key={column.name} >
        {column.name} ({column.taskIds.length})
      </h3>
      
        <TasksWrapper darkMode={darkMode} >
          {column.taskIds.map((taskId) => (
            <PragmaticTaskItem key={taskId} taskId={taskId} />
           ))}
        </TasksWrapper>
    </div>
  );
}

export default TasksColumn;
