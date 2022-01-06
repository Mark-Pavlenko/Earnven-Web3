import styled from 'styled-components';

export const SocialNetorksMainLayout = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 20px;

  // width: 100px;
  //background-color: red;
  margin-top: 30px;
  margin-left: 125px;
`;

export const NetworksSubColumn = styled.div`
  overflow: hidden;

  img:hover {
    overflow: hidden;
    padding: 4px;
    border-radius: 10px;
    background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C')};
    box-shadow: ${(props) =>
      props.isLightTheme
        ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
        : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};

    backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
  }

  img:first-child {
    margin-bottom: 20px;
  }
`;
