import styled from "styled-components";

export const MenuWrapper = styled.div<{visible: boolean, darkMode:boolean, firstLoad: boolean}>`
    position: absolute;
    top: 0;
    left: ${props => props.visible ? "0px": "-300px"};
    width: 300px;
    height: 1024px;
    padding: 32.78px 0 0 0;
    border-right: 1px solid ${props => props.darkMode ? "var(--color-Dark-Gray)" : "var(--color-Border)"};
    background-color: ${props => props.darkMode ? "var(--color-Dark-Components)" : "var(--color-White)"};
    animation: ${props => props.firstLoad ? "" : props.visible ? "menuSlideShow" : "menuSlideHide"};
    animation-duration: 300ms;
    animation-timing-function: linear;
    animation-iteration-count: 1;

    .menu-wrapper-logo{
        margin-bottom: 54px;
        padding-left: 34px;
    }
    .boards-names-wrapper{
        color: var(--color-Gray);
    }

    .boards-header{
        margin-bottom: 19px;
        padding-left: 34px;
        font-weight: 700;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 2.4px;

    }

    .board-icon{
        width: 16px;
        height: 16px;
    }
    
    .board-name{
        width: 276px;
        height: 48px;
        padding-left: 34px;
        display: flex;
        align-items: center;
        gap: 16px;
        font-weight: 700;
        font-size: 15px;
        line-height: 100%;
        letter-spacing: 0px;
        cursor: pointer;
    }

    .new-board-btn{
        width: 276px;
        height: 48px;
        padding-left: 34px;
        display: flex;
        gap: 16px;
        align-items: center;
        color: var(--color-Main);
        font-weight: 700;
        font-size: 15px;
        line-height: 100%;
        letter-spacing: 0px;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .btnIcon{
        width: ${props => props.visible ? "18px" :"16px"};
        height: ${props => props.visible ? "16px" :"10.2px"};
    }

    .btn-visible {
        position: absolute;
        bottom: 32px;
        left: 0;
        width: 276px;
        height: 48px;
        padding-left: 34px;
        display: flex;
        align-items: center;
        background-color: transparent;
        border: none;
        overflow: hidden;
        cursor: pointer;
        color: var(--color-Grey);
        animation: ButtonSlideRight;
        animation-duration: 300ms;
        animation-timing-function: linear;
    }
    
    .btn-hidden {
        position: absolute;
        bottom: 32px;
        right: -56px;
        width: 56px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top-right-radius: 100px;
        border-bottom-right-radius: 100px;
        background-color: var(--color-Main);
        border: none;
        cursor: pointer;
        color: var(--color-White);
        animation: ButtonSlideLeft;
        animation-duration: 300ms;
        animation-timing-function: linear;
    }

    .button-text{
        width: 75px;
        margin-left: 15px;
        display: ${props => props.visible ? "block" :"none"};
    }         

    .active{
        width: 276px;
        height: 48px;
        background-color: var(--color-Main);
        color: var(--color-White);
        fill: var(--color-White);
        border-top-right-radius: 100px;
        border-bottom-right-radius: 100px;

    }
`

export const ModeSwitch = styled.div<{darkMode: boolean}>`
    position: absolute;
    top: 888px;
    left: 24px;
    width: 251px;
    height: 48px;
    background-color: ${props => props.darkMode ? "var(--color-Dark-Background)" : "var(--color-White)"};
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 23.67px;

    .switch{
        width: 40px;
        height: 20px;
        padding: ${props => props.darkMode ? "3px 3px 3px 23px" : "3px" };
        background-color: var(--color-Main);
        border-radius: 10px;
        cursor: pointer;
    }

    .circle{
        width: 14px;
        height: 14px;
        display: block;
        background-color: var(--color-White);
        border-radius: 50%;
    }

    .mode-icon {
        width: 18px;
        height: 18px;
    }
`