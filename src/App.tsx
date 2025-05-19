import Header from './components/Header/Header'
import Table from './components/Table/Table'
import styled from 'styled-components'
import TableSelectMenu from './components/TableSelectMenu/TableSelectMenu'
import { AppDispatch, RootState } from './store/Store'
import { useDispatch, useSelector } from 'react-redux'
import Background from './components/background/Background'
import TaskDetails from './components/ModalComponent/TaskDetails/TaskDetails'
import { fetchBoardData } from './store/FetchData/FetchData'
import { useEffect, useState } from 'react'
import { boardContext } from './context';
import NewBoardComponent from './components/ModalComponent/NewBoard/NewBoard'
import { Board } from './types'
import { setBoard } from './store/Table/TableSlice'


function App() {
  const dispatch = useDispatch<AppDispatch>();
  const detailsOpen = useSelector((state:RootState) => state.taskDetailsModal.detailsOpen)
  const addNewBoard = useSelector((state:RootState) => state.NewBoard.addNewBoard)
  const addNewTask = useSelector((state:RootState) => state.AddNewTask.addNewTask)
  const [activeBoard, setActiveBoard] = useState<Board>({id: "", columnIds:[], name:""});
  const getStatus = useSelector((state: RootState) => state.Boards.status)
  const data = useSelector((state: RootState) => state.Boards.boards)

  useEffect(() => {
    if(getStatus === "idle"){
      dispatch(fetchBoardData());
    }
    if(data.length > 0){
      dispatch(setBoard(data[0]));
    }
  }, [getStatus])
  
  return (
    <>
      <boardContext.Provider value={{ activeBoard, setActiveBoard }}>
        <AppWrapper>
          <Header />
          <Table />
          <TableSelectMenu />
        {
          detailsOpen &&
          <>
            <Background />
            <TaskDetails />      
          </>
          
        }
        {
        addNewBoard && 
        <>
            <Background />
            <NewBoardComponent />      
        </>
        }
        {
        addNewTask && 
        <>
            <Background />
            {/* <NewTaskModal />       */}
        </>
        }
        </AppWrapper>
      </boardContext.Provider>
    </>
  )
}

export default App


const AppWrapper = styled.div`
  position: relative;
  width: 1440px;
  height: 1024px;
  margin: auto;
  overflow-x: hidden;
`

