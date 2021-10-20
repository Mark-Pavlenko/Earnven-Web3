import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useParams } from 'react-router-dom';
import {
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@material-ui/core';
import { useNft } from 'use-nft';
import axios from 'axios';
import abi from '../abi/NftAbi.json';

// let nftImageUrl = "";
export default function NftDetails() {
  // eslint-disable-next-line no-unused-vars
  const { address, contract, id } = useParams();
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8')
  );
  const [tokenHistory, settokenHistory] = useState([]);
  const [imgUrl, setimgUrl] = useState();

  // eslint-disable-next-line no-unused-vars
  const { loading, error, nft } = useNft(contract, id);

  const convertTimestampToDate = (epoch) => {
    const myDate = new Date(epoch * 1000);
    return myDate.toLocaleDateString();
  };

  const etherscanTxLink = (hash) => {
    return `https://etherscan.io/tx/${hash}`;
  };

  const shortaddress = (addy) => {
    if (addy === '') {
      return addy;
    }

    const l = addy.length;

    return `${addy[0] + addy[1] + addy[2] + addy[3] + addy[4] + addy[5]}...${addy[l - 4]}${
      addy[l - 3]
    }${addy[l - 2]}${addy[l - 1]}`;
  };

  useEffect(() => {
    async function getEvents() {
      const nftHistoryData = [];
      const contractInstance = await new web3.eth.Contract(abi, contract);
      const historical_block = 0;
      const events = await contractInstance.getPastEvents('Transfer', {
        filter: { tokenId: id },
        fromBlock: historical_block,
        toBlock: 'latest',
      });

      for (let i = 0; i < events.length; i++) {
        const object = {};
        const block = await web3.eth.getBlock(events[i].blockNumber);
        object.timestamp = block.timestamp;
        object.from = events[i].returnValues.from;
        object.to = events[i].returnValues.to;
        object.hash = events[i].transactionHash;
        nftHistoryData.push(object);
      }
      settokenHistory(nftHistoryData);

      console.log('nft history details:::', events);
      console.log('formatted data:::', nftHistoryData);
    }

    getEvents();
  }, [contract, id]);

  useEffect(() => {
    const nftDetail = async () => {
      const response = await axios.get(
        `https://api.opensea.io/api/v1/assets?token_ids=${id}&asset_contract_addresses=${contract}`
      );
      setimgUrl(response.data.assets[0].image_url);
    };

    nftDetail();
  }, [contract, id]);

  return (
    <Container>
      {console.log('value of nft::', nft)}
      <Typography variant="h2" align="center">
        {loading ? '' : nft !== undefined ? nft.name : ''}
      </Typography>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6} sx={{ border: '1px solid #737373', borderRadius: '10px' }}>
          {/* <img alt="nft-image" style={{height:'96%'}} src={loading ? spinner : (nft !== undefined ? (nft.image !== "" ? nft.image : block) : block)}></img> */}
          <img alt="nft-image" style={{ height: '96%' }} src={imgUrl} />
        </Grid>
        {/* <Grid itme md={1}></Grid> */}
        <Grid item xs={12} md={5} sx={{ border: '1px solid #737373', ml: 3, borderRadius: '10px' }}>
          {/* {tokenHistory.length > 0 ?
                        <Box sx={{ border: '1px solid red' }}>
                            <Typography variant='h5' align='center' sx={{ mt: 2 }}>Token History</Typography>
                            <Stack direction='row' spacing={15} sx={{ mt: 2, ml: 5 }}>
                                <Typography variant='body1' align='left'>Date</Typography>
                                <Typography variant='body1' align='left'>From</Typography>
                                <Typography variant='body1' align='left'>To</Typography>
                            </Stack>
                            {tokenHistory.map((object) => (
                                <div>
                                    <Stack direction='row' spacing={15} sx={{ mt: 2, ml: 5 }}>
                                        <Typography variant='body1' align='left'>{convertTimestampToDate(object.timestamp)}</Typography>
                                        <Typography variant='body1' align='left'>{shortaddress(object.from)}</Typography>
                                        <Typography variant='body1' align='left'>{shortaddress(object.to)}</Typography>
                                    </Stack>
                                </div>
                            ))}
                        </Box> :
                        <div></div>
                    } */}
          <Stack>
            <Typography variant="h6" align="center" sx={{ color: '#737373' }}>
              About
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 4,
                color: '#737373',
              }}>
              {loading ? '' : nft !== undefined ? nft.description : ''}
            </Typography>
            <Divider variant="middle" sx={{ mt: 5 }} />
            <Typography variant="h6" align="center" sx={{ mt: 4, color: '#737373' }}>
              Transfer History
            </Typography>
            {tokenHistory.length > 0 ? (
              <List>
                <ListItem>
                  <ListItemText variant="body1" align="left" sx={{ color: '#737373' }}>
                    Date
                  </ListItemText>
                  <ListItemText variant="body1" align="left" sx={{ color: '#737373' }}>
                    From
                  </ListItemText>
                  <ListItemText variant="body1" align="left" sx={{ color: '#737373' }}>
                    To
                  </ListItemText>
                </ListItem>
                {tokenHistory.map((object, index) => (
                  <Link key={index} href={etherscanTxLink(object.hash)} underline="none">
                    <ListItem
                      divider
                      sx={{
                        '&:hover': {
                          background: (theme) => theme.palette.gradients.custom,
                          cursor: 'pointer',
                        },
                      }}>
                      <ListItemText variant="body1" align="left" sx={{ color: '#737373' }}>
                        {convertTimestampToDate(object.timestamp)}
                      </ListItemText>
                      <ListItemText variant="body1" align="left" sx={{ color: '#737373' }}>
                        {shortaddress(object.from)}
                      </ListItemText>
                      <ListItemText variant="body1" align="left" sx={{ color: '#737373' }}>
                        {shortaddress(object.to)}
                      </ListItemText>
                    </ListItem>
                  </Link>
                ))}
              </List>
            ) : (
              <div />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
