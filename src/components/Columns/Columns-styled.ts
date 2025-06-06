import styled from "styled-components";

export const StatusColumnsWrapper = styled.div`
    width: 1440px;
    height: 800px;
    margin-left: 24px;
    padding-top: 24px;
    display: flex;
    justify-content: flex-start;
    gap: 24px;
    
    
    div{
        border-radius: 8px;
        width: 280px;
    }

    .status-header{
        font-weight: 700;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 2.4px;
        color: var(--color-Gray);
    }

    .new-column-btn {
        width: 280px;
        height: 814px;
        margin-top: 39px;
        padding: 392px 55.5px;
        border-radius: 6px;
        background: linear-gradient( #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%);
    }

    .btn-text {
        font-weight: 700;
        font-size: 24px;
        line-height: 100%;
        letter-spacing: 0px;
        text-align: center;
        color: var(--color-Gray);
    }

`

export const TasksWrapper = styled.div<{darkMode: boolean, isDraggedOver: boolean}>`
    position: relative;
    width: 280px;
    min-height: 800px;
    padding: 24px 0;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;   
    background-color: ${props => props.isDraggedOver ? "var(--color-Main-Opacity)" : "transparent"};

    .task-wrapper{
        padding: 10px 0;
    }
    .task{
        position: relative;
        width: 280px;
        height: auto;
        padding: 23px 16px;
        border-radius: 8px;
        background-color: ${props => props.darkMode ? "var(--color-Dark-Gray)" : "var(--color-White)"};
        cursor: pointer;
    }

    .task-title{
        font-weight: 700;
        font-size: 15px;
        line-height: 100%;
        letter-spacing: 0px;
        margin-bottom: 8px;
        color: ${props => props.darkMode ? "var(--color-White)" : "var(--color-Black)"};
    }

    .subtasks-info{
        font-weight: 700;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 0px;
        color: var(--color-Gray);
    }
`