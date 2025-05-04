import { useDispatch, useSelector } from 'react-redux'
import { AddNewTaskBtn, HeaderWrapper } from './Header-styled'
import { AppDispatch, RootState } from '../../store/Store'
import useBoardContext from '../../context'
import { newTaskModalOpen } from '../../store/addNewTask/addNewTaskSlisce'


function Header() {
  const dispatch = useDispatch<AppDispatch>()
  const toogleDarkMode = useSelector((state:RootState) => state.switchMode.darkMode)
  const toogleTableMenuOpen = useSelector((state:RootState) => state.toogleMenu.open)
  const {activeBoard} = useBoardContext();
  
  const handleAddNewTask = () => {
    dispatch(newTaskModalOpen())
  }


  return (    
    <HeaderWrapper menuOpen={toogleTableMenuOpen} darkMode={toogleDarkMode}>
        <div className="logo">
          <img src={`./src/assets/icons/${toogleDarkMode ? "logo-Light.svg" : "logo-dark.svg"}`} alt="Logo" />
          </div>
        <p className="table-name">{activeBoard.name}</p>
        <div className="button-container">
            <AddNewTaskBtn onClick={handleAddNewTask}>+ Add New Task</AddNewTaskBtn>
            <img src="./src/assets/icons/icon-vertical-ellipsis.svg" alt="ellipsis" />
        </div>
    </HeaderWrapper>
  )
}

export default Header
