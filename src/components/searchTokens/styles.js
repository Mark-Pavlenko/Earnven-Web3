import styled from 'styled-components';

export const MainLayout = styled.div`
  display: flex;
`;

export const SearchIcon = styled.img`
  height: 20px;
  width: 17px;
  margin-right: 10px;
`;

export const CoinItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;

  img {
    width: 20px;
    height: 20px;
  }

  span {
    margin-left: 10px;
  }
`;
