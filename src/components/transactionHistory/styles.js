import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { Table, TableContainer, TableCell, TableRow } from '@material-ui/core';

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
  //width: 200px;
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

    img {
      width: 21px;
      height: 21px;
      margin-right: 5px;
    }

    p {
      color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
      font-family: 'Saira', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0;
    }
  }
`;
