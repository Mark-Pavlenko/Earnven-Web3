import styled from 'styled-components';

export const Main = styled.div`
  background: ${(props) =>
    props.isLight ? 'rgba(255, 255, 255, 0.16)' : 'rgba(31, 38, 92, 0.24)'};
  padding: 20px;
  border-radius: 10px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TotalValueField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  margin-top: 21px;
  background: ${(props) =>
    props.isLight ? 'rgba(255, 255, 255, 0.16)' : 'rgba(31, 38, 92, 0.24)'};
  border-radius: 10px;
  mix-blend-mode: normal;
  box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);
  padding: 20px 20px 20px 13px;
`;

export const ColumnHeader = styled.div`
  display: flex;
  margin-top: 23px;
`;

export const TotalTitle = styled.span`
  width: 50%;
  font-family: Saira, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  color: ${(props) => (props.isLight ? '#1e1e20' : '#ffffff')};
`;

export const TotalValue = styled.div`
  width: 33%;
  font-family: Saira, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: ${(props) => (props.isLight ? '#1e1e20' : '#ffffff')};
`;

export const Title = styled.div`
  margin-top: 15px;
  margin-left: 27px;
`;

export const EthereumTokenImage = styled.img`
  display: inline;
  max-width: 25px;
  vertical-align: top;
  height: 25px;
  margin: 11.3px;
  margin-left: 15px;
  border-radius: 50%;
`;

export const TokenImage = styled.img`
  display: inline;
  max-width: 25px;
  vertical-align: top;
  height: 25px;
  margin: 11.3px;
  margin-left: 15px;
  border-radius: 50%;
  background-color: #e5e5e5;
`;

export const TokenName = styled.div`
  font-family: Saira, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 25px;
  color: ${(props) => (props.isLight ? '#1e1e20' : '#ffffff')};
`;

export const NameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  float: left;
  text-align: initial;
`;

export const APYPercent = styled.div`
  font-family: Saira, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: ${(props) => (props.isLight ? '#1e1e20' : '#ffffff')};
`;

export const APYWrapper = styled.div`
  width: 70%;
  height: 50px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AddGroupButton = styled.button`
  height: 40px;
  width: 166px;
  background: ${(props) => (props.isLight ? '#ffffff' : '#8F86FF')};
  border: none;
  cursor: pointer;
  color: ${(props) => (props.isLight ? '#4453AD' : '#ffffff')};
  border-radius: 10px;
  font-size: 14px;
  line-height: 22px;
  box-shadow: 7px 21px 22px -15px rgba(51, 78, 131, 0.17);
  margin-top: 53px;
`;

export const AssetName = styled.div`
  width: 55%;
  display: flex;
  align-items: center;
  padding-left: 13px;
  font-family: Saira, serif;
  font-style: normal;
  font-size: 10px;
  line-height: 16px;
  color: ${(props) => (props.isLight ? '#1e1e20' : '#ffffff')};
`;

export const Percentage = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  font-family: Saira, serif;
  font-style: normal;
  font-size: 10px;
  line-height: 16px;
  color: ${(props) => (props.isLight ? '#1e1e20' : '#ffffff')};
  padding-left: 14%;
`;

export const Value = styled.div`
  width: 33%;
  display: flex;
  align-items: center;
  font-family: Saira, serif;
  font-style: normal;
  font-size: 10px;
  line-height: 16px;
  color: ${(props) => (props.isLight ? '#1e1e20' : '#ffffff')};
`;

export const AssetsColumn = styled.div`
  width: 50%;
  display: flex;
  height: 50px;
  float: left;
`;

export const AssetDataRaw = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  background: transparent;
  cursor: pointer;
  line-height: 1;
  margin-bottom: 5px;
  &:hover {
    background: ${(props) => (props.isLight ? '#ffffff' : 'rgba(31, 38, 92, 0.24)')};
    box-shadow: ${(props) =>
      props.isLight
        ? 'inset 0 5px 10px -6px rgba(51, 78, 131, 0.12)'
        : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
    border-radius: 10px;
  }
`;
//inset 0 5px 10px -6px rgba(51, 78, 131, 0.12);
//inset 2px 2px 4px rgba(255, 255, 255, 0.1);

export const AssetValueWrapper = styled.div`
  width: 33%;
  height: 50px;
  float: left;
  display: flex;
`;

export const AssetValue = styled.div`
  width: 75%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

export const MainMobile = styled.div`
  background: transparent;
  cursor: pointer;
`;

export const AssetImageMobile = styled.img`
  margin-left: 10px;
  height: 50px;
  width: 50px;
  margin-top: 15px;
  display: inline-block;
`;

export const TotalEmptyCell = styled.div`
  width: 70%;
`;

export const Part = styled.div`
  width: 30px;
  height: 21px;
  background: #4453ad;
  box-shadow: inset 0 5px 10px -6px rgba(51, 78, 131, 0.12);
  border-radius: 7px;
  font-family: Saira, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  margin-left: 5px;
`;
