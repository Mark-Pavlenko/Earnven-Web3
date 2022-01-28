import React from 'react';
import ReactDom from 'react-dom';
import { ShadowBlock, MainContent, Header, CloseButton, Title, Content } from './styledComponents';

const ModalContainer = ({ title, children, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  } else {
    return ReactDom.createPortal(
      <>
        <ShadowBlock></ShadowBlock>
        <MainContent>
          <Header>
            <Title>{title}</Title>
            <CloseButton onClick={onClose} />
          </Header>
          <Content>{children}</Content>
        </MainContent>
      </>,
      document.getElementById('modal')
    );
  }
};

export default ModalContainer;
