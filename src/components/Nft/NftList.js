import PropTypes from 'prop-types';
import React from 'react';
// material
import { Grid } from '@material-ui/core';
import NftCard from './NftCard'

import { Contract, ethers } from "ethers"
import { NftProvider } from "use-nft"

// ----------------------------------------------------------------------
const ethersConfig = {
  ethers: { Contract },
  provider: new ethers.providers.InfuraProvider("homestead", "8b2159b7b0944586b64f0280c927d0a8")
}
// ----------------------------------------------------------------------

NftList.propTypes = {
  nftTokenIdList: PropTypes.array.isRequired
};

export default function NftList({ nftTokenIdList, contractAddress, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {nftTokenIdList.map((tokenId) => (
        <Grid key={tokenId} item xs={12} sm={6} md={3}>
          <NftProvider fetcher={["ethers", ethersConfig]}>
            <NftCard tokenId={tokenId} contractAddress={contractAddress} />
          </NftProvider>
        </Grid>
      ))
      }
    </Grid >
  );
}

const cardComponent = () => {

}

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
}*/