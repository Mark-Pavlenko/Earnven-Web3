import styled from 'styled-components';

export const SelectTitle = styled.div`
  font-family: serif Saira;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: #1e1e20;
  opacity: 0.5;
  margin-bottom: 5px;
`;

export const AddNewGroupButton = styled.button`
  cursor: pointer;
  color: ${(props) => (props.isLightTheme ? '#4453AD' : '#fff')};
  background: ${(props) => (props.isLightTheme ? '#fff' : '#8F86FF')};
  box-shadow: inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12);
  border-radius: 10px;
  padding: 10px 40px;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  border: none;
`;

export const ModalInput = styled.input`
  height: 60px;
  width: 100%;
  cursor: pointer;
  border: none;
  background: #ffffff;
  box-shadow: inset 0 5px 10px -6px rgba(51, 78, 131, 0.12);
  border-radius: 7px;
  outline: none;
  font-family: serif Saira;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 31px;
  color: #1e1e20;
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
  color: #1e1e20;
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
  color: #1e1e20;
  margin-top: 10px;
`;

export const SupplyTokenButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 40px;
  background: #ffffff;
  box-shadow: inset 0 5px 10px -6px rgba(51, 78, 131, 0.12);
  border-radius: 10px;

  font-family: serif Saira;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #4453ad;
  cursor: pointer;
  margin-bottom: 20px;
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
  color: #4453ad;
  cursor: pointer;
  margin-bottom: 20px;
`;
export const ButtonsBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 11px 0;
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
  color: #4453ad;
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
  color: #4453ad;
  text-decoration: none;
`;
