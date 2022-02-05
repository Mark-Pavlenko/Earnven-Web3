import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: -20px 0 0 0;

  @media (max-width: 480px) {
    justify-content: space-between;
    margin: 0 0 0 -10px;
  }
`;

export const InfoCard = styled.div`
  width: 200px;
  height: 100px;
  margin: 5px;
  padding-left: 15px;

  @media (max-width: 480px) {
    width: 165px;
    height: 80px;
    padding-left: 0;
  }
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

  @media (max-width: 480px) {
    justify-content: space-between;
    width: 148px;
    margin: 20px 0 0 0;
  }
`;

export const Value = styled.div`
  font-size: 10px;
  margin: 20px 0 0 10px;

  @media (max-width: 480px) {
    justify-content: space-between;
    margin: 20px 0 0 0;
  }
`;
