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
`;

export const TableItem = styled.div`
  color: ${(props) => (props.isLightTheme ? '#1E1E20' : ' white')};

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas: 'head balance apr buttons';
  align-items: center;
  padding: 15px 25px;
  position: relative;

  @media (min-width: 375px) and (max-width: 840px) {
    &:first-child {
      justify-content: center;
      grid-template-columns: 50% 50%;
      align-items: center;
    }
    grid-template-columns: 1fr 1fr;
    padding: 20px 15px;
    grid-template-areas:
      'head apr'
      'balance balance'
      'buttons buttons';
  }

  &:before {
    content: '';
    position: absolute;
    left: 25px;
    bottom: 0;
    height: 1px;
    width: 95%; /* or 100px */
    opacity: 0.05;
    border: ${(props) => (props.isLightTheme ? '1px solid #1E1E20' : '1px solid #ffffff')};
  }
`;

export const ItemIndex = styled.div`
  width: 25px;
  @media (min-width: 375px) and (max-width: 840px) {
    display: none;
  }
`;
export const HeaderApr = styled.div`
  @media (min-width: 375px) and (max-width: 840px) {
    //margin-right: 162px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
`;
export const HeaderLiquidity = styled.div`
  @media (min-width: 375px) and (max-width: 840px) {
    display: none;
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  gap: 18px;
  grid-area: head;
  @media (min-width: 375px) and (max-width: 840px) {
    gap: 10px;
    margin-bottom: 20px;
  }
`;

export const InvestButton = styled.button`
  background: ${(props) => (props.isLightTheme ? '#fff' : '#8f86ff')};
  color: ${(props) => (props.isLightTheme ? '#4453AD' : ' white')};
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
  width: 30px;
`;
export const TokenNames = styled.div`
  display: flex;
  gap: 5px;

  @media (min-width: 375px) and (max-width: 840px) {
    font-size: 14px;
  }
`;

export const AprBlock = styled.div`
  display: flex;
  gap: 10px;
`;

export const AprName = styled.div`
  width: 75px;

  @media (min-width: 375px) and (max-width: 840px) {
    font-size: 14px;
    width: 50px;
  }
`;
export const AprValue = styled.div`
  width: 75px;
  color: ${(props) => props.color};
  @media (min-width: 375px) and (max-width: 840px) {
    width: 60px;
    text-align: right;
    font-size: 14px;
  }
`;

export const ItemButtons = styled.div`
  display: flex;
  gap: 30px;
  grid-area: buttons;
  @media (min-width: 375px) and (max-width: 840px) {
    display: grid;
    grid-template-columns: 3fr 40px;
    gap: 50px;
    justify-content: space-between;
  }
`;

export const BalanceValue = styled.div`
  grid-area: balance;
  @media (min-width: 375px) and (max-width: 840px) {
    margin-bottom: 10px;
  }
`;
export const APR = styled.div`
  grid-area: apr;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 375px) and (max-width: 840px) {
    align-items: flex-end;
  }
`;

export const AvailableTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
`;
