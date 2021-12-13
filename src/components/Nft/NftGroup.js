import { Stack, Typography } from '@material-ui/core';
import React from 'react';
import NftList from './NftList';
import NftNetworth from './NftNetworth';

export default function NftGroup({ nftData, changeTheme, NFTDATA }) {
  return (
    <>
      {/* {nftData.map((object) => ( */}
      <Stack style={{ width: '100%' }} spacing={0}>
        {/* <Typography variant="NFT_Name_text" sx={{ mb: 2, mt: 4 }}>
            {object.name}
          </Typography> */}
        <NftList
          changeTheme={changeTheme}
          // nftTokenIdList={object.tokens}
          // contractAddress={object.address}
          NFTDATA={NFTDATA}
        />
      </Stack>
      {/* ))} */}
    </>
  );
}
