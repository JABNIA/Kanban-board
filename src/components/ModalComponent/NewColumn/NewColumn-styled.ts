import styled from "styled-components";

export const NewColumnWrapper = styled.div<{darkMode: boolean}>`
    position: absolute;
    top: 298px;
    left: 480px;
    width: 480px;
    height: auto;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-radius: 6px;
    background-color: ${props => props.darkMode ? "var(--color-Background)" : "#FFFFFF"};

    .header{
        font-weight: 700;
        font-size: 18px;
        line-height: 100%;
        letter-spacing: 0px;
    }

    .section-name{
        margin-bottom: 8px;
        font-weight: 700;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 0px;
        color: var(--color-Gray);
 
    }
    
    .board-name {
        width: 416px;
        height: 40px;
        padding: 8px 16px;
        border-radius: 4px;
        border-width: 1px;
        border: 1px solid var(--color-Gray-Opacity);
    }

    .board-columns{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .board-columns > li {
        display: flex;
        align-items: center;
    }
    
    .column-name{
        width: 385px;
        height: 40px;
        margin-right: 16px;
        padding: 8px 16px;
        border-radius: 4px;
        border: 1px solid var(--color-Gray-Opacity);
    }

    .cross{
        width: 15px;
        height: 15px;
    }

    .buttons{
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
 
    .btn {
        width: 416px;
        height: 40px;
        border-radius: 20px;
        border: none;
        font-weight: 700;
        font-size: 13px;
        line-height: 23px;
        letter-spacing: 0px;
        text-align: center;

    }
    
    .new-column{
        background-color: var(--color-Main-Opacity);
        color: var(--color-Main);
    }

    .save-btn{
        background-color: var(--color-Main);
        color: var(--color-White);
    }
`