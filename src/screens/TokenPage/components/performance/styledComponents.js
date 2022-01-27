import styled from 'styled-components';
import performance_1 from '../../../../assets/images/performance-1.jpg';
import performance_2 from '../../../../assets/images/performance-2.jpg';
import performance_3 from '../../../../assets/images/performance-3.jpg';
import performance_4 from '../../../../assets/images/performance-4.jpg';
import performance_5 from '../../../../assets/images/performance-5.jpg';
import performance_6 from '../../../../assets/images/performance-6.jpg';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    justify-content: space-between;
  }
`;

export const InfoCard = styled.div`
  width: 132px;
  height: 90px;
  margin: 5px;
  border-radius: 10px;
  box-shadow: 4px 6px 20px -5px rgba(51, 78, 131, 0.17);

  &:nth-child(1) {
    background-image: url(${performance_1});
  }
  &:nth-child(2) {
    background-image: url(${performance_2});
  }
  &:nth-child(3) {
    background-image: url(${performance_3});
  }
  &:nth-child(4) {
    background-image: url(${performance_4});
  }
  &:nth-child(5) {
    background-image: url(${performance_5});
  }
  &:nth-child(6) {
    background-image: url(${performance_6});
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
