import * as React from 'react';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: #83888f;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  max-width: 280px;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;

  &:hover {
    background-color: ${blue[400]};
  }
  &:active {
    background-color: blueviolet;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    color: #fff;
    outline: none;
    background-color: red;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #ffffff;
    color: #4453ad;
    box-shadow: 4px 6px 20px -5px rgba(51, 78, 131, 0.17);
    border-radius: 10px;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 150px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-content: space-between;
`;

export default function UnstyledTabsCustomized({ toggleTabsHandler }) {
  return (
    <TabsUnstyled onChange={toggleTabsHandler} defaultValue={0}>
      <TabsList>
        <Tab>{'Assets'}</Tab>
        <Tab>{'NftCollection'}</Tab>
        <Tab>{'History'}</Tab>
      </TabsList>
      {/*<TabPanel value={0}>First content</TabPanel>*/}
      {/*<TabPanel value={1}>Second content</TabPanel>*/}
      {/*<TabPanel value={2}>Third content</TabPanel>*/}
    </TabsUnstyled>
  );
}
