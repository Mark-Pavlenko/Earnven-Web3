/***********************************************************************************
Purpose : Re-designed UI
Developed by : Sathyakrishna T
Version log:
----------------------------------------------------------------------------------
Version           Date                         Description
---------------------------------------------------------------------------------
1.0               4/nov/2021                   Initial Development
************************************************************************************/

import React from 'react';
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import './social.css';
import github from '../../../../assets/icons/github_menu.svg';
import fb_menu_icon from '../../../../assets/icons/facebook_menu_logo.svg';
import discord_menu_logo from '../../../../assets/icons/discord_menu_logo.svg';
import logo_4_menu from '../../../../assets/icons/logo_4_menu.svg';
import twitter_menu_logo from '../../../../assets/icons/twitter_menu_logo.svg';
import telegram_menu_logo from '../../../../assets/icons/telegram_menu_logo.svg';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const Image_Social = styled('img')(({ theme }) => ({
  height: '29px',
  display: 'inline-block',
  paddingTop: '5px',
  paddingLeft: '3px',
  paddingRight: '3px',
  '&:hover': {
    background: theme.palette.menu.backgorundColor_wallet_secondary,
  },
}));

const List_Social = styled(List)(({ theme }) => ({
  '&:hover': {
    background: theme.palette.menu.backgorundColor_wallet_secondary,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    overflow: 'hidden',
  },
}));

const Social = () => {
  return (
    <div className="maindiv">
      <tr>
        <td>
          <Box sx={{ pl: 7.5 }}>
            <List_Social disablePadding>
              <a href="url">
                <Image_Social src={logo_4_menu} className="imageCSS" alt="" />
              </a>
            </List_Social>
          </Box>
        </td>
        <td className="td">
          <Box sx={{ pl: 2.5 }}>
            <List_Social disablePadding>
              <a className="link" href="url">
                <Image_Social src={twitter_menu_logo} className="imageCSS" alt="" />
              </a>
            </List_Social>
          </Box>
        </td>
        <td className="td">
          <Box sx={{ pl: 2.5 }}>
            <List_Social disablePadding>
              <a className="link" href="url">
                <Image_Social src={telegram_menu_logo} className="imageCSS" alt="" />
              </a>
            </List_Social>
          </Box>
        </td>
      </tr>
      <tr>
        <td>
          <Box sx={{ pl: 7.5 }}>
            <List_Social disablePadding>
              <a className="link" href="url">
                <Image_Social src={github} className="imageCSS" alt="" />
              </a>
            </List_Social>
          </Box>
        </td>
        <td className="td">
          <Box sx={{ pl: 2.5 }}>
            <List_Social disablePadding>
              <a className="link" href="url">
                <Image_Social src={discord_menu_logo} className="imageCSS" alt="" />
              </a>
            </List_Social>
          </Box>
        </td>
        <td className="td">
          <Box sx={{ pl: 2.5 }}>
            <List_Social disablePadding>
              <a className="link" href="url">
                <Image_Social src={fb_menu_icon} className="imageCSS" alt="" />
              </a>
            </List_Social>
          </Box>
        </td>
      </tr>
    </div>
  );
};

export default Social;
