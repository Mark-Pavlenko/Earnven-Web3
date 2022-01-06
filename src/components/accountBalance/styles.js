import styled from 'styled-components';

export const AccountBalanceValue = styled.p`
  margin-top: -4px;
  margin-left: 20px;
  color: ${(props) => (props.isLightTheme ? '#4453AD' : '#FFFFFF')};
  font-family: 'Saira', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 31px;
  letter-spacing: 0;
`;
