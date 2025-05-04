import { TableWrapper } from "./Table-styled";
import TaskColumns from "../Columns/TaskColumns";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";


function Table() {
  const menuOpen = useSelector((state: RootState) => state.toogleMenu.open);
  const darkMode = useSelector((state: RootState) => state.switchMode.darkMode);
  const firstLoad = useSelector((state: RootState) => state.toogleMenu.firstLoad)


  return (
    <TableWrapper darkMode={darkMode} menuOpen={menuOpen} firstLoad={firstLoad}>
      <TaskColumns /> 
    </TableWrapper>
  )
}

export default Table
