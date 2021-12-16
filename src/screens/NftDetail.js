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
import { experimentalStyled as styled } from '@material-ui/core/styles';
import close_NFT_popup from '../assets/icons/close_NFT_popup.svg';
import arrow_nft from '../assets/icons/arrow_nft.svg';
import nft_popup_1 from '../assets/icons/nft_popup_1.svg';
import nft_popup_2 from '../assets/icons/nft_popup_2.svg';
import nft_popup_3 from '../assets/icons/nft_popup_3.svg';
import nft_left_popup from '../assets/icons/nft_left_popup.svg';
import nft_right_popup from '../assets/icons/nft_right_popup.svg';
import nft_dark_1 from '../assets/icons/nft_dark_1.svg';
import nft_dark_2 from '../assets/icons/nft_dark_2.svg';
import nft_dark_3 from '../assets/icons/nft_dark_3.svg';
import nft_close_dark from '../assets/icons/nft_close_dark.svg';
import nft_arrow_dark from '../assets/icons/nft_arrow_dark.svg';
import nft_right_pop from '../assets/icons/nft_right_pop.svg';
import nft_left_pop from '../assets/icons/nft_left_pop.svg';

const ImageBorder = styled(Grid)(({ theme }) => ({
  borderRadius: '10px',
  width: '499px',
  height: '555px',
  marginTop: '9px',
  marginLeft: '-1.4rem',
}));

const Image = styled('img')(({ theme }) => ({
  background: 'grren',
}));

const Image_Close = styled('img')(({ theme }) => ({
  marginTop: '-3.5rem',
  marginLeft: '520px',
  cursor: 'pointer',
  opacity: 1,
}));

const Image_Close_dark = styled('img')(({ theme }) => ({
  marginTop: '-3rem',
  marginLeft: '520px',
  cursor: 'pointer',
}));

const Arrow_dark = styled('img')(({ theme }) => ({
  marginTop: '1rem',
  marginLeft: '520px',
  cursor: 'pointer',
}));

const Arrow = styled('img')(({ theme }) => ({
  marginTop: '-0.4rem',
  marginLeft: '520px',
  cursor: 'pointer',
}));

const LeftArrow = styled('img')(({ theme }) => ({
  position: 'absolute',
  top: '42%',
  marginLeft: '-7rem',
  cursor: 'pointer',
}));

const RightArrow = styled('img')(({ theme }) => ({
  position: 'absolute',
  top: '42%',
  marginLeft: '67.8rem',
  cursor: 'pointer',
}));

const NFT_Title = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '31px',
  color:
    localStorage.getItem('selectedTheme') == 'Day'
      ? theme.palette.nft_light.NFT_popup_name
      : theme.palette.nft_dark.NFT_popup_name,
  marginLeft: '41px',
  marginTop: '10px',
}));

const NFT_Title_sub = styled(Typography)(({ theme }) => ({
  fontSize: '10px',
  lineHeight: '16px',
  marginLeft: '41px',
  marginTop: '3px',
  opacity: 0.5,
}));

const Balance = styled(Typography)(({ theme }) => ({
  fontSize: '26px',
  fontWeight: 600,
  lineHeight: '40px',
  marginLeft: '2.5rem',
  marginTop: '-2.2rem',
}));

const About = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '26px',
  marginLeft: '2.5rem',
  marginTop: '18px',
}));

const About_Body = styled(Typography)(({ theme }) => ({
  marginLeft: '2.5rem',
  marginTop: '10px',
}));

const TransferHistory = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '26px',
  marginLeft: '2.5rem',
  marginTop: '30px',
}));

const Tranfer_body = styled(List)(({ theme }) => ({
  marginLeft: '2.3rem',
}));

const Tranfer_Body = styled(ListItemText)(({ theme }) => ({
  // color: (theme) => theme.palette.menu.backgorundColor_wallet;
  color:
    localStorage.getItem('selectedTheme') == 'Day'
      ? theme.palette.nft_light.NFT_bodyFont
      : theme.palette.nft_dark.NFT_bodyFont,
}));

const Social = styled(Stack)(({ theme }) => ({
  // color: (theme) => theme.palette.menu.backgorundColor_wallet;
  marginLeft: '2.5rem',
  position: 'absolute',
  bottom: '15px',
  cursor: 'pointer',
}));

