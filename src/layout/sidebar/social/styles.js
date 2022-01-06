import styled from 'styled-components';

export const NetworksGridList = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
  margin-left: 125px;

  li {
    padding: 4px;
  }

  li:first-child {
    margin-bottom: 20px;
  }

  li:hover {
    border-radius: 10px;
    background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C')};
    box-shadow: ${(props) =>
      props.isLightTheme
        ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
        : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
    backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
  }
`;

export const NetworksSubColumn = styled.div``;
