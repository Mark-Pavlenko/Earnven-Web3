import React from 'react';
import PropTypes from 'prop-types';
// material
import { Popover } from '@material-ui/core';

NFT_Popover.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function NFT_Popover({ children, sx, ...other }) {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      PaperProps={{
        sx: {
          backgroundColor: (theme) => theme.palette.nft_light.backgorund,
          border: (theme) => `solid 1px ${theme.palette.grey[500_8]}`,
          width: '1110px',
          height: '595px',
          marginTop: '-10%',
          mixBlendMode: 'normal',
          backdropFilter: 'blur(30px)',
          boxShadow: '7px 21px 22px -15px rgba(51, 78, 131, 0.17)',
          borderRadius: '10px',
          ...sx,
        },
      }}
      {...other}>
      {children}
    </Popover>
  );
}
