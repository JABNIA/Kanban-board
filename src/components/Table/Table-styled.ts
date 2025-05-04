import styled from "styled-components"

export const TableWrapper = styled.main<{darkMode: boolean, menuOpen: boolean, firstLoad:boolean}>`
    width: 1440px;
    height: 928px;
    padding-left: ${props => props.menuOpen ? "300px" : "0"};
    background-color: ${props => props.darkMode ? "var(--color-Dark-Background)" : "var(--color-Background)"};
    animation: ${props => props.firstLoad ? "" : props.menuOpen ? "slideFar" : "slideClose"};
    animation-duration: 300ms;
    animation-timing-function: linear;
    `