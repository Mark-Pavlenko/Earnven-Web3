import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { matchPath, NavLink as RouterLink, useLocation } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const ListItemStyle = styled((props) => <ListItem button disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: 39,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2.5),
    fontWeight: 'fontWeightBold',
    color: 'theme.palette.text.primary',
    '&:hover': {
      borderRadius: '10px',
      width: '209px',
    },
  })
);

const ListItemStyleUpcoming = styled((props) => <ListItem button disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: 39,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2.5),
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
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
  };

  const activeRootStyle = {
    color: (theme) => theme.palette.menu.text_color,
    fontWeight: 'fontWeightBold',
    background: (theme) => theme.palette.menu.light,
    borderRadius: '7px',
    width: '13rem',
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
    <ListItemStyle
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
  };

  const activeRootStyle = {
    color: (theme) => theme.palette.menu.text_color,
    fontWeight: 'fontWeightBold',
    background: (theme) => theme.palette.menu.light,
    borderRadius: '7px',
    width: '13rem',
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
        component={RouterLink}
        to={`/${address}/${path}`}
        sx={{
          mt: 0.2,
          ...(isActiveRoot && activeRootStyle),
        }}>
        <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
        <ListItemText sx={{ color: '#1E1E20', opacity: '0.5' }} disableTypography primary={title} />

        {info && info}
      </ListItemStyleUpcoming>
      <ListItemText
        sx={{
          color: '#1E1E20',
          opacity: '0.5',
          display: 'flex',
          marginLeft: '4.8rem',
          fontSize: '10px',
          marginTop: '-10px',
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
  const { pathname } = useLocation();
  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  return (
    <Box {...other} sx={{ pl: 7.5, mt: '10%' }}>
      <List disablePadding>
        {navConfig.map((item) =>
          item.title == 'yield farm' || item.title == 'savings' ? (
            <NavItemUpcomming key={item.title} item={item} active={match} address={address} />
          ) : (
            <NavItem key={item.title} item={item} active={match} address={address} />
          )
        )}
      </List>
    </Box>
  );
}
