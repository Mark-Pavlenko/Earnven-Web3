import styled from 'styled-components';

export const MainLayout = styled.div`
  display: flex;
`;

export const SearchIcon = styled.img`
  height: 20px;
  width: 17px;
  margin-right: 10px;

  //padding-bottom: 15px;
  //margin-top: -13px;
`;

export const MainSearchElement = styled.div`
          width: 242px;
          background-color: localStorage.getItem('selectedTheme') == 'Day' ? 'white' : '#10142c';
          margin-left: 586px;
          border-radius: 11%;
`;
