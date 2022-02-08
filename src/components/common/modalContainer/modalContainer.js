import React from 'react';
import ReactDom from 'react-dom';
import { ShadowBlock, MainContent, Header, CloseButton, Title, Content } from './styledComponents';
import { useSelector } from 'react-redux';

const ModalContainer = ({ title, children, isOpen, onClose, theme }) => {
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  if (!isOpen) {
    return null;
  } else {
    return ReactDom.createPortal(
      <>
        <ShadowBlock isLightTheme={isLightTheme} />
        <MainContent isLightTheme={isLightTheme}>
          <Header>
            <Title isLightTheme={isLightTheme}>{title}</Title>
            <CloseButton onClick={onClose} isLightTheme={isLightTheme} />
          </Header>
          <Content>{children}</Content>
        </MainContent>
      </>,
      document.getElementById('modal')
    );
  }
};

export default ModalContainer;
