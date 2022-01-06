import React from 'react';
import './test.css';
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { NetworksSubColumn, NetworksGridList } from './styles';
import github from '../../../assets/icons/github_menu.svg';
import fb_menu_icon from '../../../assets/icons/facebook_menu_logo.svg';
import other_menu_logo from '../../../assets/icons/discord_menu_logo.svg';
import discord_menu from '../../../assets/icons/logo_4_menu.svg';
import twitter_menu_logo from '../../../assets/icons/twitter_menu_logo.svg';
import telegram_menu_logo from '../../../assets/icons/telegram_menu_logo.svg';
import { useSelector } from 'react-redux';

const SocialNetworksGrid = () => {
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);
  return (
    <>
      <NetworksGridList isLightTheme={themeType}>
        <NetworksSubColumn>
          <li>
            <a href="url">
              <img src={github} alt="" />
            </a>
          </li>
          <li>
            <a href="url">
              <img src={discord_menu} alt="" />
            </a>
          </li>
        </NetworksSubColumn>
        <NetworksSubColumn>
          <li>
            <a className="link" href="url">
              <img src={other_menu_logo} alt="" />
            </a>
          </li>
          <li>
            <a className="link" href="url">
              <img src={twitter_menu_logo} alt="" />
            </a>
          </li>
        </NetworksSubColumn>
        <NetworksSubColumn>
          <li>
            <a className="link" href="url">
              <img src={fb_menu_icon} alt="" />
            </a>
          </li>
          <li>
            <a className="link" href="url">
              <img src={telegram_menu_logo} alt="" />
            </a>
          </li>
        </NetworksSubColumn>
      </NetworksGridList>
    </>
    // <SocialNetorksMainLayout>
    //   <NetworksSubColumn isLightTheme={themeType}>
    //     <div>

    //     </div>

    //   </NetworksSubColumn>
    //   <NetworksSubColumn isLightTheme={themeType}>

    //   </NetworksSubColumn>
    //   <NetworksSubColumn isLightTheme={themeType}>

    //   </NetworksSubColumn>
    // </SocialNetorksMainLayout>
  );
};

export default SocialNetworksGrid;
