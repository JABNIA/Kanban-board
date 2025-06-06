import { RootState } from "../../store/Store";
import { useSelector } from "react-redux";
import Background from "../background/Background";
import TaskDetails from "./TaskDetails/TaskDetails";
import NewBoardComponent from "./NewBoard/NewBoard";
import NewTaskModal from "./NewTaskModal/NewTaskModal";
import NewColumn from "./NewColumn/NewColumn";
import DeleteBoardModal from "./DeleteBoard/DeleteBoardModal";
import DeleteTaskModal from "./DeleteTask/DeleteTask";

function ModalComponent() {
  const detailsOpen = useSelector(
    (state: RootState) => state.taskDetailsModal.detailsOpen
  );
  const addNewBoard = useSelector(
    (state: RootState) => state.NewBoard.addNewBoard
  );
  const addNewColumn = useSelector(
    (state: RootState) => state.NewColumn.isModalOpen
  );
  const addNewTask = useSelector(
    (state: RootState) => state.AddNewTask.addNewTask
  );
  const deleteBoard = useSelector(
    (state: RootState) => state.DeleteSegment.deleteBoard
  );
    const deleteTask = useSelector(
      (state: RootState) => state.DeleteSegment.deleteTask
    )
  

  return (
    <>
      {detailsOpen && (
        <>
          <Background />
          <TaskDetails />
        </>
      )}
      {addNewBoard && (
        <>
          <Background />
          <NewBoardComponent />
        </>
      )}
      {addNewColumn && (
        <>
          <Background /> 
          <NewColumn />
        </>
      )}
      {addNewTask && (
        <>
          <Background />
          <NewTaskModal />
        </>
      )}
      {deleteBoard && (
        <>
          <Background />
          <DeleteBoardModal />
        </>
      )}
      {deleteTask && (
        <>
          <Background />
          <DeleteTaskModal />
        </>
      )}
    </>
  );
}

export default ModalComponent;
