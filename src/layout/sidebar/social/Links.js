import React from 'react';

import SocialLinksGrid from './Social';
import { useSelector } from 'react-redux';

import { InfoLinksList, InfoListItem, InfoListItemLink, MainLinksLayout } from './styles';

const Links = () => {
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);
  return (
    <MainLinksLayout>
      <InfoLinksList>
        <InfoListItem disablePadding>
          <InfoListItemLink isLightTheme={themeType} href="url">
            Suggest protocol
          </InfoListItemLink>
        </InfoListItem>
        <InfoListItem className="List" disablePadding>
          <InfoListItemLink isLightTheme={themeType} href="url">
            FAQ
          </InfoListItemLink>
        </InfoListItem>
        <InfoListItem className="List" disablePadding>
          <InfoListItemLink isLightTheme={themeType} href="url">
            About Earven
          </InfoListItemLink>
        </InfoListItem>
        <InfoListItem className="List" disablePadding>
          <InfoListItemLink isLightTheme={themeType} href="url">
            Supported platforms
          </InfoListItemLink>
        </InfoListItem>
      </InfoLinksList>
      <SocialLinksGrid />
    </MainLinksLayout>
  );
};

export default Links;
