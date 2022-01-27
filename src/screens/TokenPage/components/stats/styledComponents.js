import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: -20px 0 0 0;
`;

export const InfoCard = styled.div`
  width: 200px;
  height: 100px;
  margin: 5px;
  padding-left: 15px;
`;

export const Mark = styled.div`
  display: flex;
  font-size: 16px;
  margin: 20px 0 0 10px;

  & img {
    width: 20px;
    height: 20px;
    margin: 2px 5px 0 0;
  }
`;

export const Value = styled.div`
  font-size: 10px;
  margin: 20px 0 0 10px;
`;
