import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { Table, TableContainer, TableCell, TableRow } from '@material-ui/core';
import Avatar from 'react-avatar';

export const TestBlock = styled.div`
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
`;

export const LoadingBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  p {
    color: red;
  }
`;

export const MainBlock = styled(Box)`
  box-sizing: border-box;
  margin-top: 30px;
  margin-bottom: 35px;
  border-radius: 10px;
  border: 5rem;
  width: auto;

  @media (max-width: 980px) {
    width: 100%;
    //margin-left: 0px;
    //padding-right: 10px;
    //padding-left: 10px;
  }
`;

export const DashboardHistoryContainer = styled(TableContainer)`
  background: ${(props) => (props.isLightTheme ? '#FFFFFF29' : '#1F265C3D')};

  backdrop-filter: blur(35px);
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  border-radius: 10px;
`;

export const TransactionHistoryTableHeader = styled(TableCell)`
  color: #7e848f;
  font-family: 'Saira', sans-serif;
  font-weight: 600;
  // font-weight: ${(props) => (props.isLightTheme ? 'normal' : 'bold')};
  font-size: 10px;
  line-height: 16px;
  align-items: center;
  border: none;
`;

export const TransactionDateTimestamp = styled.p`
  margin-left: 25px;
  margin-bottom: 15px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0;
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};

  :not(:first-child) {
    margin-top: 50px;
  }
`;

export const TransactionsHistoryTable = styled(Table)`
  //margin-left: 45px;
  //margin-right: 45px;
  > tbody > tr:last-child {
    //background: #ff0000;
  }
`;

export const TransactionTableRow = styled(TableRow)`
  border-top: 0.1px solid rgba(224, 224, 224, 1);

  border-bottom: 0.1px solid rgba(224, 224, 224, 1);
`;

export const HistoryTableCell = styled(TableCell)`
  display: flex;
  height: 71px;
  width: 215px;
  margin-left: 29px;
  border-bottom: none;
  //background-color: red;
`;

export const TransactionIcon = styled.img`
  width: 28px;
  height: 28px;
  margin-top: 5px;
`;

export const DateLabelsSubBlock = styled.div`
  margin-left: 10px;
`;

export const TransactionName = styled.p`
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
`;

export const TransactionTimestamp = styled.p`
  color: #80868f;
`;

export const GetSenderTableCell = styled(TableCell)`
  div {
    display: flex;
    flex-direction: row;
    color: ${(props) => (props.isLightTheme ? 'black' : 'white')};

    img {
      width: 21px;
      height: 21px;
      margin-right: 5px;
      margin-left: 5px;
    }

    p {
      font-family: 'Saira', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0;
    }
  }
`;

export const GasFeeStringValue = styled.p`
  color: ${(props) => (props.isLightTheme ? '#7E848F' : '#FFFFFF')};
  font-weight: 400;
  font-size: 14px;
`;

export const QuantityTableCell = styled(TableCell)`
  //width: 200px;
`;

export const QuantityTableCellSubBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  //border: 1px solid orange;
  /* justify-content: space-between;
  width: 330px;*/
  gap: 15px;
`;

export const FirstTokenCurrencyBlock = styled.div`
  //border: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FirstTokenSubBlock = styled.div`
  //background-color: red;
  margin-left: 5px;
`;

export const TokenSubBlockTitle = styled.p`
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
`;

export const FirstTokenSubBlockUSDValue = styled.p`
  font-size: 10px;

  line-height: 22px;
  :last-child {
    color: #737373;
    line-height: 15px;
  }
`;

export const SecondTokenSubBlock = styled.div`
  //background-color: red;
  margin-left: 5px;
  //border: 2px solid green;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 145px;
`;

export const SecondTokenCurrencyBlock = styled.div`
  //border: 1px solid black;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

export const SecondTokenSubBlockUSDValue = styled.p`
  font-size: 10px;
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
  line-height: 22px;
  :last-child {
    color: #737373;
    line-height: 15px;
  }
`;

export const MockAvatarIcon = styled(Avatar)`
  background-color: #737373;
  display: inline;
  max-width: 21px;
  max-height: 21px;
  vertical-align: top;
  height: 25px;
  margin-right: 5px;
`;

export const PlusTransactionValue = styled.span`
  color: #00dfd1;
`;
export const MinusTransactionValue = styled.span``;

export const PlainObjectBlock = styled.div`
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
`;

export const PageNumberSpan = styled.span`
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
  margin-left: 10px;
  margin-right: 10px;
`;

export const PaginationArrow = styled.button`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;
