import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/Store";
import useBoardContext from "../../../context";
import { closeModal } from "../../../store/Modal/ModalSlice";
import { deleteTaskModalClosed } from "../../../store/deleteFunctional/deleteSlice";
import { setColumns, setTasks } from "../../../store/FetchData/FetchData";
import { ModalWrapper } from "./deleteTaskModal-styled";

function DeleteTaskModal() {
    const Tasks = useSelector((state: RootState) => state.Boards.tasks)
    const selected = useSelector((state: RootState) => state.taskDetailsModal.task)
    const dispatch = useDispatch<AppDispatch>(); 
    const {activeBoard, setActiveBoard} = useBoardContext()
    const Boards = useSelector((state: RootState) => state.Boards.boards)
    const columns = useSelector((state: RootState) => state.Boards.columns)

    const handleCloseDeleteMoadal = () => {
        dispatch(closeModal())
        dispatch(deleteTaskModalClosed())
    }

    const handleDeleteBoard = () => {
        const updatedTasks = Tasks.filter(task => task.id !== selected.id)
        const updatedColumns = columns.map(col => {
            if(col.taskIds.includes(selected.id)){
                return {...col, taskIds: col.taskIds.filter(tId => tId !== selected.id )}
            }
            return col;
        })


        dispatch(setTasks([...updatedTasks]));
        dispatch(setColumns([...updatedColumns]));
        setActiveBoard({...Boards[0]});
        setTimeout(() => {

            dispatch(closeModal());
            dispatch(deleteTaskModalClosed());
        }, 100);
    }
console.log(selected)

  return (
    <ModalWrapper>
        <p className="heading">Delete this task?</p>
        <p className="message">Are you sure you want to delete the '{selected.title}' task? This action will remove all columns and tasks and cannot be reversed.</p>
        <div className="buttons">
            <button className="del-btn" onClick={handleDeleteBoard}>Delete</button>
            <button className="cancel" onClick={handleCloseDeleteMoadal}>Cancel</button>
        </div>
    </ModalWrapper>
  )
}


export default DeleteTaskModal;