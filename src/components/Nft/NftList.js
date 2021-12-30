import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// material
import { Grid } from '@material-ui/core';
import { Contract, ethers } from 'ethers';
import { NftProvider } from 'use-nft';
import NftCard from './NftCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../constants/actionTypes';
import { connect } from 'react-redux';
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
  ethUSDPrice,
  propnetWorth1,
  ...other
}) {
  const [page, setpage] = useState(1);
  const [halfNFTdata, sethalfNFTdata] = useState([]);
  const [secondHalf, setsecondHalf] = useState([]);
  const [netWorth, setnetWorth] = useState(0);
  const [pivot_front, setpivot_front] = useState(0);
  const [pivot_back, setpivot_back] = useState(6);
  const dispatch = useDispatch();
  useEffect(() => {
    propnetWorth1(netWorth);
  }, [netWorth]);

  // server and application id for implimenting molalis

  // const serverUrl = 'https://qyowfcltd5u6.usemoralis.com:2053/server';
  // const appId = 'vVASNqBvFXa6NWsiOhB2n1atIOqijECNHxFBZIvF';

  async function getNFTdataMoralis() {
    const options = { chain: 'eth', address: '0xf56345338cb4cddaf915ebef3bfde63e70fe3053' };
    const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);
    console.log('moralis api', polygonNFTs);
  }

  useEffect(() => {
    // Moralis Implimentation
    // Moralis.start({ serverUrl, appId });
    // getNFTdataMoralis();
    let partialdata = NFTDATA.filter(
      (over) => over.count_flag > pivot_front && over.count_flag < pivot_back
    );
    sethalfNFTdata(partialdata);
    // redux implimentation
    // partialdata.map((over) => {
    //   const mockTwitterObject = { tokenId: over.token, contractAddress: over.address };
    //   try {
    //     dispatch({
    //       type: actionTypes.SET_NFT_DATA,
    //       payload: mockTwitterObject,
    //     });
    //   } catch (error) {
    //     console.log('dispatch error', error);
    //   }
    // });
  }, [NFTDATA]);

  function second() {
    let p = pivot_back;
    p = p + 6;
    setpivot_back(p);

    let partialdata = NFTDATA.filter(
      (over) => over.count_flag > pivot_front && over.count_flag < p
    );
    sethalfNFTdata(partialdata);
    console.log('sathua in second', halfNFTdata);
  }

  // get nft data from store
  // const nftArray = useSelector((state) => state.nftData.nftData);
  // nftArray.length > 0 && console.log('nftArray', nftArray[0].data.assets[0]);
  // console.log('nftArray full', nftArray);

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
                txHash={tokenId.txHash}
                ethUSDPrice={ethUSDPrice}
                propnetWorth={(w) => setnetWorth(w)}
              />
            </NftProvider>
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
}

// const cardComponent = () => {};

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
