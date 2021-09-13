import styled from "styled-components";

export const StyledCurrencyContainer = styled.div`
  .currency-list-wrapper {
    padding: 4px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.isImported ? "none" : "rgba(0, 0, 0,0.08)"};
    }
    border-radius: 10px;
    .currency-logo {
      width: 35px;
      height: 35px;
      border-radius: 35px;
      box-shadow: rgba(0, 0, 0, 0.075) 0px 6px 10px;
      background-color: rgb(255, 255, 255);
      margin-right: 8px;
      .currency-name-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .currency-name {
          box-sizing: border-box;
          margin: 0px;
          min-width: 0px;
          font-weight: 500;
        }
        .currency-desc {
          box-sizing: border-box;
          margin: 0px;
          min-width: 0px;
          font-weight: 300;
          font-size: 12px !important;
        }
      }
    }
  }
  .import-button {
    text-align: right;
    outline: none;
    text-decoration: none;
    justify-content: right;
    position: relative;
    z-index: 1;
    will-change: transform;
    transition: transform 450ms ease 0s;
    transform: perspective(1px) translateZ(0px);
    font-size: 16px;
    display: inline;
    align-items: right;
    padding: 0.2rem 0.7rem;
    margin-top: 7px;
    margin-right: 20px;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    font-weight: 500;
    background-color: #2172E5;
    color: #eee;
    border: 1px solid ${(props) =>
      props.theme === "light" ? props.theme.back : props.theme.back};
  }
`;
