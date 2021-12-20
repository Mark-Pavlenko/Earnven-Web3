import React, { useEffect, useState } from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import nonft_nft from '../../assets/icons/nonft_nft.svg';
import { Box, Card, Typography, Stack } from '@material-ui/core';
import nonft_dark from '../../assets/icons/nonft_dark.svg';

const NoNft = ({ changeTheme }) => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const NoNFT_div = styled('div')(({ theme }) => ({
    background: changeTheme
      ? theme.palette.nft_light.noNFT_background
      : theme.palette.nft_dark.noNFT_background,
    mixBlendMode: 'normal',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.16)',
    backdropFilter: 'blur(35px)',
    borderRadius: '10px',
    height: '358px',
    marginTop: '20px',
    lineHeight: '45px',
    ['@media (max-width:400px)']: {
      // eslint-disable-line no-useless-computed-key
      margin: 'auto',
      marginTop: '10px',
      textAlign: 'center',
      marginLeft: '10px',
      marginRight: '10px',
    },
  }));

  const Text = styled(Typography)(({ theme }) => ({
    // width: '100vh',
    textAlign: 'center',
    verticalAlign: 'middle',
  }));

  const Image_noNFT = styled('div')(({ theme }) => ({
    // width: '100vh',
    marginLeft: '44%',
    top: '30%',
  }));

  const Stack_Stack = styled(Stack)(({ theme }) => ({
    // width: '100vh',
    marginLeft: '44%',
    position: 'relative',
    top: '46%',
    ['@media (max-width:400px)']: {
      // eslint-disable-line no-useless-computed-key
      margin: 'auto',
    },
  }));

  const Stack_Image = styled(Stack)(({ theme }) => ({
    // width: '100vh',
    marginLeft: '44%',
    position: 'relative',
    top: '35%',
    ['@media (max-width:400px)']: {
      // eslint-disable-line no-useless-computed-key
      margin: 'auto',
    },
  }));

  return (
    <>
      {!isMobile ? (
        <NoNFT_div>
          <Stack_Stack direction="row" spacing={0.5}>
            {changeTheme ? (
              <img
                width="55px"
                height="38px"
                alt=""
                sx={{ marginBottom: '10px' }}
                src={nonft_nft}
              />
            ) : (
              <img width="55px" height="38px" alt="" src={nonft_dark} />
            )}
            <Text variant="NFT_name">No NFTs found</Text>
          </Stack_Stack>
        </NoNFT_div>
      ) : (
        <NoNFT_div>
          <Stack_Image direction="column" spacing={0.5}>
            <Image_noNFT>
              {changeTheme ? (
                <img
                  width="55px"
                  height="38px"
                  alt=""
                  sx={{ marginBottom: '10px' }}
                  src={nonft_nft}
                />
              ) : (
                <img width="55px" height="38px" alt="" src={nonft_dark} />
              )}
            </Image_noNFT>
            <Text variant="NFT_name">No NFTs found</Text>
          </Stack_Image>
        </NoNFT_div>
      )}
    </>
  );
};

export default NoNft;
