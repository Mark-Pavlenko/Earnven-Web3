import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { matchPath, NavLink as RouterLink, useLocation } from 'react-router-dom';
import { Box, Collapse, List, ListItemText } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import {
  ListItemElement,
  ListItemElementDisabled,
  ListItemElementIcon,
  ListItemElementDisabledIcon,
} from './styles';

// active navigation element
function NavItem({ item, active, address }) {
  const { title, path, icon, info, children } = item;
  const isActiveRoot = active(`/${address}${path}`);

  function setNavigation() {
    localStorage.setItem('setnavigation', item.path);
  }

  return (
    <ListItemElement
      onClick={() => {
        setNavigation();
      }}
      component={RouterLink}
      to={`/${address}/${path}`}
      sx={{
        mt: 0.2,
        ...isActiveRoot,
      }}>
      <ListItemElementIcon>{icon && icon}</ListItemElementIcon>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemElement>
  );
}

// disabled navigation element
function NavItemDisabled({ item, active, address }) {
  const { title, path, icon, info, children } = item;
  const isActiveRoot = active(`/${address}${path}`);
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
    console.log('setOpen');
  };

  return (
    <>
      <ListItemElementDisabled
        button
        disableGutters
        sx={{
          mt: 0.2,
          ...isActiveRoot,
        }}>
        <ListItemElementDisabledIcon>{icon && icon}</ListItemElementDisabledIcon>
        <ListItemText
          sx={{
            color: localStorage.getItem('selectedTheme') == 'Day' ? '#000000' : '#CCCFCF',
            opacity: '0.5',
          }}
          disableTypography
          primary={title}
        />
        {info && info}
      </ListItemElementDisabled>
      <ListItemText
        sx={{
          color: localStorage.getItem('selectedTheme') == 'Day' ? '#000000' : '#CCCFCF',
          opacity: '0.5',
          display: 'flex',
          marginLeft: '5.6rem',
          fontSize: '10px',
          marginTop: '-17px',
        }}
        disableTypography
        primary="Coming soon"
      />
    </>
  );
}

// general navigation block
export default function NavSection({ navConfig, address, ...other }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_HEADER_TITLES', payload: navConfig });
  }, []);

  const { pathname } = useLocation();
  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  const getRouteTitle = () => {
    const currentRouteTitle = pathname.replace(`/${address}/`, '');
    dispatch({ type: 'SET_CURRENT_ROUTE_TITLE', payload: currentRouteTitle });
  };

  return (
    <Box {...other} sx={{ pl: 7, overflow: 'hidden', mt: 2 }}>
      <List disablePadding>
        {navConfig.map((item) => {
          // disabled last two elements in navBar
          return item.title === 'yield farms' || item.title === 'savings' ? (
            <NavItemDisabled key={item.title} item={item} active={match} address={address} />
          ) : (
            <NavItem
              key={item.title}
              item={item}
              active={match}
              address={address}
              onClick={getRouteTitle()}
            />
          );
        })}
      </List>
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
  address: PropTypes.string,
};

NavSection.propTypes = {
  navConfig: PropTypes.array,
  address: PropTypes.string,
};
