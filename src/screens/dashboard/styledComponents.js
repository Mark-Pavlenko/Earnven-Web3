import styled from 'styled-components';

export const TokenButtonsBlock = styled.div``;

export const TokenButton = styled.div`
  width: 40px;
  height: 40px;
  background: ${(props) => `url(${props.icon}) no-repeat top center`};
  border-radius: 10px;
  margin-left: 30px;
  border: none;
  cursor: pointer;
`;
