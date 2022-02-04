import styled from 'styled-components';

export const Main = styled.div`
  //border: 1px solid red;
  max-width: 1920px;
`;

export const TopContainer = styled.div`
  //border: 1px solid green;
  margin: 35px 0 0 0;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1440px) {
    flex-direction: column;
    //width: 100%;
  }
`;

export const LeftSideWrapper = styled.div`
  max-width: 885px;
  width: 62%;
  margin-right: 35px;
  //border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const RightSideWrapper = styled.div`
  //width: 525px;
  width: 38%;
  //border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const BottomContainer = styled.div`
  //border: 1px solid red;
`;
