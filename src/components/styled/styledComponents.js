import styled from 'styled-components';
import minusIcon from '../../assets/icons/minus.svg';
import plusIcon from '../../assets/icons/plusIconDark.svg';

export const ToggleButton = styled.div`
  background: ${(props) =>
    props.isOpen
      ? `url(${minusIcon}) no-repeat center center`
      : `url(${plusIcon}) no-repeat center center`};
  width: 28px;
  height: 28px;
  background-color: white;
  border: none;
  box-shadow: inset 0 5px 10px -6px rgba(51, 78, 131, 0.12);
  border-radius: 10px;
`;
