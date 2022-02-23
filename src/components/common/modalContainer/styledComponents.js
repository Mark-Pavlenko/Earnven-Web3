import styled from 'styled-components';
import close from '../../../assets/icons/close_nft.svg';
import closeDark from '../../../assets/icons/close_nft_night.svg';

export const ShadowBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) =>
    props.isLightTheme ? 'rgba(255, 255, 255, 0.16)' : 'rgba(68, 83, 173, 0.1)'};
  padding: 50px;
  z-index: 1200;
  mix-blend-mode: normal;
  backdrop-filter: blur(10px);
`;

export const MainContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 18px 30px 0 30px;
  max-width: ${(props) => (props.modalType === 'slippageTolerance' ? '375px' : '830px')};
  height: ${(props) => (props.modalType === 'slippageTolerance' ? '491px' : '800px')};
  transform: translate(-50%, -50%);
  background: ${(props) =>
    props.isLightTheme ? 'rgba(255, 255, 255, 0.16)' : 'rgba(31, 38, 92, 0.24)'};
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  mix-blend-mode: normal;
  z-index: 1201;
  //backdrop-filter: blur(5px);
  border-radius: 10px;
  @media (max-width: 768px) {
    padding: 18px 15px 30px 15px;
  }
  @media (max-width: 525px) {
    width: 100%;
  }
`;

export const Content = styled.div`
  width: 475px;
  // width: ${(props) => (props.modalType === 'slippageTolerance' ? 'auto' : '475px')};
  height: calc(100% - 48px);
  margin: 34px 107px 0 107px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    margin: 34px 0 0 0;
    width: 475px;
  }

  @media (max-width: 525px) {
    width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const CloseButton = styled.div`
  width: 40px;
  height: 40px;
  transform: ${(props) => (props.isOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
  background: url(${(props) => (props.isLightTheme ? close : closeDark)}) no-repeat center center;
  margin-left: 9px;
  cursor: pointer;
  background-color: ${(props) => (props.isLightTheme ? '#ffffff' : 'rgba(68, 83, 173, 0.1)')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 0 5px 10px -6px rgba(51, 78, 131, 0.12)'
      : 'inset 1px 2px 1px 1px rgba(255, 255, 255, 0.1)'};
  border-radius: 7px;
  mix-blend-mode: ${(props) => (props.isLightTheme ? 'none' : 'normal')};
  backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
`;

export const Title = styled.div`
  font-family: serif saira;
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 41px;
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#ffffff')};
`;
