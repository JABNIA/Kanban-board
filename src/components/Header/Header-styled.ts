import styled from 'styled-components';

export const HeaderWrapper = styled.header<{menuOpen: boolean, darkMode: boolean}>`
    width: 1440px;
    height: 96px;
    background-color: ${props => props.darkMode ? "var(--color-Dark-Components)" : "var(--color-White)" };
    border-bottom: 1px solid  ${props => props.darkMode ? "var(--color-Dark-Gray)" : "var(--color-Border)" };
    display: flex;
    color:  ${props => props.darkMode ? "var(--color-White)" : "var(--color-Black)"};

    .logo{
        width: 209px;
        display: flex;
        align-items: center;
        border-right: 1px solid ${props => props.darkMode ? "var(--color-Dark-Gray)" : "var( --color-Border)"};
        margin-left: 24px;
    
    }

    .table-name{
        width: 1005px;
        padding: ${props => props.menuOpen ? "32px 100px 37px" : "32px 29px 37px"};
        font-weight: 700;
        font-size: 24px;
        line-height: 100%;
        letter-spacing: 0px;
        text-align: left;
    }

    .button-container{
        width: 192.62px;
        margin: 32.38px;
        position: relative;
        display: flex;
        align-items: center;
    }

    .dropdown{
        position: absolute;
        top: 90px;
        right: 24px;
        width: 192px;
        height: 94px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        border-radius: 8px;
        background-color: ${props => props.darkMode ? "var(--color-Dark-Components)" : "var(--color-White)" };
        box-shadow: 0.5px 0.5px 1px var(--color-Gray);
    }

    .edit {
        font-weight: 500;
        font-size: 13px;
        line-height: 23px;
        letter-spacing: 0px;
        color: var(--color-Gray);
    }

    .delete {
        font-weight: 500;
        font-size: 13px;
        line-height: 23px;
        letter-spacing: 0px;
        color: var(--color-Tomato);
    }
`

export const AddNewTaskBtn = styled.button`
    width: 164px;
    height: 48px;
    margin-right: 24px;
    font-weight: 700;
    font-size: 15px;
    line-height: 100%;
    letter-spacing: 0px;
    background-color:var(--color-Main);
    color: var(--color-White);
    border: none;
    border-radius: 24px;
`