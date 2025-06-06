import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store"
import { open, setTask } from "../../store/details/detailsSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { attachClosestEdge, extractClosestEdge, Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import DropIndicator from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import { openModal } from "../../store/Modal/ModalSlice";



function PragmaticTaskItem({ taskId }: { taskId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.Boards.tasks);
  const task = useMemo(() => {
    if (!tasks) return undefined;
    return tasks.find((task) => task.id === taskId);
  }, [tasks, taskId]);
  const subtasksCompleted = task
  ? task.subtasks.filter((subtask) => subtask.isCompleted)
  : [];
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [, setIsDraggedOver] = useState(false);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null); 
  
  if (!task) return;
  
  useEffect(() => {
    const element = ref.current;
    
    invariant(element, )
    
    return combine(
      draggable({
        element: element,
        getInitialData: () => ({type: "task", taskId: taskId}),
        onDragStart: () => {
          setIsDragging(true)
        },
        onDrop: () => {
          setIsDragging(false)
        },
      }),
      
      dropTargetForElements({
        element: element,
        getData: ({ input, element }) => {
          const data = {type: "task", taskId: taskId};
          
          return attachClosestEdge(data, {
            input, 
            element, 
            allowedEdges: ["top"],
          })
        },
        getIsSticky: () => true,
        onDragEnter: ({source, self}) => {
          if(source.data.taskId !== taskId) {
            setClosestEdge(extractClosestEdge(self.data));
          };
        },
        onDrag: ({source, self}) => {
          if (source.data.taskId !== taskId) {
            setClosestEdge(extractClosestEdge(self.data));
          }
        },
        onDragLeave: () => {
          setClosestEdge(null);
          setIsDraggedOver(false);
        },
        onDrop: () => {
          setClosestEdge(null);
          setIsDraggedOver(false);
        }
      })
    )
  }, [taskId]);
  
  const handleClick = () => {
    const selected =tasks.find(task => task.id === taskId)
    dispatch(setTask(selected));
    dispatch(openModal())
    dispatch(open());
  };
  
  return (
    <>
    <div className="task-wrapper">

      <div
        className="task"
        ref={ref}
        style={{ visibility: isDragging ? "hidden" : "visible" }}
        onClick={handleClick}
        >
        <h4 className="task-title">{task.title}</h4>
        <p className="subtasks-info">
          {subtasksCompleted.length} of {task.subtasks.length} subtasks
        </p>
      {closestEdge && <DropIndicator edge={closestEdge} gap="20px" indent="10px"/>}
      </div>
    </div>
    </>
  );
}

export default PragmaticTaskItem;