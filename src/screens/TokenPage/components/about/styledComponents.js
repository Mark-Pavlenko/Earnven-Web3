import styled from 'styled-components';

export const Content = styled.div`
  font-size: 14px;
  font-weight: 400;
  padding: 10px;
  color: #1e1e20;

  @media (max-width: 480px) {
    padding: 0;
  }
`;

export const Button = styled.div`
  width: 150px;
  height: 40px;
  font-size: 14px;
  font-weight: 400;
  padding: 10px;
  background: #ffffff;
  box-shadow: inset 0 5px 10px -6px rgba(51, 78, 131, 0.12);
  border-radius: 10px;
  cursor: pointer;
  margin: 0 auto;
  text-align: center;
`;
