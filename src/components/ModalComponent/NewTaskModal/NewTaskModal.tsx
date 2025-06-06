import { NewTaskModalWrapper } from './newTaskModal-styled'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store/Store'
import { useState } from 'react'
import { newTaskModalClose } from '../../../store/addNewTask/addNewTaskSlisce'
import { Column, Subtask } from '../../../types'
import { setColumns, setTasks } from '../../../store/FetchData/FetchData'

function NewTaskModal() {
    const dispatch = useDispatch<AppDispatch>();
    const darkMode = useSelector((state: RootState) => state.switchMode.darkMode)
    const activeBoard = useSelector((state: RootState) => state.Table);
    const columns = useSelector((state: RootState) => state.Boards.columns)
    const getStatuses = columns.filter((column: Column) => {if(activeBoard.columnIds.includes(column.id)) return {columnId: column.id, columnName: column.name}})
    const Tasks = useSelector((state: RootState) => state.Boards.tasks);
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [subtasks, setSubtasks] = useState<Subtask[]>([{title:"", isCompleted: false}])
    const [status, setStatus] = useState<{name:string , columnId:string}>(
      {name: getStatuses[0].name, columnId: getStatuses[0].id}
    )
    const [listOpen, setListOpen] = useState<boolean>(false);
//handlers
    const handleTitleInput = (input: string) => {
      setTitle(input)
    }

    const handleSetDescription = (inputValue: string) => {
      setDescription(inputValue)
    }

    const handleAddSubtaskinput = () => {
      setSubtasks(prev => [...prev, {title: "", isCompleted: false}])
    }

    const handleDeleteSubtask = (subtaskIndex: number) => {
      const updatedSubtasks = subtasks.filter((subtask, index) => {
        return index !== subtaskIndex;
      }) 

      setSubtasks(updatedSubtasks);
    }

    const handleInputSubtaskName = (value: string, subtaskIndex: number) => {
      const updatedSubtaskTitle = subtasks.map((subtask, index) => {
        if (index === subtaskIndex){
          return {...subtask, title: value }
        }
        return subtask;
      })

      setSubtasks(updatedSubtaskTitle)
    }

    const handleCreateTask = () => {
      const newTask = {
        id: `task-${Tasks.length + 1}`,
        title: title,
        description: description,
        status: status,
        subtasks: subtasks
      }
      const updatedBoardColumns = columns.map(column => {
        if(column.name === status.name && activeBoard.columnIds.includes(column.id)){
          return {...column, taskIds: [...column.taskIds, `task-${Tasks.length + 1}`]}
        }
        return column;
      })


      dispatch(setTasks([...Tasks, newTask]))
      dispatch(setColumns(updatedBoardColumns))
      dispatch(newTaskModalClose())
    }
    
//end of handlers


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
        <span>{status.name}</span>
        <img
          src="./src/assets/icons/icon-chevron-down.svg"
          alt="chevron down"
        />
      </div>
      {listOpen && (
        <ul className="status-list">
          {getStatuses.map((status) => (
            <li
              key={status.id}
              className="status-list-item"
              onClick={() => {
                setListOpen(false)
                setStatus({name: status.name, columnId:status.id})
              }}
            >
              {status.name}
            </li>
          ))}
        </ul>
      )}
      <button className="modal-btn create-task"
        onClick={() => handleCreateTask()}
      >Create Task</button>
        </div>
    </NewTaskModalWrapper>
  )
}

export default NewTaskModal
