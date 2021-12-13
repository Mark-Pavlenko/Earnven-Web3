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
    ['@media (max-width:400px)']: {
      // eslint-disable-line no-useless-computed-key
      margin: 'auto',
      marginTop: '10px',
      textAlign: 'center',
    },
  }));

  const AccountNetWorth = styled(Typography)(({ theme }) => ({
    color: changeTheme
      ? theme.palette.nft_light.NFT_popup_name
      : theme.palette.nft_dark.NFT_bodyFont,
    marginLeft: '20px',
  }));

  const NetWorthText = styled(Typography)(({ theme }) => ({
    marginLeft: '22px',
    lineHeight: '16px',
    opacity: changeTheme ? 0.5 : 0.8,
    color: changeTheme ? theme.palette.nft_light.NFT_bodyFont : theme.palette.nft_dark.NFT_bodyFont,
    marginTop: '-4px',
  }));
  return (
    <div style={{ display: 'flex' }}>
      <NetWorth>
        <Stack direction="column" spacing={0}>
          <AccountNetWorth variant="NFT_networth">$ 21,010.17</AccountNetWorth>
          <NetWorthText variant="NFT_networth_text">Net Worth</NetWorthText>
        </Stack>
      </NetWorth>
    </div>
  );
};

export default NftNetworth;

// {nftData.map((object) => (
//     <Stack direction="column" spacing={0}>
//       <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>
//         {object.name}
//       </Typography>
//       <NftList nftTokenIdList={object.tokens} contractAddress={object.address} />
//     </Stack>
