import styled from 'styled-components';
import close from '../../../assets/icons/close_nft.svg';

export const ShadowBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.16);
  padding: 50px;
  z-index: 1200;
  mix-blend-mode: normal;
  backdrop-filter: blur(10px);
`;

export const MainContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 18px 30px 30px 30px;
  max-width: 830px;
  height: 867px;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.16);
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  mix-blend-mode: normal;
  z-index: 1201;
  backdrop-filter: blur(35px);
  border-radius: 10px;
  @media (max-width: 768px) {
    padding: 18px 15px 30px 15px;
    //width: 100%;
  }
  @media (max-width: 525px) {
    width: 100%;
  }
`;

export const Content = styled.div`
  width: 475px;
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
  background: url(${close}) no-repeat center center;
  margin-left: 9px;
  cursor: pointer;
  background-color: #ffffff;
  box-shadow: inset 0 5px 10px -6px rgba(51, 78, 131, 0.12);
  border-radius: 7px;
`;

export const Title = styled.div`
  font-family: serif saira;
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 41px;
`;
