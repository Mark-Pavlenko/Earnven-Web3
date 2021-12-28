import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { Table, TableContainer, TableCell } from '@material-ui/core';

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

export const TokenTableLightContainer = styled(TableContainer)`
  background: ${(props) => (props.isLightTheme ? '#F2F8FF' : '#10142D')};
  //background-color: red;
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  //backdrop-filter: blur(35px);
  border-radius: 10px;
`;

export const TableTokenTitle = styled.p`
  margin-top: 30px;
  margin-left: 25px;
  margin-bottom: 25px;
  font-family: 'Saira', sans-serif;
  font-weight: bold;
  font-style: normal;
  font-size: 20px;
  line-height: 30px;
  color: ${(props) => (props.isLightTheme ? ' #1e1e20' : '#ffffff')};
`;

export const MainTable = styled(Table)`
  opacity: 0.8;
`;

export const TokensTableHeader = styled(TableCell)`
  color: ${(props) => (props.isLightTheme ? '#6E6E6E' : '#ffffff')};
  font-family: 'Saira', sans-serif;
  font-style: normal;
  font-weight: ${(props) => (props.isLightTheme ? 'normal' : 'bold')};
  font-size: 10px;
  line-height: 16px;
  align-items: center;
`;

export const TokensTableCell = styled(TableCell)`
  color: ${(props) => (props.isLightTheme ? ' #1E1E20' : '#ffffff')};
  font-weight: ${(props) => (props.isLightTheme ? 'normal' : 'bold')};
`;

export const TokenImg = styled.img`
   {
    width: 20px;
    height: 20px;
    display: inline;
    vertical-align: top;
    left: 200px;
    margin-top: -20px;
    margin-right: 10px;
  }
`;

export const TokenInfoNameBlock = styled.div`
  display: flex;
  align-items: center;
`;

export const TokenNameSymbol = styled.div`
  p:first-child {
    color: ${(props) => (props.isLightTheme ? ' #1E1E20' : '#ffffff')};
  }

  p:last-child {
    font-size: 10px;
    color: ${(props) => (props.isLightTheme ? ' #a9a9a9' : '#ffffff')};
  }
`;

export const TokenTableCellValue = styled(TableCell)`
  color: ${(props) => (props.isLightTheme ? ' #1e1e20' : '#ffffff')};
  font-weight: ${(props) => (props.isLightTheme ? 'normal' : 'bold')};
  font-family: 'Saira', sans-serif;
  font-size: 14px;
  line-height: 22px;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;

  //:first-child {
  //  border: none !important;
  //}
  //
  //:last-child {
  //  margin-right: 20px;
  //}
`;

export const TokenTableCellBlockChain = styled.div`
  width: 140px;
  padding: 10px;
  display: flex;
  align-items: center;
  height: 50px;
  background: ${(props) => (props.isLightTheme ? '#FFFFFF' : '#8F86FF')};
  //box-shadow: 7px 21px 22px 15px rgba(51, 78, 131, 0.17);
  border-radius: 10px;
  box-sizing: border-box;
  font-family: 'Saira', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 50px;
`;

export const BlockChainImg = styled.img`
  width: 20px;
  height: 20px;
  display: inline;
  vertical-align: middle;
  line-height: 50px;
  margin-right: 10px;
`;

export const BlockChainName = styled.p`
  font-weight: ${(props) => (props.isLightTheme ? 'normal' : 'bold')};
`;
