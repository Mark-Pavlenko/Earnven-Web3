import styled from 'styled-components';

export const Main = styled.div`
  max-width: 1535px;

  @media (max-width: 480px) {
    width: 375px;
  }
`;

export const Desktop = styled.div`
  display: block;
  @media (max-width: 480px) {
    display: none;
  }
`;

export const Mobile = styled.div`
  display: none;
  @media (max-width: 480px) {
    display: block;
  }
`;

export const TopContainer = styled.div`
  margin: 35px 0 0 0;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1440px) {
    flex-direction: column;
  }
`;

export const LeftSideWrapper = styled.div`
  //max-width: 885px;
  width: 60%;
  margin-right: 35px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 1440px) {
    width: 100%;
  }
`;

export const RightSideWrapper = styled.div`
  //width: 525px;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 1440px) {
    //max-width: 885px;
    width: 100%;
  }
`;

export const BottomContainer = styled.div`
  @media (max-width: 1440px) {
    //max-width: 885px;
    width: 100%;
  }
`;
