import styled from 'styled-components';

export const MainLayout = styled.div`
  width: 242px;
`;

export const MainSearchElement = styled.div`
          width: 242px;
          background-color: localStorage.getItem('selectedTheme') == 'Day' ? 'white' : '#10142c';
          margin-left: 586px;
          border-radius: 11%;
`;

// background: ${(props) => (props.isLightTheme ? '#FFFFFF' : '#8F86FF')};
