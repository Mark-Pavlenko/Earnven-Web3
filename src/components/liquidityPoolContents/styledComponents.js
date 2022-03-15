import styled from 'styled-components';
import cursor from '../../assets/icons/cuspom-pointer.svg';

export const SelectWrapper = styled.div`
  width: 100%;
  //cursor: url('../../assets/icons/cuspom-pointer.svg') 15 15, move;
  div:last-child {
    color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#ffffff')};
  }
`;
