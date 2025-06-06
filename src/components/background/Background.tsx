import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { AppDispatch } from '../../store/Store'
import { close } from '../../store/details/detailsSlice'
import { closeNewBoardModal } from '../../store/addNewBoard/addNewBoardSlice'
import { newTaskModalClose } from '../../store/addNewTask/addNewTaskSlisce'
import { closeModal } from '../../store/Modal/ModalSlice'
import { NewColumnModalClosed } from '../../store/addNewColumn/addNewColumn'

function Background() {
    const dispatch = useDispatch<AppDispatch>()

  const handleCloseModal = () => {
    dispatch(close())
    dispatch(closeNewBoardModal())
    dispatch(newTaskModalClose())
    dispatch(NewColumnModalClosed())
    dispatch(closeModal())
  }


  return ( <BackgroundWrapper onClick={handleCloseModal}/> )
}

export default Background


const BackgroundWrapper = styled.section`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 1024px;
    background-color: #00000033;
`