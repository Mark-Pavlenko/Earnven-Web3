import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@material-ui/core';

export default function WalletsListPopover({ isLightTheme, children, sx, ...other }) {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      PaperProps={{
        sx: {
          mt: 1.5,
          ml: 0.5,
          width: '336px',
          height: '401px',
          overflow: 'inherit',
          boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          background: isLightTheme ? '#FFFFFF29' : '#1F265C3D',
          mixBlendMode: 'normal',
          backdropFilter: 'blur(35px)',
          ...sx,
        },
      }}
      {...other}>
      {children}
    </Popover>
  );
}

WalletsListPopover.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};
