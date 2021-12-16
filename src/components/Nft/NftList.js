import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// material
import { Grid } from '@material-ui/core';

import { Contract, ethers } from 'ethers';
import { NftProvider } from 'use-nft';
import NftCard from './NftCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const ethersConfig = {
  ethers: { Contract },
  provider: new ethers.providers.InfuraProvider('homestead', '8b2159b7b0944586b64f0280c927d0a8'),
};

NftList.propTypes = {
  nftTokenIdList: PropTypes.array.isRequired,
};

export default function NftList({
  nftTokenIdList,
  contractAddress,
  changeTheme,
  NFTDATA,
  ...other
}) {
  const [page, setpage] = useState(1);
  const [halfNFTdata, sethalfNFTdata] = useState([]);
  const [secondHalf, setsecondHalf] = useState([]);

  useEffect(() => {
    // console.log('arrayfrom', Array.from({ length: 20 }, NFTDATA));
    let halfdata = [];
    let sencondHaldf = [];

    for (var k = 0; k < NFTDATA.length / 2; k++) {
      let newData = {
        token: NFTDATA[k].token,
        name: NFTDATA[k].name,
        address: NFTDATA[k].address,
      };
      halfdata.push(newData);
    }
    sethalfNFTdata(halfdata);
    for (var l = Math.ceil(NFTDATA.length / 2); l > 0; l--) {
      console.log('nftdata insideloop', l);
      let newData = {
        token: NFTDATA[l].token,
        name: NFTDATA[l].name,
        address: NFTDATA[l].address,
      };
      sencondHaldf.push(newData);
    }
    setsecondHalf(sencondHaldf);
    console.log('half data 2', secondHalf);
  }, [NFTDATA]);

  function second() {
    sethalfNFTdata(NFTDATA);
    console.log('sathua in second');
  }
  return (
    <InfiniteScroll dataLength={halfNFTdata.length} next={second} hasMore={true}>
      <Grid container spacing={1}>
        {halfNFTdata.map((tokenId) => (
          <Grid key={tokenId} item>
            <NftProvider fetcher={['ethers', ethersConfig]}>
              <NftCard
                tokenId={tokenId.token}
                contractAddress={tokenId.address}
                changeTheme={changeTheme}
                NFTDATA={NFTDATA}
              />
            </NftProvider>
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
}

const cardComponent = () => {};

/* export default function NftList({ nftData, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {nftData.map((nft) => (
        // <Grid key={nft.tokenID} item xs={12} sm={6} md={3}>
          
            <NftCard tokenId={nft.tokenID} contractAddress={nft.contractAddress} txHash={nft.txHash} />
        
        // </Grid>
      ))
      }
    </Grid >
  ); 
} */
