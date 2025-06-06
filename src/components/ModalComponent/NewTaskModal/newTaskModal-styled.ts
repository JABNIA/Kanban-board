import styled from "styled-components";

export const NewTaskModalWrapper = styled.div<{darkMode: boolean}>`
    position: absolute;
    top: 175px;
    left: 480px;
    width: 480px;
    height: auto;
    padding: 32px;
    border-radius: 6px;
    background-color: ${props => props.darkMode ? "var(--color-Dark-Components)" : "var(--color-White)"};
    color: ${props => props.darkMode ? "var(--color-White)" : "var(--color-Black)"};

    input, textarea {
        background-color: transparent;
        color: ${props => props.darkMode ? "var(--color-White)" : "var(--color-Black)"};
    }

    .simple-wrapper{
        position: relative;
        margin-bottom: 24px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .header{
        font-weight: 700;
        font-size: 18px;
        line-height: 100%;
        letter-spacing: 0px;
    }

    .inputName{
        font-weight: 700;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 0px;
        color: ${props => props.darkMode ? "var(--color-White)" : "var(--color-Gray)"};
    }

    .task-inputs, .status-selection{
        width: 416px;
        height: 40px;
        padding: 0 0 0 16px;
        border: 1px solid var(--color-Gray-Opacity);
        border-radius: 4px;
    }

    .subtask-inputs{
        width: 385px;
        height: 40px;
        margin-right: 16px;
        padding-left: 16px;
        border: 1px solid var(--color-Gray-Opacity);
        border-radius: 4px;
    }

    .subtasks{
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .description{
        height: 112px;
        padding-top: 8px;
        resize: none;
    }

    .modal-btn{
        width: 416px;
        height: 40px;
        border: none;
        border-radius: 20px;
        font-weight: 700;
        font-size: 13px;
        line-height: 23px;
        letter-spacing: 0px;
        text-align: center;

    }

    .add-subtask{
        background-color: ${props => props.darkMode ? "#FFFFFF" : "var(--color-Main-Opacity)"};
        color: ${props => props.darkMode ? "var(--color-Main)" : "#FFFFFF"};
    }

    .create-task{
        background-color: #635FC7;
        color: var(--color-White);
    }

    .status-selection {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
    }

    .status-list {
        position: absolute;
        width: 416px;
        height: auto;
        top: 40px;
        padding: 16px 0;
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        background-color: ${props => props.darkMode ? "var(--color-Dark-Background)" : "var(--color-White)"};
    }
    
    .status-list-item {
        padding: 0 16px;
        margin: 4px 0;
        cursor: pointer;
    }

    .status-list-item:hover{
        background-color: var(--color-Main);
        color: var(--color-White);
    }
`