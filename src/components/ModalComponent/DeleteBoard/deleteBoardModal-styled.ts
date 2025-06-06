import styled from "styled-components";


export const ModalWrapper = styled.div`
    position: absolute;
    top: 398px;
    left: 480px;
    width: 480px;
    height: 229px;
    padding: 32px 32px 40px 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-radius: 6px;
    background-color: #FFFFFF;

    .modalHeader{
        font-weight: 700;
        font-size: 18px;
        line-height: 100%;
        letter-spacing: 0px;
        color: var(--color-Tomato);
    }

    .message{
        font-weight: 500;
        font-size: 13px;
        line-height: 23px;
        letter-spacing: 0px;
        color: var(--color-Gray);
    }

    .buttons{
        width: 416;
        height: 40;
        display: flex;
        gap: 16px;
    }
    button{
        width: 200px;
        height: 40px;
        border-radius: 20px;
        border: none;
        font-family: Plus Jakarta Sans;
        font-weight: 700;
        font-size: 13px;
        line-height: 23px;
        letter-spacing: 0px;
        text-align: center;
        cursor: pointer     ;
    }
    .del-btn{
        background-color: var(--color-Tomato);
        color: var(--color-White);
    }

    .cancel {
        background-color: rgba(99, 95, 199, 0.1);
        color: var(--color-Main);
    }

    .del-btn:hover{
        background-color: var(--color-Tomato-Active);
    }

    .cancel {
        background-color: var(--color-Main-Opacity);
    }
`
