import styled from 'styled-components';
import performanceD1 from '../../../../assets/images/performanceD1.png';
import performanceD2 from '../../../../assets/images/performanceD2.png';
import performanceD3 from '../../../../assets/images/performanceD3.png';
import performanceD4 from '../../../../assets/images/performanceD4.png';
import performanceD5 from '../../../../assets/images/performanceD5.png';
import performanceD6 from '../../../../assets/images/performanceD6.png';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    justify-content: space-between;
  }
`;

export const InfoCard = styled.div`
  position: relative;
  width: 132px;
  height: 90px;
  margin: 5px;
  border-radius: 10px;

  &:nth-child(1) {
    background-image: url(${performanceD1});
  }
  &:nth-child(2) {
    background-image: url(${performanceD2});
  }
  &:nth-child(3) {
    background-image: url(${performanceD3});
  }
  &:nth-child(4) {
    background-image: url(${performanceD4});
  }
  &:nth-child(5) {
    background-image: url(${performanceD5});
  }
  &:nth-child(6) {
    background-image: url(${performanceD6});
  }

  @media (max-width: 480px) {
    width: 165px;
    background-size: cover;
    margin: 10px 0;
    border-radius: 20px;
  }
`;

export const Mark = styled.div`
  font-size: 10px;
  margin: 20px 0 0 10px;

  @media (max-width: 480px) {
    margin: 30px 0 0 20px;
  }
`;

export const Value = styled.div`
  font-size: 16px;
  margin: 14px 0 0 10px;

  @media (max-width: 480px) {
    margin: 14px 0 0 15px;
  }
`;
