import styled from "styled-components";

export const StyledTransactionSubmitted = styled.div`
.transaction-submitted-container 
{
    text-align: center;
    padding: 15px 17px;
    border-radius: 20px;
    background-color: ${(props) =>
        props.theme === "light" ? props.theme.body : props.theme.swapContainer};
    .close-button 
    {
        text-align: right;
        svg 
        {
            cursor: pointer;
        }
    }
    .arrow-up-logo 
    {
        padding: 50px;
    }
    .confirmation-header 
    {
        font-size: 1.4rem;
        font-weight: 500;
        margin-bottom: 4px;
        color: ${(props) => props.theme.connect};
    }
    .explorer-view 
    {
        margin-bottom: 25px;
        a 
        {
            color: rgb(243, 183, 30);
        }
    }
    .wallet-confirm 
    {
        font-size: 0.83rem;
    }
    .metamask-add 
    {
        padding: 5px 12px;
        width: fit-content;
        text-align: center;
        border-radius: 15px;
        outline: currentcolor none medium;
        border: 1px solid transparent;
        text-decoration: none;
        display: inline;
        -moz-box-pack: center;
        justify-content: center;
        -moz-box-align: center;
        align-items: center;
        cursor: pointer;
        position: relative;
        z-index: 1;
        background-color: rgba(243, 132, 30, 0.05);
        color: rgb(243, 183, 30);
        font-size: 16px;
        font-weight: 500;
    }
    .bottom-close-buton 
    {
        margin-top: 35px;
        padding: 7px 10px;
        width: 100%;
        text-align: center;
        border-radius: 20px;
        outline: currentcolor none medium;
        border: 1px solid transparent;
        text-decoration: none;
        display: flex;
        -moz-box-pack: center;
        justify-content: center;
        flex-wrap: nowrap;
        -moz-box-align: center;
        align-items: center;
        cursor: pointer;
        position: relative;
        z-index: 1;
        background-color: ${(props) => props.theme.back};
        color: ${(props) => props.theme.connect};
        font-size: 1.3rem;
        font-weight: 500;
    }
}

`;