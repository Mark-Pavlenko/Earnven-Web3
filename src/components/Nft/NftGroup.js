import { Stack, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import NftList from './NftList';
import NftNetworth from './NftNetworth';

export default function NftGroup({
  nftDataFlag,
  nftData,
  changeTheme,
  NFTDATA,
  ethUSDPrice,
  propnetWorth2,
}) {
  const [netWorth, setnetWorth] = useState(0);

  useEffect(() => {
    propnetWorth2(netWorth);
  }, [netWorth]);
  return (
    <>
      {/* {nftData.map((object) => ( */}
      <Stack spacing={0}>
        {/* <Typography variant="NFT_Name_text" sx={{ mb: 2, mt: 4 }}>
            {object.name}
          </Typography> */}
        <NftList
          changeTheme={changeTheme}
          // nftTokenIdList={object.tokens}
          // contractAddress={object.address}
          NFTDATA={NFTDATA}
          ethUSDPrice={ethUSDPrice}
          propnetWorth1={(w) => setnetWorth(w)}
          nftDataFlag={nftDataFlag}
        />
      </Stack>
      {/* ))} */}
    </>
  );
}
