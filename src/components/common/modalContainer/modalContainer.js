import React from 'react';
import ReactDom from 'react-dom';
import {
  ShadowBlock,
  MainContent,
  Header,
  CloseButton,
  Title,
  ErrorMessage,
  Content,
} from './styledComponents';
import { useSelector } from 'react-redux';
import ExclamationIcon from './../../../assets/icons/ExclamationIcon.svg';

const ModalContainer = ({
  title,
  children,
  closeModal,
  modalType,
  setIsWithdrawActive,
  tokenSwapError,
}) => {
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  const ShadowBlockHandler = () => {
    closeModal('');
  };

  return ReactDom.createPortal(
    <>
      <ShadowBlock onClick={ShadowBlockHandler} isLightTheme={isLightTheme}></ShadowBlock>
      <MainContent isLightTheme={isLightTheme} modalType={modalType}>
        {tokenSwapError && (
          <ErrorMessage>
            <img style={{ marginRight: '20px' }} src={ExclamationIcon} alt="ExclamationIcon" />
            <div style={{ marginTop: '2px' }}>
              {'«The swap is not possible, there is no liquidity for the pair»'}
            </div>
          </ErrorMessage>
        )}
        <Header>
          <Title isLightTheme={isLightTheme}>{title}</Title>
          {modalType !== 'slippageTolerance' && (
            <CloseButton
              onClick={() => {
                closeModal('');
                modalType === 'withdraw' && setIsWithdrawActive(false);
              }}
              isLightTheme={isLightTheme}
            />
          )}
        </Header>
        {modalType !== 'slippageTolerance' ? <Content>{children}</Content> : <div>{children}</div>}
      </MainContent>
    </>,
    document.getElementById('modal')
  );
};

export default ModalContainer;
