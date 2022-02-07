import React from 'react';
import ReactDom from 'react-dom';
import { ShadowBlock, MainContent, Content } from './styles';
import { useSelector } from 'react-redux';

const SelectTokensModalContainer = ({ title, children, isOpen, onClose, theme }) => {
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  if (!isOpen) {
    return null;
  } else {
    return ReactDom.createPortal(
      <>
        <ShadowBlock isLightTheme={isLightTheme} />
        <MainContent isLightTheme={isLightTheme}>
          <Content>{children}</Content>
        </MainContent>
      </>,
      document.getElementById('modal')
    );
  }
};

export default SelectTokensModalContainer;
