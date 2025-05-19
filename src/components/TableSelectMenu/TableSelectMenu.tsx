import { useDispatch, useSelector } from "react-redux";
import { MenuWrapper, ModeSwitch } from "./TableSelectMenu-styled";
import { AppDispatch, RootState } from "../../store/Store";
import { toogleSwitch } from "../../store/darkmode/DarkMode";
import { toogle } from "../../store/Toogle/ToogleSlice";
import { AddBoard } from "../../store/addNewBoard/addNewBoardSlice";
import { setBoard } from "../../store/Table/TableSlice";
import { useEffect } from "react";

function TableSelectMenu() {
  const toogleSelectMenu = useSelector(
    (state: RootState) => state.toogleMenu.open
  );
  const toogleDarkMode = useSelector(
    (state: RootState) => state.switchMode.darkMode
  );
  const fetchData = useSelector((state: RootState) => state.Boards.boards);
  const firstLoad = useSelector(
    (state: RootState) => state.toogleMenu.firstLoad
  );
  const activeBoard = useSelector(
    (state: RootState) => state.Table
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(toogle);
  };

    useEffect(() => {}, [activeBoard])

  return (
    <MenuWrapper
      visible={toogleSelectMenu}
      darkMode={toogleDarkMode}
      firstLoad={firstLoad}
    >
      <div className="menu-wrapper-logo">
        <img
          src={`./src/assets/icons/${
            toogleDarkMode ? "logo-Light.svg" : "logo-dark.svg"
          }`}
          alt="Logo"
        />
      </div>
      <div className="boards-names-wrapper">
        <p className="boards-header">ALL BOARDS ({fetchData.length})</p>
        <ul>
          {fetchData.map((board) => {
            return (
              <li
                key={board.name}
                className={
                  activeBoard.name === board.name
                    ? "board-name active"
                    : "board-name"
                }
                onClick={() => {
                  dispatch(setBoard({...board}))}}
              >
                <div className="board-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z"
                      fill={
                        activeBoard.name === board.name ? "#FFFFFF" : "#828FA3"
                      }
                    />
                  </svg>
                </div>
                <span>{board.name}</span>
              </li>
            );
          })}
        </ul>
        <button className="new-board-btn" onClick={() => dispatch(AddBoard())}>
          <div className="board-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z"
                fill="#635FC7"
              />
            </svg>
          </div>
          <span>+ Create New Board</span>
        </button>
        <ModeSwitch
          darkMode={toogleDarkMode}
          onClick={() =>
            toogleDarkMode
              ? dispatch(toogleSwitch(false))
              : dispatch(toogleSwitch(true))
          }
        >
          <img
            className="mode-icon"
            src="./src/assets/icons/icon-light-theme.svg"
            alt="light"
          />
          <div className="switch">
            <span className="circle"></span>
          </div>
          <img
            className="mode-icon"
            src="./src/assets/icons/icon-dark-theme.svg"
            alt="dark"
          />
        </ModeSwitch>
        <button
          className={toogleSelectMenu ? "btn-visible" : "btn-hidden"}
          onClick={() =>
            toogleSelectMenu ? dispatch(toogle(false)) : dispatch(toogle(true))
          }
        >
          <img
            className="btnIcon"
            src={`./src/assets/icons/${
              toogleSelectMenu
                ? "icon-hide-sidebar.svg"
                : "icon-show-sidebar.svg"
            }`}
            alt=""
            onClick={handleClick}
          />
          <span className="button-text">Hide Sidebar</span>
        </button>
      </div>
    </MenuWrapper>
  );
}

export default TableSelectMenu;
