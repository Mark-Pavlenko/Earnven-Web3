import React from 'react';
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { SocialNetorksMainLayout, NetworksSubColumn } from './styles';
import github from '../../../assets/icons/github_menu.svg';
import fb_menu_icon from '../../../assets/icons/facebook_menu_logo.svg';
import other_menu_logo from '../../../assets/icons/discord_menu_logo.svg';
import discord_menu from '../../../assets/icons/logo_4_menu.svg';
import twitter_menu_logo from '../../../assets/icons/twitter_menu_logo.svg';
import telegram_menu_logo from '../../../assets/icons/telegram_menu_logo.svg';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const Social = () => {
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);
  return (
    <SocialNetorksMainLayout>
      <NetworksSubColumn isLightTheme={themeType}>
        <span>
          <a className="link" href="url">
            <img src={github} alt="" />
          </a>
        </span>
        <a href="url">
          <img src={discord_menu} alt="" />
        </a>
      </NetworksSubColumn>
      <NetworksSubColumn isLightTheme={themeType}>
        <a className="link" href="url">
          <img src={other_menu_logo} alt="" />
        </a>
        <a className="link" href="url">
          <img src={twitter_menu_logo} alt="" />
        </a>
      </NetworksSubColumn>
      <NetworksSubColumn isLightTheme={themeType}>
        <a className="link" href="url">
          <img src={fb_menu_icon} alt="" />
        </a>
        <a className="link" href="url">
          <img src={telegram_menu_logo} alt="" />
        </a>
      </NetworksSubColumn>
    </SocialNetorksMainLayout>
  );
};

export default Social;
