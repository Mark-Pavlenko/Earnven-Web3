import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { matchPath, NavLink as RouterLink, useLocation } from 'react-router-dom';
import { Box, Collapse, List, ListItemText } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import {
  ListItemElement,
  ListItemElementDisabled,
  ListItemElementIcon,
  ListItemElementDisabledIcon,
  ItemSubText,
  ItemSubTextDisabled,
  MainNavLayout,
  NavList,
  ListItemElementLayout,
  ListItemElementDisabledLayout,
} from './styles';
import { initSidebarValuesReducer } from '../../../store/initSidebarValues/reducer';

// active navigation element
function NavItem({ item, active, address }) {
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);

  const { title, path, icon, info, children } = item;
  const isActiveRoot = active(`/${address}${path}`);

  const isFirstConnection = localStorage.getItem('firstConnection');

  function setNavigation() {
    localStorage.setItem('setnavigation', item.path);
  }

  return (
    <>
      <ListItemElement
        // button
        // disableGutters
        // disabled
        isLightTheme={themeType}
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
    </>
  );
}

// disabled navigation element
function NavItemDisabled({ item, active, address }) {
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);
  const { title, path, icon, info, children } = item;
  const isActiveRoot = active(`/${address}${path}`);

  return (
    <ListItemElementDisabledLayout>
      <ListItemElementDisabled
        isLightTheme={themeType}
        button
        disableGutters
        sx={{
          ...isActiveRoot,
        }}>
        <ListItemElementDisabledIcon>{icon && icon}</ListItemElementDisabledIcon>
        <ListItemText style={{ marginTop: '-10px' }} disableTypography primary={title} />
      </ListItemElementDisabled>
      <ItemSubTextDisabled isLightTheme={themeType} disableTypography primary="Coming soon" />
    </ListItemElementDisabledLayout>
  );
}

//first connection navItem disabled
function FirstConnectionNavItemDisabled({ item, active, address }) {
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);
  const { title, path, icon, info, children } = item;
  const isActiveRoot = active(`/${address}${path}`);

  return (
    <ListItemElementDisabledLayout>
      <ListItemElementDisabled
        isLightTheme={themeType}
        button
        disableGutters
        sx={{
          ...isActiveRoot,
        }}>
        <ListItemElementDisabledIcon>{icon && icon}</ListItemElementDisabledIcon>
        <ListItemText disableTypography primary={title} />
      </ListItemElementDisabled>
    </ListItemElementDisabledLayout>
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

  const firstConnection = useSelector((state) => state.initSidebarValuesReducer.firstConnection);
  const reduxWalletsList = useSelector((state) => state.initSidebarValuesReducer.walletsList);

  return (
    <MainNavLayout>
      {reduxWalletsList.length === 0 ? (
        <NavList disablePadding>
          {navConfig.map((item) => {
            // disabled last two elements in navBar
            return item.title !== 'home' ? (
              <FirstConnectionNavItemDisabled
                key={item.title}
                item={item}
                active={match}
                address={address}
              />
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
        </NavList>
      ) : (
        <NavList disablePadding>
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
        </NavList>
      )}
    </MainNavLayout>
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
