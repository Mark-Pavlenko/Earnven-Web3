import { Stack, Typography } from '@material-ui/core';
import React from 'react';
import NftList from './NftList';

export default function NftGroup({ nftData }) {
  return (
    <>
      {nftData.map((object) => (
        <Stack direction="column" spacing={0}>
          <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>
            {object.name}
          </Typography>
          <NftList nftTokenIdList={object.tokens} contractAddress={object.address} />
        </Stack>
      ))}
    </>
  );
}
