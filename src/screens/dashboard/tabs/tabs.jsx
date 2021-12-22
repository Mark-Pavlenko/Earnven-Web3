import * as React from 'react';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import { TabsList, Tab } from './styledComponents';

const DashboardTabs = ({ toggleTabsHandler, isLightTheme }) => {
  return (
    <TabsUnstyled onChange={toggleTabsHandler} defaultValue={0}>
      <TabsList>
        <Tab isLightTheme={isLightTheme}>{'Assets'}</Tab>
        <Tab isLightTheme={isLightTheme}>{'NFT'}</Tab>
        <Tab isLightTheme={isLightTheme}>{'History'}</Tab>
      </TabsList>
    </TabsUnstyled>
  );
};

export default DashboardTabs;
