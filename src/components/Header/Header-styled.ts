import styled from 'styled-components';

export const HeaderWrapper = styled.header<{menuOpen: boolean, darkMode: boolean}>`
    width: 1440px;
    height: 96px;
    background-color: ${props => props.darkMode ? "var(--color-Dark-Components)" : "var(--color-White)" };
    border-bottom: 1px solid  ${props => props.darkMode ? "var(--color-Dark-Gray)" : "var(--color-Border)" };
    display: flex;
    color:  ${props => props.darkMode ? "var(--color-White)" : "var(--color-Black)"};

    .logo{
        flex: 2;
        display: flex;
        align-items: center;
        border-right: 1px solid ${props => props.darkMode ? "var(--color-Dark-Gray)" : "var( --color-Border)"};
        margin-left: 24px;
    
    }

    .table-name{
        padding: ${props => props.menuOpen ? "32px 100px 37px" : "32px 29px 37px"};
        flex: 8;
        font-weight: 700;
        font-size: 24px;
        line-height: 100%;
        letter-spacing: 0px;
        text-align: left;
    }

    .button-container{
        margin-right: 32.38px;
        flex: 2;
        display: flex;
        align-items: center;
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