import styled from 'styled-components';

export const TableWrapper = styled.div`
  width: 100%;
  padding: 20px 0 20px 25px;
  background: ${(props) =>
    props.isLightTheme ? 'rgba(255, 255, 255, 0.16)' : ' rgba(31, 38, 92, 0.24)'};
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  border-radius: 10px;
  user-select: none;
  @media (min-width: 175px) and (max-width: 840px) {
    padding: 20px 0 20px 0;
    border-radius: 30px;
  }
`;

export const TableItem = styled.div`
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : ' white')};
  display: grid;
  grid-template-columns:
    minmax(135px, 1fr) minmax(100px, 1fr) minmax(140px, 1fr) minmax(0, 1fr) minmax(0, 1fr)
    minmax(50px, 2fr);
  grid-gap: 5px;
  grid-template-areas: 'head liquidity apr balance value buttons';
  align-items: center;
  padding: 11px 25px;
  position: relative;
  font-size: 14px;

  &:first-child {
    font-size: 10px;
    color: ${(props) => (props.isLightTheme ? '#1E1E20' : ' white')};
    opacity: 0.5;
    font-weight: 600;
    font-size: 10px;
  }

  @media (min-width: 175px) and (max-width: 840px) {
    &:first-child {
      grid-template-columns: 50% 50%;
      grid-template-areas: 'head apr';
      padding: 5px 15px 0;
      font-weight: 600;
      opacity: 1;
      color: #1e1e20;
    }

    grid-template-columns: 20px 1fr 1fr;
    padding: 16px 15px;
    grid-template-areas:
      'head head apr'
      'liquidity liquidity liquidity'
      'buttons buttons buttons';
  }

  &:before {
    content: '';
    position: absolute;
    left: 25px;
    bottom: 0;
    height: 1px;
    width: 90%; /* or 100px */
    opacity: 0.05;
    border: ${(props) => (props.isLightTheme ? '1px solid #1E1E20' : '1px solid #ffffff')};
  }
`;

export const ItemIndex = styled.div`
  width: 15px;
  grid-area: index;
  font-size: 14px;
  @media (min-width: 175px) and (max-width: 840px) {
  }
`;
//878995
export const ItemIndexHidden = styled.div`
  width: 15px;
  grid-area: index;
  font-size: 14px;
  @media (min-width: 175px) and (max-width: 840px) {
    display: none;
  }
`;

export const HeaderApr = styled.div`
  grid-area: apr;
  @media (min-width: 175px) and (max-width: 840px) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 100px;
    margin-bottom: 20px;
    color: ${(props) => (props.isLightTheme ? '#1E1E20' : ' white')};
  }
`;
export const LPbalance = styled.div`
  grid-area: balance;
  @media (min-width: 175px) and (max-width: 840px) {
    display: none;
    align-items: center;
    justify-content: flex-end;
    padding-right: 100px;
    margin-bottom: 20px;
  }
`;

export const Value = styled.div`
  grid-area: value;
  @media (min-width: 175px) and (max-width: 840px) {
    display: none;
    align-items: center;
    justify-content: flex-end;
    padding-right: 100px;
    margin-bottom: 20px;
  }
`;
export const Buttons = styled.div`
  grid-area: buttons;
  @media (min-width: 175px) and (max-width: 840px) {
    display: none;
    align-items: center;
    justify-content: flex-end;
    padding-right: 100px;
    margin-bottom: 20px;
  }
`;
export const HeaderLiquidity = styled.div`
  grid-area: liquidity;
  @media (min-width: 175px) and (max-width: 840px) {
    display: none;
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  gap: 18px;
  grid-area: head;

  @media (min-width: 175px) and (max-width: 840px) {
    gap: 5px;
    margin-bottom: 20px;
  }
`;

export const InvestButton = styled.button`
  background: ${(props) => (props.isLightTheme ? '#fff' : '#8f86ff')};
  color: ${(props) => (props.isLightTheme ? '#4453AD' : ' white')};
  box-shadow: inset 0 5px 10px -6px rgba(51, 78, 131, 0.12);
  border-radius: 10px;
  border: none;
  padding: 9px 55px;
  font-family: 'Saira', serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
`;

