import { DetailsWrapper } from "./taskDetails-styled";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/Store";
import { useState } from "react";
import { Subtask, Task } from "../../../types";
import { NewTaskModalWrapper } from "../NewTaskModal/newTaskModal-styled";
import { setActiveBoardColumns, setColumns, setTasks } from "../../../store/FetchData/FetchData";

function TaskDetails() {
  const dispatch = useDispatch<AppDispatch>()
  // redux thingies 
  const darkMode = useSelector((state: RootState) => state.switchMode.darkMode);
  const columnIds = useSelector((state: RootState) => state.Table.columnIds);
  const columns = useSelector((state: RootState) => state.Boards.columns);
  const activeColumns = columns.filter(column => columnIds.includes(column.id));
  const tasks = useSelector((state: RootState) => state.Boards.tasks);
  const selectedTaskId = useSelector((state: RootState) => state.taskDetailsModal.taskId);
  const selectedTask = tasks.find(task => {return task.id === selectedTaskId });
  if (!selectedTask) return;
  const finishedSubtasks = selectedTask?.subtasks.filter(
    (subtask) => subtask.isCompleted
  );
  const getStatuses = activeColumns.map(column => {
    return {
      columnId: column.id,
      columnName:column.name
  }});
  const [listOpen, setListOpen] = useState<boolean>(false);
  const [taskSettings, setTaskSettings] = useState<boolean>(false)
  const [taskEditMenu, setTaskEditMenu] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(selectedTask.title)
  const [description, setDescription] = useState<string>(selectedTask.description)
  const [subtasks, setSubtasks] = useState<Subtask[]>(selectedTask.subtasks)
  const [status, setStatus] = useState<string>(selectedTask.status);
  const [editStatusListOpen, setEditStatusListOpen] = useState<boolean>(false);

  //handlers

  const handleSelectStatus = async (statusName: string, columnId: string) => {
    setStatus(statusName);
    setListOpen(false);
    const updatedTasks = tasks.map(task => {
      if (task.id === selectedTaskId){
        return {
          ...task, 
          status: statusName
        }
      }
      return task;
    })
    const updatedColumns = columns.map(column => {
      if (column.taskIds.includes(selectedTaskId) && column.id !== columnId){
        return {
          ...column,
          taskIds: column.taskIds.filter(taskId => taskId !== selectedTaskId)
        }
      }
      if(columnId === column.id){
        return {
          ...column,
          taskIds: [selectedTaskId, ...column.taskIds ]
        }
      }
      return column;
    })
    dispatch(setTasks([...updatedTasks]))
    dispatch(setColumns([...updatedColumns]))
    dispatch(setActiveBoardColumns(updatedColumns))
  };

  const handleChange = (Task: Task, Subtask: Subtask) => {
    const alteredSubtasks = tasks.map(task => {
      if (task.id === Task.id){
        const updatedSubtask = {...Subtask, isCompleted: !Subtask.isCompleted};
        return updatedSubtask;
      }
      return task;
    })  
    dispatch(setTasks(alteredSubtasks));
  };

  const handleInputSubtaskName = (title:string, subtaskIndex: number) => {
    const updated = subtasks.map((subtask, index) => {
        if (index === subtaskIndex){
            return {...subtask, title: title};
        }
        return subtask;
    })
    setSubtasks(updated)
  }

  const handleAddSubtaskinput = () => {
    setSubtasks(
        [...subtasks, {title:"", isCompleted:false}]
    )
}

const handleDeleteSubtask = (subtaskIndex: number) =>{
    const upddatedSubtask = subtasks.filter((subtask, index) => index !== subtaskIndex)
    setSubtasks(upddatedSubtask)
}

  const handleEditTask = () => {
    const updated: Task = {
      id: selectedTask.id,
      title: title,
      description: description,
      subtasks: subtasks,
      status: status
    }

  return updated
  }


  if(taskEditMenu){

    return(
      <NewTaskModalWrapper darkMode={darkMode}>
              <div className='simple-wrapper'>
                  <p className="header">Edit Task</p>
              </div>
              <div className='simple-wrapper'>
                  <p className="inputName">Title</p>
                  <input type="text" className="task-inputs" value={title} 
                  onChange={(event) => setTitle(event.target.value)}
                  />
              </div>
              <div className='simple-wrapper'>
                  <p className="inputName">Description</p>
                  <textarea 
                  className="task-inputs description"
                  value={description} 
                  onChange={(event) => setDescription(event.target.value)}
                  ></textarea>
              </div>
              <div className='simple-wrapper'>
                  <p className="inputName">Subtask</p>
                  <div className='subtasks'>
                      {subtasks.map((subtask: Subtask, index:number) => {
                          return (
                          <div>
                              <input 
                              type="text" 
                              className="subtask-inputs" 
                              value={subtasks[index].title} 
                              onChange={(event) => handleInputSubtaskName(event.target.value, index)}/>
                              <img 
                              src="./src/assets/icons/icon-cross.svg" 
                              alt="delete subtask" 
                              onClick={() => {handleDeleteSubtask(index)}}/>
                          </div>
                          )
                      })}
                  </div>
                  <button className="modal-btn add-subtask" onClick={() => {handleAddSubtaskinput}}>+ Add New Subtask</button>
              </div>
              <div className='simple-wrapper'>
              <div
              className="status-selection"
              onClick={() => setEditStatusListOpen((curr) => !curr)}
              style={{ border: listOpen ? "1px solid var(--color-Main)" : "" }}
            >
              <span>{status}</span>
              <img
                src="./src/assets/icons/icon-chevron-down.svg"
                alt="chevron down"
              />
            </div>
            {editStatusListOpen && (
              <ul className="status-list">
                {getStatuses.map((status) => (
                  <li
                    key={status.columnId}
                    className="status-list-item"
                    onClick={() => {
                      setEditStatusListOpen(false)
                      setStatus(status.columnName)
                    }}
                  >
                    {status.columnName}
                  </li>
                ))}
              </ul>
            )}
            <button 
              className="modal-btn create-task"
              onClick={handleEditTask}
            >Edit Task</button>
              </div>
          </NewTaskModalWrapper>
      )
}else{
   return (
    <DetailsWrapper darkMode={darkMode}>
      <p className="task-title">
        <span>{selectedTask.title}</span> 
        <img 
        src="./src/assets/icons/icon-vertical-ellipsis.svg" 
        alt="task settings"
        onClick={() => setTaskSettings(curr => !curr)}
        />
        </p>
        {
          taskSettings &&
          <div  className="settings">
          <ul>
            <li className="edit" onClick={() => setTaskEditMenu(true)}>Edit Task</li>
            <li className="delete">Delete Task</li>
          </ul>
        </div>
        }
      <p className="task-description">{selectedTask.description}</p>
      <p className="subtasks-header">
        Subtasks {finishedSubtasks.length} of {selectedTask.subtasks.length}
      </p>
      <ul className="subtask-list">
        {selectedTask.subtasks.map((subtask) => {
          return (
            <LabelCheckbox
            key={subtask.title}
            subtask={subtask}
            selectedTask={selectedTask}
            // handleChange={handleChange}
            />
          );
        })}
      </ul>
      <p className="status-header">Current Status</p>
      <div
        className="status-selection"
        onClick={() => setListOpen((curr) => !curr)}
        style={{ border: listOpen ? "1px solid var(--color-Main)" : "" }}
        >
        <span>{status}</span>
        <img
          src="./src/assets/icons/icon-chevron-down.svg"
          alt="chevron down"
          />
      </div>
      {listOpen && (
        <ul className="status-list">
          {getStatuses.map((status) => (
            <li
            key={status.columnId}
            className="status-list-item"
            onClick={() => {
              handleSelectStatus(status.columnName, status.columnId);
            }}
            >
              {status.columnName}
            </li>
          ))}
        </ul>
      )}
    </DetailsWrapper>
  );
}
}

export default TaskDetails;

function LabelCheckbox({
  subtask,
  selectedTask,
  // handleChange,
}: {
  subtask: Subtask;
  selectedTask: Task;
  // handleChange: (selectedTask: Task, subtask: Subtask) => void;
}) {
  const [checked, setChecked] = useState<boolean>(subtask.isCompleted);
  return (
    <li
      key={subtask.title}
      className="subtask"
      onClick={() => {
        // handleChange(selectedTask, subtask);
        setChecked((curr) => !curr);
      }}
    >
      <input type="checkbox" checked={checked} onChange={() => ""} />
      <label
        className={checked ? "subtask-label-done" : "subtask-label-undone"}
      >
        {subtask.title}
      </label>
    </li>
  );
}
