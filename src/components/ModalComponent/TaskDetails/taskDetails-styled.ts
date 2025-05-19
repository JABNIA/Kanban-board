import styled from "styled-components"

export const DetailsWrapper = styled.div<{darkMode: boolean}>`
    position: absolute;
    top: 251px;
    left: 480px;
    width: 480px;
    height: auto;
    padding: 32px;
    background-color: ${props => props.darkMode ? "var(--color-Dark-Components)":"var(--color-White)"};
    color:  ${props => props.darkMode ? "var(--color-White)":"var(--color-Black)"};

    .task-title{
        display: flex;
        justify-content: space-between;
        font-weight: 700;
        font-size: 18px;
        line-height: 100%;
        letter-spacing: 0px;
        margin-bottom: 24px;
    }

    .task-description{
        font-weight: 500;
        font-size: 13px;
        line-height: 23px;
        letter-spacing: 0px;
        margin-bottom: 24px;
    }

    .subtasks-header{
        font-weight: 700;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 0px;
        margin-bottom: 16px;
    }

    label {
        display: flex;
        align-items: center;
        width: 356px;
        cursor: pointer;
        color:  ${props => props.darkMode ? "var(--color-Gray)":"var(--color-Black)"};
    }
    
    .subtask-label-undone{
        font-weight: 700;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 0px;
        color:  ${props => props.darkMode ? "var(--color-White)":"var(--color-Black)"};
    }

    .subtask-label-done{
        font-weight: 700;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 0px;
        text-decoration: line-through;
        color:  var(--color-Gray);
    }
    
    .subtask-list{
        margin-bottom: 24px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .subtask-list input[type="checkbox"]{
        display: none;
    }
    
    .subtask-list label::before{
        content: " ";
        width: 16px;
        height: 16px;
        display: block;
        margin-right: 16px;
        border-radius: 2px;
        border: 1px solid #828FA33F;
        flex-shrink: 0;
    }
    
    .subtask-list input[type="checkbox"]:checked + label::before{
        content: url('../../src/assets/icons/checkmark.svg');
        display: block;
        box-sizing: border-box;
        padding-left: 3px;
        width: 16px;
        height: 16px;
        margin-right: 16px;
        border-radius: 2px;
        border: none;
        background-color: var(--color-Main);
        font-size: 16px;
    }
    
    .subtask{
        display: flex;
        align-items: center;
        width: 416px;
        height: 40px;
        padding: 12px;
        border-radius: 4px;
        background-color:  ${props => props.darkMode ? "var(--color-Dark-Background)":"var(--color-Border)"};
        cursor: pointer;
    }
    
    .subtask:hover{
        background-color: var(--color-Main-Opacity);
    }
    .status-header{
        font-weight: 700;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 0px;
        color: var(--color-Gray)
    }
    
    .status-selection{
        width: 416px;
        height: 40px;
        margin-top: 8px;
        padding: 0px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid var(--color-Border);
        border-radius: 4px;
        cursor: pointer;
    }

    .status-list{
        position: absolute;
        width: 416px;
        height: auto;
        padding: 16px 0;
        background-color:  ${props => props.darkMode ? "var(--color-Dark-Background)":"var(--color-White)"};;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    .status-list:focus{
        border: 1px solid var(--color-Main);
    }
    .status-list-item{
        width: auto;
        height: 25px;
        margin: 4px 0;
        padding: 0 16px;
        cursor: pointer;
    }

    .status-list-item:hover{
        background-color: var(--color-Main);
        color: var(--color-White);
    }

    .settings{
        position: absolute;
        top: 98px;
        left: 353px;
        width: 192px;
        height: 94px;
        padding: 16px;
        background-color:  ${props => props.darkMode ? "var(--color-Dark-Background)":"var(--color-White)"};;
        border-radius: 8px;
    }
    
    .edit{
        margin-bottom: 16px;
        font-weight: 500;
        font-size: 13px;
        line-height: 23px;
        letter-spacing: 0px;
        color:  var(--color-Gray);
    }

    .delete{
        font-weight: 500;
        font-size: 13px;
        line-height: 23px;
        letter-spacing: 0px;
        color:  var(--color-Tomato);
    }
`
