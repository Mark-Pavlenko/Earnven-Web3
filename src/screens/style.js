import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';

export const Wrapper = styled.div`
  padding: 0 20px;
  margin-top: 20px;
`;

export const Description = styled.div`
  width: 50%;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#fff')};
  opacity: ${(props) => (props.isLightTheme ? '0.5' : '0.8')};
  margin-bottom: 20px;
  text-align: justify;

  @media (max-width: 840px) {
    width: 100%;
  }
`;

export const InputBlock = styled.div`
  width: 307px;
  height: 40px;
  margin-bottom: 30px;
  position: relative;

  @media (max-width: 840px) {
    width: 100%;
  }
`;

export const SearchImg = styled.img`
  position: absolute;
  top: 25%;
  right: 5%;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  background: ${(props) => (props.isLightTheme ? '#fff' : 'rgba(31, 38, 92, 0.24)')};
  box-shadow: inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12);
  border-radius: 7px;
  outline: none;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  line-height: 22px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#fff')};
  }
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#fff')};
`;

export const LabelTab = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const LabelIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50px;
`;

export const ComingBlock = styled.div`
  font-weight: 500;
  font-size: 10px;
  line-height: 16px;
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#fff')};
  padding-left: 25px;
  text-align: left;
`;

export const PoolsTitle = styled.div`
  font-weight: 600;
  font-size: 26px;
  line-height: 41px;
  color: ${(props) => (props.isLightTheme ? '#1e1e20' : '#fff')};
  margin-bottom: 20px;
`;

export const AllTabs = styled(Tabs)`
  .MuiButtonBase-root {
    color: ${(props) => (props.isLightTheme ? '#1E1E20' : 'white')};
    opacity: ${(props) => (props.isLightTheme ? '0.5' : '0.8')};
    padding: 10px;
    margin-left: 20px;
    background: none;
    font-weight: 500;
    font-size: 20px;
    line-height: 31px;
    border-radius: 7px;
  }

  .Mui-selected {
    color: ${(props) => (props.isLightTheme ? '#4453ad' : '#fff')};
    opacity: ${(props) => (props.isLightTheme ? '1' : '0.9')};
    background: ${(props) => (props.isLightTheme ? '#fff' : 'rgba(31, 38, 92, 0.24)')};
    box-shadow: ${(props) =>
      props.isLightTheme
        ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
        : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  }

  .MuiBox-root .css-1gsv261 {
    display: none;
    border: none;
  }

  .css-1aquho2-MuiTabs-indicator {
    display: none;
  }
`;
