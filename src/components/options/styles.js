import styled from 'styled-components';

export const StyledOptions = styled.div`
  .options-container {
    min-width: 8.125rem;
    background-color: ${(props) =>
      props.theme === 'light' ? props.theme.settings : props.theme.swapContainer};
    box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
      rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
    border-radius: 12px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    position: absolute;
    top: 3rem;
    z-index: 100;
    right: 0rem;
    .link {
      display: flex;
      flex: 1 1 0%;
      flex-direction: row;
      -webkit-box-align: center;
      align-items: center;
      padding: 0.5rem;
      color: ${(props) =>
        props.theme === 'light' ? props.theme.fontColor : props.theme.fontColor};

      text-decoration: none;
      cursor: pointer;
      font-weight: 500;
      .text {
        margin-left: 6px;
        &:hover {
          color: ${(props) =>
            props.theme === 'light' ? props.theme.fontColor : props.theme.fontColor};
        }
      }
    }
  }
`;
