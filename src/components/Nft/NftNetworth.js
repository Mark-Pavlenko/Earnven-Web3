import React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Typography, Stack } from '@material-ui/core';
// import { Stack } from '@material-ui/core';

const NftNetworth = ({ changeTheme }) => {
  const NetWorth = styled('div')(({ theme }) => ({
    background: !changeTheme
      ? theme.palette.nft_dark.noNFT_background
      : theme.palette.nft_light.noNFT_background,
    mixBlendMode: 'normal',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.16)',
    backdropFilter: 'blur(35px)',
    borderRadius: '10px',
    minWidth: '302px',
    height: '88px',
    marginTop: '10px',
    ['@media (max-width:600px)']: {
      // eslint-disable-line no-useless-computed-key
      margin: 'auto',
      marginTop: '10px',
      textAlign: 'center',
      minWidth: '345px',
      height: '90px',
    },
    ['@media (min-width:600px)']: {
      // eslint-disable-line no-useless-computed-key
      marginLeft: '22px',
    },
  }));

  const AccountNetWorth = styled(Typography)(({ theme }) => ({
    color: changeTheme
      ? theme.palette.nft_light.NFT_popup_name
      : theme.palette.nft_dark.NFT_bodyFont,
    marginLeft: '20px',
    fontSize: '40px',
    fontWeight: 600,
    ['@media (max-width:600px)']: {
      // eslint-disable-line no-useless-computed-key
      fontSize: '26px',
      fontWeight: 600,
      margin: 'auto',
      marginTop: '17px',
      marginLeft: 'auto',
      textAlign: 'center',
    },
  }));

  const NetWorthText = styled(Typography)(({ theme }) => ({
    marginLeft: '22px',
    lineHeight: '16px',
    opacity: changeTheme ? 0.5 : 0.8,
    color: changeTheme ? theme.palette.nft_light.NFT_bodyFont : theme.palette.nft_dark.NFT_bodyFont,
    marginTop: '-4px',
    ['@media (max-width:600px)']: {
      // eslint-disable-line no-useless-computed-key
      margin: 'auto',
      textAlign: 'center',
    },
  }));
  return (
    <div style={{ display: 'flex' }}>
      <NetWorth>
        <Stack direction="column">
          <AccountNetWorth>$ 21,010.17</AccountNetWorth>
          <NetWorthText variant="NFT_networth_text">Net Worth</NetWorthText>
        </Stack>
      </NetWorth>
    </div>
  );
};

export default NftNetworth;
