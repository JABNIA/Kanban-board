import Header from './components/Header/Header'
import Table from './components/Table/Table'
import styled from 'styled-components'
import TableSelectMenu from './components/TableSelectMenu/TableSelectMenu'
import { AppDispatch, RootState } from './store/Store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardData } from './store/FetchData/FetchData'
import { useEffect, useState } from 'react'
import { boardContext } from './context';
import { Board } from './types'
import { setBoard } from './store/Table/TableSlice'
import ModalComponent from './components/ModalComponent/ModalComponent'


function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [activeBoard, setActiveBoard] = useState<Board>({id: "", columnIds:[], name:""});
  const getStatus = useSelector((state: RootState) => state.Boards.status)
  const data = useSelector((state: RootState) => state.Boards.boards)
  const modal = useSelector((state: RootState) => state.Modal.isOpen)
  
  useEffect(() => {
    if(getStatus === "idle"){
      dispatch(fetchBoardData());
    }
    if(data.length > 0){
      dispatch(setBoard(data[0]));
    }
  }, [getStatus, activeBoard])
  
  return (
    <>
      <boardContext.Provider value={{ activeBoard, setActiveBoard }}>
        <AppWrapper>
          <Header />
          <Table />
          {
          modal &&
          <ModalComponent />
          }
          <TableSelectMenu />
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

