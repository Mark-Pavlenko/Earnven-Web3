import styled from "styled-components";

export const StyledManageTokenContainer = styled.div`
  .manage-token-body {
    color: ${(props) => props.theme.color};
    padding: 12px;
    border-radius: 10px;
    margin-top: 10px;
    .manage-token-list-wrapper {
      height: 42px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      border-radius: 10px;
      .manage-token-logo {
        width: 35px;
        height: 35px;
        border-radius: 35px;
        box-shadow: rgba(0, 0, 0, 0.075) 0px 6px 10px;
        background-color: rgb(255, 255, 255);
        margin-right: 8px;
        .manage-token-name-container {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          .manage-token-name {
            box-sizing: border-box;
            margin: 0px;
            min-width: 0px;
            font-weight: 500;
          }
          .manage-token-desc {
            box-sizing: border-box;
            margin: 0px;
            min-width: 0px;
            font-weight: 300;
            font-size: 12px !important;
          }
        }
      }
    }
    .switch {
      height: 42px;
    }
  }
`;
