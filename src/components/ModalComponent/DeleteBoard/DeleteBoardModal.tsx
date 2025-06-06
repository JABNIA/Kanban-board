import { useDispatch, useSelector } from "react-redux";
import { ModalWrapper } from "./deleteBoardModal-styled";
import { AppDispatch, RootState } from "../../../store/Store";
import { closeModal } from "../../../store/Modal/ModalSlice";
import { deleteBoardModalClosed } from "../../../store/deleteFunctional/deleteSlice";
import { addNewBoard } from "../../../store/FetchData/FetchData";
import useBoardContext from "../../../context";


function DeleteBoardModal() {
    const activeTable = useSelector((state: RootState) => state.Table);
    const Boards = useSelector((state: RootState) => state.Boards.boards)
    const dispatch = useDispatch<AppDispatch>(); 
    const {activeBoard, setActiveBoard} = useBoardContext()


    const handleCloseDeleteMoadal = () => {
        dispatch(closeModal())
        dispatch(deleteBoardModalClosed())
    }

    const handleDeleteBoard = () => {
        const updateBoards = Boards.filter(board => board.id !== activeTable.id)
        console.log(Boards, updateBoards)
        dispatch(addNewBoard([...updateBoards]))
        dispatch(closeModal())
        dispatch(deleteBoardModalClosed())
        setActiveBoard(Boards[0])
    }


  return (
    <ModalWrapper>
        <p className="heading">Delete this board?</p>
        <p className="message">Are you sure you want to delete the '{activeTable.name}' board? This action will remove all columns and tasks and cannot be reversed.</p>
        <div className="buttons">
            <button className="del-btn" onClick={handleDeleteBoard}>Delete</button>
            <button className="cancel" onClick={handleCloseDeleteMoadal}>Cancel</button>
        </div>
    </ModalWrapper>
  )
}

export default DeleteBoardModal;