const Container_nft = styled(Container)(({ theme }) => ({
  // color: (theme) => theme.palette.menu.backgorundColor_wallet;
  color:
    localStorage.getItem('selectedTheme') == 'Day'
      ? theme.palette.nft_light.NFT_bodyFont
      : theme.palette.nft_dark.NFT_bodyFont,
}));

// let nftImageUrl = "";
export default function NftDetails({ contract, id, changeNFT, setOpenPopup, flagNFT }) {
  // eslint-disable-next-line no-unused-vars
  // const { address, contract, id } = useParams();
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8')
  );
  const [tokenHistory, settokenHistory] = useState([]);
  const [imgUrl, setimgUrl] = useState();
  const [nftName, setnftName] = useState('');
  const [assestName, setassestName] = useState('');

  // eslint-disable-next-line no-unused-vars
  const { loading, error, nft } = useNft(contract, id);

  const convertTimestampToDate = (epoch) => {
    const myDate = new Date(epoch * 1000);
    return myDate.toLocaleDateString();
  };

  const etherscanTxLink = (hash) => {
    return `https://etherscan.io/tx/${hash}`;
  };

  const nftclose = () => {
    sessionStorage.setItem('nftCount', 0);
    sessionStorage.setItem('nftCount_left', 0);
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
    }

    getEvents();
  }, [contract, id]);

  useEffect(() => {
    const nftDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.opensea.io/api/v1/assets?token_ids=${id}&asset_contract_addresses=${contract}`
        );
        setimgUrl(response.data.assets[0].image_url);
        setnftName(response.data.assets[0].name);
        setassestName(response.data.assets[0].asset_contract.name);
      } catch (err) {
        console.log('errorinnftdetaILS', err);
      }
    };

    nftDetail();
  }, [contract, id, changeNFT, nftName, assestName]);

  return (
    <Container_nft>
      <Grid container spacing={1}>
        {/* <Typography variant="h2" align="center">
          {loading ? '' : nft !== undefined ? nft.name : ''}
        </Typography> */}
        <ImageBorder>
          <Image
            alt="Loading"
            style={{ height: '100%', width: '100%', borderRadius: '10px' }}
            src={imgUrl}
          />
        </ImageBorder>
        {/* <div style={{ display: 'flex' }}>
          <NFT_Title>Token Hunter</NFT_Title>
          <Image_Close src={close_NFT_popup} />
          <a href="url">
            <img src={arrow_nft} className="imageCSS" alt="" />
          </a>
        </div> */}
        <Grid item md={6.4}>
          <Stack direction="row">
            <Stack>
              <NFT_Title>
                {loading ? 'loading...' : assestName !== '' ? assestName : 'loading...'}
              </NFT_Title>
              <NFT_Title_sub>
                {loading ? 'loading...' : nftName !== '' ? nftName : 'loading...'}
              </NFT_Title_sub>
              {localStorage.getItem('selectedTheme') == 'Day' ? (
                <Stack>
                  <Image_Close
                    onClick={() => {
                      setOpenPopup(false);
                      nftclose();
                      changeNFT('');
                    }}
                    style={{ height: '60px', width: '60px', opacity: 0.9 }}
                    src={close_NFT_popup}
                    alt="no pic"
                  />
                  <Arrow
                    style={{ height: '60px', width: '60px', px: '100%' }}
                    src={arrow_nft}
                    alt="no pic"
                  />
                  <Balance align="left">$ 5,457.36</Balance>
                </Stack>
              ) : (
                <Stack>
                  <Image_Close_dark
                    onClick={() => {
                      setOpenPopup(false);
                      nftclose();
                    }}
                    style={{ height: '40px', width: '40px' }}
                    src={nft_close_dark}
                    alt="no pic"
                  />
                  <Arrow_dark
                    style={{ height: '40px', width: '40px', px: '100%' }}
                    src={nft_arrow_dark}
                    alt="no pic"
                  />
                  <Balance align="left">$ 5,457.36</Balance>
                </Stack>
              )}
            </Stack>
          </Stack>
          <Stack>
            <About>{loading ? '' : nft !== undefined ? 'About' : ''}</About>
            <About_Body variant="AboutBody">
              {loading ? '' : nft !== undefined ? nft.description : ''}
            </About_Body>
            {/* <Divider variant="middle" sx={{ mt: 5 }} /> */}
            <TransferHistory>Transfer History</TransferHistory>
            {tokenHistory.length > 0 ? (
              <Tranfer_body>
                <ListItem
                  sx={{
                    color:
                      localStorage.getItem('selectedTheme') == 'Day'
                        ? (theme) => theme.palette.nft_light.NFT_bodyFont
                        : (theme) => theme.palette.nft_dark.NFT_bodyFont,
                    '&:hover': {
                      background: 'none',
                      color:
                        localStorage.getItem('selectedTheme') == 'Day'
                          ? (theme) => theme.palette.nft_light.NFT_bodyFont
                          : (theme) => theme.palette.nft_dark.NFT_bodyFont,
                      cursor: 'pointer',
                    },
                  }}>
                  <ListItemText sx={{ opacity: 0.5, fontSize: 4 }} align="left">
                    <p style={{ fontSize: '10px' }}>Date </p>
                  </ListItemText>
                  <ListItemText variant="tranfer_title" style={{ opacity: 0.5 }} align="left">
                    <p style={{ fontSize: '10px' }}>From </p>
                  </ListItemText>
                  <ListItemText variant="tranfer_title" style={{ opacity: 0.5 }} align="left">
                    <p style={{ fontSize: '10px' }}>To </p>
                  </ListItemText>
                </ListItem>
                {tokenHistory.map((object, index) => (
                  <Link key={index} href={etherscanTxLink(object.hash)} underline="none">
                    <ListItem
                      divider
                      sx={{
                        '&:hover': {
                          background:
                            localStorage.getItem('selectedTheme') == 'Day'
                              ? (theme) => theme.palette.nft_light.hoverNFTdata
                              : (theme) => theme.palette.nft_dark.hoverNFTdata,
                          cursor: 'pointer',
                        },
                      }}>
                      <Tranfer_Body variant="transferbody" align="left">
                        {convertTimestampToDate(object.timestamp)}
                      </Tranfer_Body>
                      <Tranfer_Body variant="transferbody" align="left">
                        {shortaddress(object.from)}
                      </Tranfer_Body>
                      <Tranfer_Body variant="transferbody" align="left">
                        {shortaddress(object.to)}
                      </Tranfer_Body>
                    </ListItem>
                  </Link>
                ))}
              </Tranfer_body>
            ) : (
              <div />
            )}
          </Stack>
          {localStorage.getItem('selectedTheme') == 'Day' ? (
            <Social direction="row" spacing={1}>
              <img src={nft_popup_1} alt="" />
              <img src={nft_popup_2} alt="" />
              <img src={nft_popup_3} alt="" />
            </Social>
          ) : (
            <Social direction="row" spacing={4}>
              <img src={nft_dark_1} alt="" />
              <img src={nft_dark_2} alt="" />
              <img src={nft_dark_3} alt="" />
            </Social>
          )}
          {/* <button
            onClick={() => {
              changeNFT('minus');
            }}>
            satya -
          </button>
          <button
            onClick={() => {
              changeNFT('contract');
            }}>
            satya +
          </button> */}
        </Grid>
      </Grid>
      {localStorage.getItem('selectedTheme') == 'Day' ? (
        <>
          <LeftArrow
            onClick={() => {
              changeNFT('minus');
              flagNFT(Math.random());
            }}
            src={nft_left_popup}
            alt=""
          />
          <RightArrow
            onClick={() => {
              changeNFT('plus');
              flagNFT(Math.random());
            }}
            src={nft_right_popup}
            alt=""
          />
        </>
      ) : (
        <>
          <LeftArrow
            onClick={() => {
              changeNFT('minus');
              flagNFT(Math.random());
            }}
            src={nft_left_pop}
            alt=""
          />
          <RightArrow
            onClick={() => {
              changeNFT('plus');
              flagNFT(Math.random());
            }}
            src={nft_right_pop}
            alt=""
          />
        </>
      )}
    </Container_nft>
  );
}
