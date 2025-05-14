import { DetailsWrapper } from "./taskDetails-styled";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { useState } from "react";
import { Column, Subtask, Task } from "../../types";
import useBoardContext from "../../context";
import { NewTaskModalWrapper } from "../NewTaskModal/newTaskModal-styled";
import { edit } from "../../store/details/detailsSlice";

function TaskDetails() {
  const dispatch = useDispatch<AppDispatch>()
  const selectedTask = useSelector(
    (state: RootState) => state.taskDetailsModal.task
  );
  const finishedSubtasks = selectedTask.subtasks.filter(
    (subtask) => subtask.isCompleted
  );
  const darkMode = useSelector((state: RootState) => state.switchMode.darkMode);
  const { activeBoard, setActiveBoard } = useBoardContext();
  const columns = useSelector((state: RootState) => state.Boards.columns);
  const getStatuses = columns.filter(column => activeBoard.columnIds.includes(column.id)).map(column => column.name);
  const [listOpen, setListOpen] = useState<boolean>(false);
  const [taskSettings, setTaskSettings] = useState<boolean>(false)
  const [taskEditMenu, setTaskEditMenu] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(selectedTask.title)
  const [description, setDescription] = useState<string>(selectedTask.description)
  const [subtasks, setSubtasks] = useState<Subtask[]>(selectedTask.subtasks)
  const [status, setStatus] = useState<string>(selectedTask.status);
  const [editStatusListOpen, setEditStatusListOpen] = useState<boolean>(false);

  //handlers

  const handleSelectStatus = async (statusName: string, Task: Task) => {
    setStatus(statusName);
    setListOpen(false);
    if (activeBoard !== undefined) {
      setActiveBoard({
        ...activeBoard,
        columns: activeBoard.columns.map((column: Column) => {
          if (Task.status === column.name) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.title !== Task.title),
            };
          }
          if (column.name === statusName) {
            return {
              ...column,
              tasks: [...column.tasks, { ...Task, status: statusName }],
            };
          }
          return column;
        }),
      });
    }
  };

  const handleChange = (Task: Task, Subtask: Subtask) => {
    if (activeBoard !== undefined) {
      setActiveBoard({
        ...activeBoard,
        columns: activeBoard.columns.map((column: Column) => {
          if (Task.status === column.name) {
            return {
              ...column,
              tasks: column.tasks.map((task: Task) => {
                if (task.title === Task.title) {
                  return {
                    ...task,
                    subtasks: task.subtasks.map((subtask: Subtask) => {
                      if (subtask.title === Subtask.title) {
                        return {
                          ...subtask,
                          isCompleted: !subtask.isCompleted,
                        };
                      }
                      return subtask;
                    }),
                  };
                }
                return task;
              }),
            };
          }

          return column;
        }),
      });
    }
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

    const updatedColumns = activeBoard.columns.map(column => {
      if(column.name === status){
        return {
          ...column,
          tasks: column.tasks.map(task => {
          if(task.title === selectedTask.title){
            return updated;
          }
          return task;
        })}
      }
      return column;
    })
    
    const updatedBoard = {
      ...activeBoard,
      columns: updatedColumns
    }
    console.log(updatedBoard)
    dispatch(edit(updated))
    setActiveBoard(updatedBoard)
  
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
                    key={status}
                    className="status-list-item"
                    onClick={() => {
                      setEditStatusListOpen(false)
                      setStatus(status)
                    }}
                  >
                    {status}
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
            handleChange={handleChange}
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
            key={status}
            className="status-list-item"
            onClick={() => {
              handleSelectStatus(status, selectedTask);
            }}
            >
              {status}
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
  handleChange,
}: {
  subtask: Subtask;
  selectedTask: Task;
  handleChange: (selectedTask: Task, subtask: Subtask) => void;
}) {
  const [checked, setChecked] = useState<boolean>(subtask.isCompleted);
  return (
    <li
      key={subtask.title}
      className="subtask"
      onClick={() => {
        handleChange(selectedTask, subtask);
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
