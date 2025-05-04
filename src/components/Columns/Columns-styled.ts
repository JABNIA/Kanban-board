import styled from "styled-components";

export const StatusColumnsWrapper = styled.div`
    width: 1440px;
    height: 100%;
    margin-left: 24px;
    padding-top: 24px;
    display: flex;
    justify-content: flex-start;
    gap: 24px;

    div{
        width: 280px;
    }
    .status-header{
        margin-bottom: 24px;
        font-weight: 700;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 2.4px;
        color: var(--color-Gray);
    }
`

export const TasksWrapper = styled.div<{darkMode: boolean}>`
    width: 280px;
    min-height: 800px;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;

    .task{
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