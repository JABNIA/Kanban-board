import { NewTaskModalWrapper } from './newTaskModal-styled'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/Store'
import { useState } from 'react'
import useBoardContext from '../../context'
import { newTaskModalClose } from '../../store/addNewTask/addNewTaskSlisce'

function NewTaskModal() {
    const dispatch = useDispatch<AppDispatch>();
    const darkMode = useSelector((state: RootState) => state.switchMode.darkMode)
    const { activeBoard, setActiveBoard } = useBoardContext();
    const getStatuses = activeBoard !== undefined ? activeBoard.columns.map((column:Column) => column.name) : [];
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [subtasks, setSubtasks] = useState<Subtask[]>([{title:"", isCompleted: false}])
    const [status, setStatus] = useState<string>(getStatuses[0])
    const [listOpen, setListOpen] = useState<boolean>(false);

    const handleAddSubtaskinput = () => {
        setSubtasks(
            [...subtasks, {title:"", isCompleted:false}]
        )
    }

    const handleDeleteSubtask = (subtaskIndex: number) =>{
        const upddatedSubtask = subtasks.filter((subtask, index) => index !== subtaskIndex)
        setSubtasks(upddatedSubtask)
    }

    const handleTitleInput = (value: string) => setTitle(value)

    const handleSetDescription = (description:string) => {
        setDescription(description)
    } 

    const handleInputSubtaskName = (title:string, subtaskIndex: number) => {
        const updated = subtasks.map((subtask, index) => {
            if (index === subtaskIndex){
                return {...subtask, title: title};
            }
            return subtask;
        })
        setSubtasks(updated)
    }

    const handleCreateTask = () => {
        const newTaskAddedInBoard = activeBoard.columns.map((column: Column) => {
            if(column.name === status){
                return {...column, tasks: [...column.tasks, 
                    {title: title, description: description, subtasks: subtasks, status: status}]}
            }
            return column;
        })
        setActiveBoard({...activeBoard, columns: newTaskAddedInBoard})
        dispatch(newTaskModalClose())
    }

    return (
    <NewTaskModalWrapper darkMode={darkMode}>
        <div className='simple-wrapper'>
            <p className="header">Add New Task</p>
        </div>
        <div className='simple-wrapper'>
            <p className="inputName">Title</p>
            <input type="text" className="task-inputs" value={title} onChange={(event) => handleTitleInput(event.target.value)}/>
        </div>
        <div className='simple-wrapper'>
            <p className="inputName">Description</p>
            <textarea 
            className="task-inputs description"
            value={description} 
            onChange={(event) => handleSetDescription(event.target.value)}
            ></textarea>
        </div>
        <div className='simple-wrapper'>
            <p className="inputName">Subtask</p>
            <div className='subtasks'>
                {subtasks.map((subtask, index) => {
                    return (
                    <div>
                        <input type="text" className="subtask-inputs" value={subtask.title} onChange={(event) => handleInputSubtaskName(event.target.value, index)}/>
                        <img src="./src/assets/icons/icon-cross.svg" alt="delete subtask" onClick={() => handleDeleteSubtask(index)}/>
                    </div>
                    )
                })}
            </div>
            <button className="modal-btn add-subtask" onClick={handleAddSubtaskinput}>+ Add New Subtask</button>
        </div>
        <div className='simple-wrapper'>
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
                setListOpen(false)
                setStatus(status)

              }}
            >
              {status}
            </li>
          ))}
        </ul>
      )}
      <button className="modal-btn create-task"
        onClick={handleCreateTask}
      >Create Task</button>
        </div>
    </NewTaskModalWrapper>
  )
}

export default NewTaskModal
