import React from 'react';
import ReactDom from 'react-dom';
import { ShadowBlock, MainContent, Header, CloseButton, Title, Content } from './styledComponents';
import { useSelector } from 'react-redux';

const ModalContainer = ({ title, children, closeModal, modalType }) => {
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  return ReactDom.createPortal(
    <>
      <ShadowBlock isLightTheme={isLightTheme}></ShadowBlock>
      <MainContent isLightTheme={isLightTheme} modalType={modalType}>
        <Header>
          <Title isLightTheme={isLightTheme}>{title}</Title>
          {modalType !== 'slippageTolerance' && (
            <CloseButton
              onClick={() => {
                closeModal('');
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
