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
  display: block;
  @media screen and (max-width: 1445px) and (min-width: 1280px) {
    display: none;
  }
`;

export const AccountBalanceValueTablet = styled.p`
  margin-top: -4px;
  margin-left: 20px;
  color: ${(props) => (props.isLightTheme ? '#4453AD' : '#FFFFFF')};
  //color: red;
  font-family: 'Saira', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 31px;
  letter-spacing: 0;
  display: none;
  @media screen and (max-width: 1445px) and (min-width: 1280px) {
    display: block;
  }

  //@media screen and (max-width: 1279px) and (min-width: 710px) {
`;
