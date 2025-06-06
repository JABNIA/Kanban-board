import { useDispatch, useSelector } from 'react-redux';
import { AddNewTaskBtn, HeaderWrapper } from './Header-styled';
import { AppDispatch, RootState } from '../../store/Store';
import { newTaskModalOpen } from '../../store/addNewTask/addNewTaskSlisce';
import { openModal } from '../../store/Modal/ModalSlice';
import { deleteBoardModalOpen } from '../../store/deleteFunctional/deleteSlice';
import { editBoardModalOpen } from '../../store/editBoard/editBoardSlice';
import { useState } from 'react';
import ModalComponent from '../ModalComponent/ModalComponent';

function Header() {
  const dispatch = useDispatch<AppDispatch>()
  const toogleDarkMode = useSelector((state:RootState) => state.switchMode.darkMode)
  const toogleTableMenuOpen = useSelector((state:RootState) => state.toogleMenu.open)
  const activeBoard = useSelector((state: RootState) => state.Table)
  const [boardMenu, setBoardmenu] = useState<boolean>(false)
  
  const handleAddNewTask = () => {
    dispatch(newTaskModalOpen())
    dispatch(openModal())
  }


  return (    
    <HeaderWrapper menuOpen={toogleTableMenuOpen} darkMode={toogleDarkMode}>
        <div className="logo">
          <img src={`./src/assets/icons/${toogleDarkMode ? "logo-Light.svg" : "logo-dark.svg"}`} alt="Logo" />
          </div>
        <p className="table-name">{activeBoard.name}</p>
        <div className="button-container">
            <AddNewTaskBtn onClick={handleAddNewTask}>+ Add New Task</AddNewTaskBtn>
            <img src="./src/assets/icons/icon-vertical-ellipsis.svg" alt="ellipsis" onClick={() => setBoardmenu(prev => !prev)}/>
        </div>
            {
              boardMenu && 
              <BoardMenu />
            }
    </HeaderWrapper>
  )
}

export default Header;


function BoardMenu() {
  const dispatch = useDispatch<AppDispatch>()
  const handleClichOnEdit = () => {
    dispatch(openModal())
    dispatch(editBoardModalOpen())
  }

  const handleClichOnDelete = () => { 
    dispatch(openModal())
    dispatch(deleteBoardModalOpen())
  }
  return (
    <div className='dropdown'>
      <p className="edit" onClick={handleClichOnEdit}>Edit Board</p>
      <p className="delete" onClick={handleClichOnDelete}>Delete Board</p>
    </div>
  )
}