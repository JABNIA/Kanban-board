import styled from "styled-components";

export const NewBoardWrapper = styled.div`
    position: absolute;
    width: 480px;
    height: auto;
    top: 298px;
    left: 480px;
    padding: 32px;
    border-radius: 6px;
    background-color: #FFFFFF;

    .header{
        margin-bottom: 24px;
        font-weight: 700;
        font-size: 18px;
        line-height: 100%;
        letter-spacing: 0px;
    }

    .input-name-label{
        margin:  0 0 8px 0;
        font-weight: 700;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 0px;
        color: var(--color-Gray);
    }

    .board-name{
        width: 416px;
        height: 40px;
        margin-top: 8px;
        border: 1px solid var(--color-Border);
        border-radius: 4px;
    }

    .column-name{
        width: 385px;
        height: 40px;
        border: 1px solid var(--color-Border);
        border-radius: 4px; 
    }

    .column-names-inputs{
        margin-top: 24px;
        display: flex;
        flex-direction: column;
    }

    .cross{
        width: 15px;
        height: 15px;
    }
    
    .input-wrapper{
        width: 416px;
        height: 40px;
        margin-bottom: 12px;
        display: flex;
        gap: 16px;
        align-items: center;
    }

    .new-column{
        width: 416px;
        height: 40px;
        margin-bottom: 24px;
        border-radius: 20px;
        background-color: var(--color-Main-Opacity);
        color: var(--color-Main);
        border: none;
        font-weight: 700;
        font-size: 13px;
        line-height: 23px;
        letter-spacing: 0px;
        text-align: center;
    }

    .new-board{
        width: 416px;
        height: 40px;
        border: none;
        border-radius: 20px;
        font-weight: 700;
        font-size: 13px;
        line-height: 23px;
        letter-spacing: 0px;
        text-align: center;
        background-color: var(--color-Main);
        color: var(--color-White);
}
`