import styled from 'styled-components';
import toggleArrowIcon from '../../../../assets/icons/birdArrow-icon.svg';

export const Main = styled.div`
  height: fit-content;
  background-color: ${(props) => (props.isOpen ? 'rgba(31, 38, 92, 0.24)' : 'none')};
  box-shadow: ${(props) => (props.isOpen ? 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)' : 'none')};
  border-radius: 10px;
  margin-bottom: ${(props) => (props.isOpen ? '20px' : 'none')};
  color: white;
`;

export const TotalValue = styled.div`
  max-width: 100%;
  display: flex;
  padding: 0 25px;
  justify-content: space-between;
  align-items: center;
  height: ${(props) => (props.isOpen ? '67px' : '46px')};
`;

export const ToggleButton = styled.div`
  width: 28px;
  height: 28px;
  transform: ${(props) => (props.isOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
  background: url(${toggleArrowIcon}) no-repeat center center;
  border-radius: 10px;
  margin-left: 9px;
  background-color: ${(props) => (props.isOpen ? 'white' : 'rgba(31, 38, 92, 0.24)')};
  box-shadow: ${(props) =>
    props.isOpen
      ? 'inset 0 5px 10px -6px rgba(51, 78, 131, 0.12)'
      : 'inset -1px -1px 3px 1px rgb(255 255 255 / 10%)'};
  cursor: pointer;
`;

export const ContentRightWrapper = styled.div`
  display: flex;
`;

export const TokenImage = styled.img`
  display: flex;
  margin-left: ${(props) => (props.firstElement !== 0 ? '-10px' : '0')};
  max-width: 21px;
  max-height: 21px;
  border-radius: 50%;
  border: 2px solid orange;
`;

export const TokenName = styled.div`
  font-size: 12px;
  font-weight: 600;
`;

export const ImagesWrapper = styled.div`
  display: flex;
  margin-right: 5px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 32px 11px 26px;
  font-weight: 600;
  font-size: 10px;
`;
