import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { open, setTask } from "../../store/details/detailsSlice";
import { useEffect, useRef, useState } from "react";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { createPortal } from "react-dom";
import { TasksWrapper } from "./Columns-styled";
import invariant from "tiny-invariant";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { attachClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

function TaskItem({
  taskId,
  columnName,
}: {
  taskId: string;
  columnName: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.Boards.tasks);
  const task = tasks.find((task) => task.id === taskId);
  const subtasksCompleted = task
    ? task.subtasks.filter((subtask) => subtask.isCompleted)
    : [];
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: taskId,
      data: {
        task: task,
        type: "task",
        columnName: columnName,
      },
    });
  const style = transform
    ? {
        transition,
        transform: CSS.Transform.toString(transform),
      }
    : undefined;

  if (!task) return;

  return (
    <div
      key={taskId}
      className="task"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <h4 className="task-title">{task.title}</h4>
      <p className="subtasks-info">
        {subtasksCompleted.length} of {task.subtasks.length} subtasks
      </p>
    </div>
  );
}

export default PragmaticTaskItem;

function PragmaticTaskItem({ taskId }: { taskId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.Boards.tasks);
  const task = tasks.find((task) => task.id === taskId);
  const subtasksCompleted = task
    ? task.subtasks.filter((subtask) => subtask.isCompleted)
    : [];
  const [isDragging, setIsDragging] = useState(false);
  const darkMode = useSelector((state: RootState) => state.switchMode.darkMode);
  const ref = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<HTMLElement | null>();

  if (!task) return;

  useEffect(() => {
    const element = ref.current;

    invariant(element, )

    return combine(
      draggable({
      element: element,
      getInitialData: () => ({type: "task", taskId: taskId}),
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
    }),

    dropTargetForElements({
      element: element,
      getData: ({ input, element }) => {
        const data = {type: "task", taskId: taskId};
      
        return attachClosestEdge(data, {
          input, 
          element, 
          allowedEdges: ["top", "bottom"],
        })
      },
      getIsSticky: () => true,
      onDragEnter: (args) => {
        if (args.source.data.taskId !== taskId) {
          // console.log("on Drage ented", args)
        }
      }
    })
  )
  }, [taskId]);

  const handleClick = () => {
    dispatch(setTask(taskId));
    dispatch(open());
  };

  return (
    <>
      <div
        className="task"
        ref={ref}
        style={{ display: isDragging ? "none" : "block" }}
        onClick={handleClick}
      >
        <h4 className="task-title">{task.title}</h4>
        <p className="subtasks-info">
          {subtasksCompleted.length} of {task.subtasks.length} subtasks
        </p>
      </div>
      {preview && createPortal(<TaskPreview taskId={taskId} />, preview)}
    </>
  );
}

const TaskPreview = ({ taskId }: { taskId: string }) => {
  const tasks = useSelector((state: RootState) => state.Boards.tasks);
  const task = tasks.find((task) => task.id === taskId);
  const subtasksCompleted = task
    ? task.subtasks.filter((subtask) => subtask.isCompleted)
    : [];
  const darkMode = useSelector((state: RootState) => state.switchMode.darkMode);

  if (!task) return;

  return (
    <TasksWrapper darkMode={darkMode}>
      <div className="task" style={{ backgroundColor: "var(--color-Main)" }}>
        <h4 className="task-title">{task.title}</h4>
        <p className="subtasks-info">
          {subtasksCompleted.length} of {task.subtasks.length} subtasks
        </p>
      </div>
    </TasksWrapper>
  );
};
