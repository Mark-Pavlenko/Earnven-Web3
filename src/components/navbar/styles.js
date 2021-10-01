import styled from "styled-components";

export const NavbarContainer = styled.div`
  .navbar-container {
    width: 100%;
    padding: 1em;
    .navbar-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .logo-container {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        display: flex;
        padding: 0px;
        -moz-box-align: center;
        align-items: center;
        -moz-box-pack: start;
        justify-content: flex-start;
        .navbar-logo {
          display: flex;
          -moz-box-align: center;
          align-items: center;
          pointer-events: auto;
          justify-self: flex-start;
          margin-right: 12px;
        }
      }
      .navbar-tabs {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        align-items: center;
        justify-content: flex-start;
        justify-self: center;
        background-color: ${(props) =>
          props.theme === "light"
            ? "rgb(255, 255, 255)"
            : props.theme.swapContainer};
        width: fit-content;
        padding: 4px;
        border-radius: 16px;
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
        overflow: auto;
        .navbar-link {
          display: flex;
          flex-flow: row nowrap;
          border-radius: 3rem;
          outline: none;
          cursor: pointer;
          text-decoration: none;
          color: ${(props) =>
            props.theme === "light"
              ? "rgb(86, 90, 105)"
              : props.theme.fontColor};
          font-size: 1rem;
          width: fit-content;
          font-weight: 500;
          padding: 8px 12px;
          word-break: break-word;
        }
        .navbar-link:active {
          border-radius: 12px;
          font-weight: 600;
          color: rgb(0, 0, 0);
          background-color: rgb(237, 238, 242);
        }
      }
      .navbar-feature-wrapper {
        display: flex;
        .btn-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          border-radius: 12px;
          white-space: nowrap;
          width: 100%;
          cursor: pointer;
          .connect-button {
            text-align: center;
            outline: none;
            text-decoration: none;
            justify-content: center;
            position: relative;
            z-index: 1;
            will-change: transform;
            transition: transform 450ms ease 0s;
            transform: perspective(1px) translateZ(0px);
            font-size: 16px;
            display: flex;
            flex-flow: row nowrap;
            width: 100%;
            align-items: center;
            padding: 0.5rem;
            border-radius: 8px;
            cursor: pointer;
            user-select: none;
            font-weight: 500;
            background-color: ${(props) =>
              props.theme === "light" ? props.theme.back : props.theme.back};
            color: ${(props) =>
              props.theme === "light"
                ? props.theme.connect
                : props.theme.connect};
            border: 1px solid ${(props) =>
              props.theme === "light" ? props.theme.back : props.theme.back};
          }
          .swap-all-asset-button {
            & img {
              width: 32px;
              height: 32px;
              border-radius: 32px;
            }
          }
        }
        .change-theme-container {
          display: flex;
          align-items: center;
          .theme-button {
            position: relative;
            width: 100%;
            border: medium none;
            margin: 0px 0px 0px 8px;
            height: 35px;
            background-color: ${(props) =>
              props.theme === "light"
                ? "rgb(237, 238, 242)"
                : props.theme.option};
            padding: 0.15rem 0.5rem;
            border-radius: 0.5rem;
          }
        }
        .option-container {
          margin-left: 0.5rem;
          display: flex;
          -moz-box-pack: center;
          justify-content: center;
          -moz-box-align: center;
          align-items: center;
          position: relative;
          border: medium none;
          text-align: left;
          .navbar-options {
            width: 100%;
            border: medium none;
            margin: 0px;
            height: 35px;
            background-color: ${(props) =>
              props.theme === "light"
                ? "rgb(237, 238, 242)"
                : props.theme.option};
            padding: 0.15rem 0.5rem;
            border-radius: 0.5rem;
          }
        }
      }
    }
  }
  .tooltip-inner {
    color: #D50166 !important; 
    background-color: #FDEAF1 !important;
  }
`;

// background-color: rgb(247, 248, 250);