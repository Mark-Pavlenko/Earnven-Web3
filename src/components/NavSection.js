import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { matchPath, NavLink as RouterLink, useLocation } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useDispatch } from 'react-redux';

const ListItemStyle = styled((props) => <ListItem button disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    position: 'relative',
    marginLeft: '36px',
    paddingLeft: '10px',
    textTransform: 'capitalize',
    fontWeight: 'fontWeightBold',
    color:
      localStorage.getItem('selectedTheme') == 'Day' ? 'theme.palette.text.primary' : '#FFFFFF',
    '&:hover': {
      borderRadius: '10px',
      width: '180px',
      boxShadow: '4px 6px 20px -5px rgba(51, 78, 131, 0.17)',
      color:
        localStorage.getItem('selectedTheme') == 'Day' ? '#141838' : 'theme.palette.text.primary',
    },
  })
);

const ListItemStyleUpcoming = styled((props) => <ListItem button disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    position: 'relative',
    marginLeft: '36px',
    paddingLeft: '10px',
    height: '52px',
    textTransform: 'capitalize',
    fontWeight: 'fontWeightBold',
    color: 'theme.palette.text.primary',
    '&:hover': {
      borderRadius: '10px',
      width: '209px',
      background: 'none',
    },
  })
);
// icon styling
const ListItemIconStyle = styled(ListItemIcon)({
  width: 28,
  height: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ListItemIconStyle_upcoming = styled(ListItemIcon)({
  width: 28,
  height: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '7px 21px 22px -15px rgba(51, 78, 131, 0.17)',
  opacity: 0.5,
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
  address: PropTypes.string,
};

function NavItem({ item, active, address }) {
  const { title, path, icon, info, children } = item;
  const isActiveRoot = active(`/${address}${path}`);
  const [open, setOpen] = useState(isActiveRoot);
  const handleOpen = () => {
    setOpen((prev) => !prev);
    console.log('clicked');
  };

  function setNavigation() {
    localStorage.setItem('setnavigation', item.path);
  }

  const activeRootStyle = {
    color: (theme) =>
      localStorage.getItem('selectedTheme') == 'Day' ? theme.palette.menu.text_color : 'white',
    fontWeight: 'fontWeightBold',
    background: (theme) =>
      localStorage.getItem('selectedTheme') == 'Day' ? theme.palette.menu.light : '#141838',
    borderRadius: '7px',
    width: '180px',
    '&:hover': {
      borderRadius: '10px',
      width: '180px',
      color:
        localStorage.getItem('selectedTheme') == 'Day' ? '#141838' : 'theme.palette.text.primary',
    },
  };

  const activeSubStyle = {
    color: '#f70707',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}>
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Box
            component={Icon}
            icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1, background: 'black' }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}>
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#ff0000',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'blue',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      onClick={() => {
        setNavigation();
        console.log('setNavigaation click');
      }}
      component={RouterLink}
      to={`/${address}/${path}`}
      sx={{
        mt: 0.2,
        ...(isActiveRoot && activeRootStyle),
      }}>
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

function NavItemUpcomming({ item, active, address }) {
  const { title, path, icon, info, children } = item;
  const isActiveRoot = active(`/${address}${path}`);
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
    console.log('setOpen');
  };

  const activeRootStyle = {
    color: (theme) =>
      localStorage.getItem('selectedTheme') == 'Day' ? theme.palette.menu.text_color : '#000000',
    fontWeight: 'fontWeightBold',
    background: (theme) => theme.palette.menu.light,
    borderRadius: '7px',
    width: '13rem',
  };

  const activeSubStyle = {
    color: localStorage.getItem('selectedTheme') == 'Day' ? '#f70707' : '#000000',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}>
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Box
            component={Icon}
            icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}>
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#ff0000',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'blue',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <>
      <ListItemStyleUpcoming
        // upcoming feature, enable below two comments for adding new features
        // component={RouterLink}
        // to={`/${address}/${path}`}
        sx={{
          mt: 0.2,
          ...(isActiveRoot && activeRootStyle),
        }}>
        <ListItemIconStyle_upcoming>{icon && icon}</ListItemIconStyle_upcoming>
        <ListItemText
          sx={{
            color: localStorage.getItem('selectedTheme') == 'Day' ? '#000000' : '#CCCFCF',
            opacity: '0.5',
          }}
          disableTypography
          primary={title}
        />
        {info && info}
      </ListItemStyleUpcoming>
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

NavSection.propTypes = {
  navConfig: PropTypes.array,
  address: PropTypes.string,
};

export default function NavSection({ navConfig, address, ...other }) {
  const dispatch = useDispatch();

  console.log('navConfig', navConfig);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  console.log(capitalizeFirstLetter('foo')); // Foo

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
          // console.log('itemTitle', item.title);
          return item.title === 'yield farms' || item.title === 'savings' ? (
            <NavItemUpcomming key={item.title} item={item} active={match} address={address} />
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
