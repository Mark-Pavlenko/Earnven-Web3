import React from 'react';
import PropTypes from 'prop-types';
// material
import { Popover } from '@material-ui/core';
import { GasMenuPopover } from './styles';

MenuPopover.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function MenuPopover({ children, isLightTheme, sx, ...other }) {
  return (
    <GasMenuPopover
      isLightTheme={isLightTheme}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      PaperProps={{
        sx: {
          mt: 1.5,
          ml: 0.5,
          overflow: 'inherit',

          borderRadius: '10px',
          background: (theme) => '#FFFFFF29',
          mixBlendMode: 'normal',
          boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(35px)',
          //   width: 100,
          ...sx,
        },
      }}
      {...other}>
      {children}
    </GasMenuPopover>
  );
}