export const InfoButton = styled(InvestButton)`
  padding: 11px;
  display: flex;
  align-items: center;
  box-shadow: 4px 6px 20px -5px rgba(51, 78, 131, 0.17);
`;

export const TokenImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  &:not(:first-child) {
    margin-left: -10px;
  }
`;

export const TokenImages = styled.div`
  display: flex;
  min-width: 30px;

  @media (max-width: 335px) {
    display: none;
  }
`;
export const TokenNames = styled.div`
  display: flex;
  gap: 5px;
  word-break: inherit;

  @media (max-width: 300px) {
    font-size: 12px;
  }

  @media (min-width: 300px) and (max-width: 840px) {
    font-size: 14px;
  }
`;

export const AprBlock = styled.div`
  display: flex;
`;

export const AprName = styled.div`
  display: flex;
  align-items: center;
  //width: 75px;
  font-size: 10px;
  font-weight: 600;
  font-size: 10px;
  line-height: 16px;
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : ' white')};
  opacity: 0.5;
  margin-right: 20px;

  @media (min-width: 175px) and (max-width: 840px) {
    width: 50px;
  }
`;
export const AprValue = styled.div`
  width: 75px;
  color: ${(props) => props.color};
  font-size: 14px;
  display: flex;
  align-items: center;

  @media (min-width: 175px) and (max-width: 840px) {
    width: 100px;
    text-align: right;
    font-size: 14px;
    display: flex;
    justify-content: flex-end;
  }
`;

export const ItemButtons = styled.div`
  display: flex;
  gap: 10px;
  grid-area: buttons;
  @media (min-width: 175px) and (max-width: 840px) {
    display: grid;
    grid-template-areas:
      'invest invest invest invest invest invest invest invest invest invest invest info'
      'withdraw withdraw withdraw withdraw withdraw withdraw withdraw withdraw withdraw withdraw withdraw withdraw';
    justify-content: space-between;
  }
`;

export const MyPoolsItemButton = styled.button`
  height: 40px;
  width: 150px;
  background: ${(props) => (props.isLightTheme ? '#fff' : '#8f86ff')};
  color: ${(props) => (props.isLightTheme ? '#4453AD' : ' white')};
  box-shadow: inset 0 11px 21px -6px rgb(51 78 131 / 12%);
  border-radius: 10px;
  border: none;
  padding: 9px 9px;
  font-family: 'Saira', serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  @media (min-width: 175px) and (max-width: 840px) {
    width: 100%;
  }
`;

export const LiquidityValue = styled.div`
  grid-area: liquidity;
  @media (min-width: 175px) and (max-width: 840px) {
    margin-bottom: 10px;
    padding-left: 20px;
  }
`;

export const BalanceValue = styled.div`
  grid-area: balance;
  @media (min-width: 175px) and (max-width: 840px) {
    display: none;
    margin-bottom: 10px;
    padding-left: 20px;
  }
`;

export const TokensValue = styled.div`
  grid-area: value;
  @media (min-width: 175px) and (max-width: 840px) {
    display: none;
    margin-bottom: 10px;
    padding-left: 20px;
  }
`;

export const APR = styled.div`
  grid-area: apr;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 175px) and (max-width: 840px) {
    align-items: flex-end;
  }
`;

export const AvailableTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 175px) and (max-width: 840px) {
    font-width: 600;
    color: ${(props) => (props.isLightTheme ? '#1E1E20' : ' white')};
  }
`;

export const ResetButton = styled.button`
  background: ${(props) => (props.isLightTheme ? 'rgba(255, 255, 255, 0.16)' : '#8f86ff')};
  color: ${(props) => (props.isLightTheme ? '#4453AD' : ' white')};
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(35px);
  border-radius: 10px;
  border: none;
  padding: 9px 55px;
  font-family: 'Saira', serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  margin-right: 7.5px;
`;

export const MenuPopoverBoxTitle = styled.p`
  margin-top: 20px;
  margin-left: 13px;
  margin-bottom: 17px;
  font-family: 'Saira', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 25px;
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};

  @media (max-width: 910px) {
    margin-left: 7px;
  }
`;
