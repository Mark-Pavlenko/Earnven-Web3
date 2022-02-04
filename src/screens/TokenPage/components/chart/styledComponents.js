import styled from 'styled-components';

export const TextFields = styled.div`
  color: white;
`;

export const NetWorth = styled.div`
  position: absolute;
  font-size: 10px;
  top: 22%;
  left: 30px;
  opacity: 0.8;
  color: ${(props) => (props.theme ? '#000' : '#fff')};
  @media (max-width: 768px) {
    top: 13%;
  }
`;
