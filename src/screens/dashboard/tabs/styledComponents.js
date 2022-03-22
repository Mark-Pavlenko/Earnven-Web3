import { styled } from '@mui/system';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

export const Tab = styled(TabUnstyled)`
  font-family: Saira, serif;
  color: ${(props) => (props.isLightTheme ? '#83888f' : '#FFFFFF')};
  cursor: pointer;
  font-weight: 500;
  font-size: 20px;
  background-color: transparent;
  max-width: 280px;
  padding: 9px 14px;
  margin: 6px 20px;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  font-style: normal;
  @media (max-width: 375px) {
    margin: 6px 5px;
  }

  &:hover {
    background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C')};
    border-radius: 10px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C')};
    background: ${(props) => (props.isLightTheme ? '#ffffff' : 'rgba(31, 38, 92, 0.24)')};
    color: ${(props) => (props.isLightTheme ? '#4453ad' : '#FFFFFF')};
    box-shadow: ${(props) =>
      props.isLightTheme
        ? '4px 6px 20px -5px rgba(51, 78, 131, 0.17)'
        : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
    border-radius: 10px;
    line-height: 31px;
    font-weight: 500;
    font-size: 20px;
    mix-blend-mode: normal;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TabsList = styled(TabsListUnstyled)`
  min-width: 150px;
  border-radius: 10px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-content: space-between;
`;
