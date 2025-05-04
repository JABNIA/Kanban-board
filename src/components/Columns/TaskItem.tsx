import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/Store'
import { open, setTask } from '../../store/details/detailsSlice'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '../../types'


function TaskItem({taskId, columnName}: {taskId: string, columnName: string}) {
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.Boards.tasks);
  const task = tasks.find(task => task.id === taskId);
  const subtasksCompleted = task ? task.subtasks.filter(subtask => subtask.isCompleted) : [];
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
    id: taskId,
    data: {
      task: task,
    }
  })
  const style = transform ? {
    transition,
    transform: CSS.Transform.toString(transform)
  } : undefined;



  function handlePointerDown(e: React.MouseEvent) {
    e.stopPropagation()
    if (e.button === 0) {
      dispatch(open());
      dispatch(setTask(task));
    }
  }

  if(!task) return;

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

export default TaskItem;
