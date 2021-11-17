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

const Social = () => {
  return (
    <div>
      <tr style={{ marginTop: '100px' }}>
        <td>
          <Box className="box1" sx={{ pl: 7.5 }}>
            <List className="List" disablePadding>
              <a className="link" href="url">
                <img src={logo_4_menu} className="imageCSS" alt="" />
              </a>
            </List>
          </Box>
        </td>
        <td className="td">
          <Box sx={{ pl: 2.5, mt: 6 }}>
            <List className="List" disablePadding>
              <a className="link" href="url">
                <img src={twitter_menu_logo} className="imageCSS" alt="" />
              </a>
            </List>
          </Box>
        </td>
        <td className="td">
          <Box sx={{ pl: 2.5, mt: 3 }}>
            <List className="List" disablePadding>
              <a className="link" href="url">
                <img src={telegram_menu_logo} className="imageCSS" alt="" />
              </a>
            </List>
          </Box>
        </td>
      </tr>
      <tr>
        <td>
          <Box sx={{ pl: 7.5, mt: -10 }}>
            <List className="List" disablePadding>
              <a className="link" href="url">
                <img src={github} className="imageCSS" alt="" />
              </a>
            </List>
          </Box>
        </td>
        <td className="td">
          <Box sx={{ pl: 2.5, mt: -10 }}>
            <List className="List" disablePadding>
              <a className="link" href="url">
                <img src={discord_menu_logo} className="imageCSS" alt="" />
              </a>
            </List>
          </Box>
        </td>
        <td className="td">
          <Box sx={{ pl: 2.5, mt: -10 }}>
            <List className="List" disablePadding>
              <a className="link" href="url">
                <img src={fb_menu_icon} className="imageCSS" alt="" />
              </a>
            </List>
          </Box>
        </td>
      </tr>
    </div>
  );
};

export default Social;
