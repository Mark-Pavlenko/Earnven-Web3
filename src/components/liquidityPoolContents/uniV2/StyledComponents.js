import styled from 'styled-components';

export const SelectTitle = styled.div`
  font-family: serif Saira;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#fff')};
  opacity: ${(props) => (props.isLightTheme ? '0.5' : '0.8')};
  margin-bottom: 5px;
`;

export const AddNewGroupButton = styled.button`
  cursor: pointer;
  color: ${(props) => (props.isLightTheme ? '#4453AD' : '#fff')};
  background: ${(props) => (props.isLightTheme ? '#fff' : '#8F86FF')};
  box-shadow: inset 0 5px 10px -6px rgba(51, 78, 131, 0.12);
  border-radius: 10px;
  padding: 10px 40px;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  border: none;
  margin-top: 30px;
`;

export const ModalInput = styled.input`
  height: 60px;
  width: 100%;
  cursor: pointer;
  border: none;
  background: ${(props) => (props.isLightTheme ? '#ffffff' : 'rgba(31, 38, 92, 0.24)')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 0 5px 10px -6px rgba(51, 78, 131, 0.12)'
      : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  border-radius: 7px;
  outline: none;
  font-family: serif Saira;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 31px;
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#ffffff')};
  padding: 0 21px;
`;

export const InputBlock = styled.div``;
export const BlockTokens = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
  align-items: center;
`;

export const BlockTokenName = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#ffffff')};
`;
export const Balance = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: serif Saira;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 19px;
  text-align: right;
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#ffffff')};
  margin-top: 10px;
`;

export const SupplyTokenButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 40px;
  background: ${(props) => (props.isLightTheme ? '#ffffff' : '#8F86FF')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 0 5px 10px -6px rgba(51, 78, 131, 0.12)'
      : '7px 21px 22px -15px rgba(51, 78, 131, 0.17)'};
  border-radius: 10px;
  font-family: serif Saira;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${(props) => (props.isLightTheme ? '#4453ad' : '#ffffff')};
  cursor: pointer;
  margin-bottom: 20px;
  @media (min-width: 175px) and (max-width: 520px) {
    width: 100%;
  }
`;

export const ChangeToken = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #ffffff;
  box-shadow: 7px 21px 22px -15px rgba(51, 78, 131, 0.17);
  border-radius: 10px;

  font-family: serif Saira;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: ${(props) => (props.isLightTheme ? '#4453ad !important' : '#8F86FF !important')};
  position: relative;
  &:before {
    content: '';
    width: 114px;
    height: 1px;
    position: absolute;
    background-color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#ffffff')};
    opacity: 0.1;
    top: 14px;
    left: -159px;
  }
  &:after {
    content: '';
    width: 114px;
    height: 1px;
    position: absolute;
    background-color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#ffffff')};
    opacity: 0.1;
    top: 14px;
    left: 73px;
  }
`;
export const ButtonsBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 11px 0;
`;

export const DividerBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 57px 0;
  @media (max-width: 375px) {
    margin: 52px 0;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 21px 0;
`;

export const ModalLink = styled.a`
  width: 50%;
  font-family: serif Saira;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: right;
  color: ${(props) => (props.isLightTheme ? '#4453ad' : '#8F86FF')};
  text-decoration: none;
  margin-bottom: 10px;
`;

export const ModalLinkRight = styled.a`
  display: flex;
  justify-content: flex-end;
  width: 50%;
  font-family: serif Saira;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 19px;
  align-items: center;
  text-align: right;
  color: ${(props) => (props.isLightTheme ? '#4453ad' : '#8F86FF')};
  text-decoration: none;
`;
