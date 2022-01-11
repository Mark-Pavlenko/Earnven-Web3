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
import nft_popup_1 from '../assets/icons/nftpopup1.svg';
import nft_popup_2 from '../assets/icons/nftpopup2.svg';
import nft_popup_3 from '../assets/icons/nftpopup3.svg';
import nft_left_popup from '../assets/icons/nft_left_popup.svg';
import nft_right_popup from '../assets/icons/nft_right_popup.svg';
import nft_dark_1 from '../assets/icons/nft_dark_1.svg';
import nft_dark_2 from '../assets/icons/nft_dark_2.svg';
import nft_dark_3 from '../assets/icons/nft_dark_3.svg';
import nft_close_dark from '../assets/icons/nft_close_dark.svg';
import nft_arrow_dark from '../assets/icons/nft_arrow_dark.svg';
import nft_right_pop from '../assets/icons/nft_right_pop.svg';
import nft_left_pop from '../assets/icons/nft_left_pop.svg';
import close_nft from '../assets/icons/close_nft.svg';
import arrownft from '../assets/icons/arrownft.svg';
import closenftdark from '../assets/icons/closenftdark.svg';
import arrordark from '../assets/icons/arrordark.svg';
import rightarrow from '../assets/icons/rightarrow.svg';
import leftarrownft from '../assets/icons/leftarrownft.svg';
import rightdarknft from '../assets/icons/rightdarknft.svg';
import leftdarknft from '../assets/icons/leftdarknft.svg';

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
  // marginTop: '-3.5rem',
  // marginLeft: '520px',
  // cursor: 'pointer',
  // opacity: 1,
  margin: 'auto',
  marginTop: '15px',
}));

const Image_Close_Div = styled('div')(({ theme }) => ({
  width: '40px',
  height: '40px',
  marginTop: '-3rem',
  marginLeft: '520px',
  borderRadius: '7px',
  cursor: 'pointer',
  // background:
  //   localStorage.getItem('selectedTheme') == 'Day'
  //     ? theme.palette.nft_light.background
  //     : theme.palette.nft_dark.background,
  boxShadow: 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.16)',
    backdropFilter: 'blur(35px)',
    mixBlendMode: 'normal',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  },
}));

const Image_Close_Div_dark = styled('div')(({ theme }) => ({
  width: '40px',
  height: '40px',
  marginTop: '-3rem',
  marginLeft: '520px',
  borderRadius: '7px',
  cursor: 'pointer',
  // background: theme.palette.nft_dark.hoverNFTdata,
  boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.16)',
    backdropFilter: 'blur(35px)',
    mixBlendMode: 'normal',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  },
}));

const Arrow_Close_Div = styled('div')(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '7px',
  cursor: 'pointer',
  marginLeft: '520px',
  marginTop: '14px',
  // background: theme.palette.nft_light.background,
  boxShadow: 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.16)',
    backdropFilter: 'blur(35px)',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  },
}));

const Right_arrow_div = styled('div')(({ theme }) => ({
  width: '41px',
  height: '40px',
  borderRadius: '7px',
  cursor: 'pointer',
  // background: theme.palette.nft_light.background,
  boxShadow: 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.16)',
    backdropFilter: 'blur(35px)',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  },
}));

const Arrow_Close_Div_dark = styled('div')(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '7px',
  cursor: 'pointer',
  marginLeft: '520px',
  marginTop: '14px',
  // background: theme.palette.nft_dark.hoverNFTdata,
  boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  mixBlendMode: 'normal',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.16)',
    backdropFilter: 'blur(35px)',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
  },
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
  margin: 'auto',
  marginTop: '15px',
}));

const LeftArrow = styled('img')(({ theme }) => ({
  margin: 'auto',
  marginTop: '15px',
}));

const LeftArrow_Div = styled('div')(({ theme }) => ({
  width: '41px',
  position: 'absolute',
  top: '42%',
  marginLeft: '-7rem',
  height: '41px',
  borderRadius: '7px',
  cursor: 'pointer',
  // background:
  //   localStorage.getItem('selectedTheme') == 'Day'
  //     ? theme.palette.nft_light.background
  //     : theme.palette.nft_dark.background,
  boxShadow: 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.16)',
    backdropFilter: 'blur(35px)',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  },
}));

const LeftArrow_Div_dark = styled('div')(({ theme }) => ({
  width: '41px',
  height: '41px',
  borderRadius: '7px',
  cursor: 'pointer',
  position: 'absolute',
  top: '42%',
  marginLeft: '-7rem',
  // background: theme.palette.nft_dark.hoverNFTdata,
  boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  mixBlendMode: 'normal',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.16)',
    backdropFilter: 'blur(35px)',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
  },
}));

const RightArrow_Div_dark = styled('div')(({ theme }) => ({
  width: '41px',
  height: '41px',
  borderRadius: '7px',
  cursor: 'pointer',
  position: 'absolute',
  top: '42%',
  marginLeft: '67.8rem',
  // background: theme.palette.nft_dark.hoverNFTdata,
  boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  mixBlendMode: 'normal',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.16)',
    backdropFilter: 'blur(35px)',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
  },
}));

const RightArrow = styled('img')(({ theme }) => ({
  margin: 'auto',
  marginTop: '15px',
}));

const RightArrow_Div = styled('div')(({ theme }) => ({
  width: '41px',
  position: 'absolute',
  top: '42%',
  marginLeft: '67.8rem',
  height: '41px',
  borderRadius: '7px',
  cursor: 'pointer',
  // background:
  //   localStorage.getItem('selectedTheme') == 'Day'
  //     ? theme.palette.nft_light.background
  //     : theme.palette.nft_dark.background,
  boxShadow: 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.16)',
    backdropFilter: 'blur(35px)',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  },
}));

const NFT_Title = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '31px',
  // color:
  //   localStorage.getItem('selectedTheme') == 'Day'
  //     ? theme.palette.nft_light.NFT_popup_name
  //     : theme.palette.nft_dark.NFT_popup_name,
  marginLeft: '41px',
  marginTop: '10px',
}));

const NFT_Title_sub = styled(Typography)(({ theme }) => ({
  fontSize: '10px',
  lineHeight: '16px',
  marginLeft: '41px',
  marginTop: '3px',
  // color:
  //   localStorage.getItem('selectedTheme') == 'Day'
  //     ? theme.palette.nft_light.NFT_bodyFont
  //     : theme.palette.nft_dark.NFT_bodyFont,
  opacity: localStorage.getItem('selectedTheme') == 'Day' ? 0.5 : 1,
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
  // color:
  //   localStorage.getItem('selectedTheme') == 'Day'
  //     ? theme.palette.nft_light.NFT_bodyFont
  //     : theme.palette.nft_dark.NFT_bodyFont,
  opacity: localStorage.getItem('selectedTheme') == 'Day' ? 0.5 : 1,
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
  // color:
  //   localStorage.getItem('selectedTheme') == 'Day'
  //     ? theme.palette.nft_light.NFT_bodyFont
  //     : theme.palette.nft_dark.NFT_bodyFont,
}));

const Tranfer_Body_Title = styled('p')(({ theme }) => ({
  // color:
  //   localStorage.getItem('selectedTheme') == 'Day'
  //     ? theme.palette.nft_light.NFT_bodyFont
  //     : theme.palette.nft_dark.NFT_bodyFont,
  opacity: localStorage.getItem('selectedTheme') == 'Day' ? 0.5 : 1,
}));

const Social = styled(Stack)(({ theme }) => ({
  // color: (theme) => theme.palette.menu.backgorundColor_wallet;
  marginLeft: '2.5rem',
  position: 'absolute',
  bottom: '15px',
  cursor: 'pointer',
}));

const Social_light = styled(Stack)(({ theme }) => ({
  // color: (theme) => theme.palette.menu.backgorundColor_wallet;
  marginLeft: '2.5rem',
  position: 'absolute',
  bottom: '15px',
  cursor: 'pointer',
}));

const Container_nft = styled(Container)(({ theme }) => ({
  // color: (theme) => theme.palette.menu.backgorundColor_wallet;
  // color:
  //   localStorage.getItem('selectedTheme') == 'Day'
  //     ? theme.palette.nft_light.NFT_bodyFont
  //     : theme.palette.nft_dark.NFT_bodyFont,
}));

// let nftImageUrl = "";
export default function NftDetails({ contract, id, changeNFT, setOpenPopup, flagNFT, NFT_Price }) {
  // eslint-disable-next-line no-unused-vars
  // const { address, contract, id } = useParams();
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8')
  );
  const [tokenHistory, settokenHistory] = useState([]);
  const [imgUrl, setimgUrl] = useState();
  const [nftName, setnftName] = useState('');
  const [assestName, setassestName] = useState('');
  const [eLink, seteLink] = useState('');
  const [openseaLink, setopenseaLink] = useState('');
  const [raribleLink, setraribleLink] = useState('');

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

  const walletAddressCutter = (addy) => {
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
      seteLink(`https://etherscan.io/token/${contract}`);
      setopenseaLink(`https://opensea.io/assets/${contract}/${id}`);
      setraribleLink(`https://rarible.com/token/${contract}:${id}?tab=details`);
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
        console.log('error in nft page', err);
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
                  <Image_Close_Div
                    onClick={() => {
                      setOpenPopup(false);
                      nftclose();
                      changeNFT('');
                    }}>
                    <Image_Close
                      onClick={() => {
                        setOpenPopup(false);
                        nftclose();
                        changeNFT('');
                      }}
                      style={{ height: '14px', width: '14px' }}
                      src={close_nft}
                      alt="no pic"
                    />
                  </Image_Close_Div>
                  <Arrow_Close_Div>
                    <a href="#">
                      <Arrow
                        style={{ height: '14px', width: '14px' }}
                        src={arrownft}
                        alt="no pic"
                      />
                    </a>
                  </Arrow_Close_Div>
                  <Balance align="left">$ {NFT_Price}</Balance>
                </Stack>
              ) : (
                <Stack>
                  <Image_Close_Div_dark
                    onClick={() => {
                      setOpenPopup(false);
                      nftclose();
                      changeNFT('');
                    }}>
                    <Image_Close
                      onClick={() => {
                        setOpenPopup(false);
                        nftclose();
                        changeNFT('');
                      }}
                      style={{ height: '14px', width: '14px' }}
                      src={closenftdark}
                      alt="no pic"
                    />
                  </Image_Close_Div_dark>
                  <Arrow_Close_Div_dark>
                    <a href="#">
                      <Arrow
                        style={{ height: '14px', width: '14px' }}
                        src={arrordark}
                        alt="no pic"
                      />
                    </a>
                  </Arrow_Close_Div_dark>
                  <Balance align="left">$ {NFT_Price}</Balance>
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
                    // color:
                    //   localStorage.getItem('selectedTheme') == 'Day'
                    //     ? (theme) => theme.palette.nft_light.NFT_bodyFont
                    //     : (theme) => theme.palette.nft_dark.NFT_bodyFont,
                    '&:hover': {
                      background: 'none',
                      // color:
                      //   localStorage.getItem('selectedTheme') == 'Day'
                      //     ? (theme) => theme.palette.nft_light.NFT_bodyFont
                      //     : (theme) => theme.palette.nft_dark.NFT_bodyFont,
                      cursor: 'pointer',
                    },
                  }}>
                  <ListItemText sx={{ fontSize: 4 }} align="left">
                    <Tranfer_Body_Title style={{ fontSize: '10px' }}>Date </Tranfer_Body_Title>
                  </ListItemText>
                  <ListItemText variant="tranfer_title" align="left">
                    <Tranfer_Body_Title style={{ fontSize: '10px' }}>From </Tranfer_Body_Title>
                  </ListItemText>
                  <ListItemText variant="tranfer_title" align="left">
                    <Tranfer_Body_Title style={{ fontSize: '10px' }}>To </Tranfer_Body_Title>
                  </ListItemText>
                </ListItem>
                {tokenHistory.map((object, index) => (
                  <Link
                    key={index}
                    target="_blank"
                    href={etherscanTxLink(object.hash)}
                    underline="none">
                    <ListItem
                      divider
                      sx={{
                        '&:hover': {
                          // background:
                          //   localStorage.getItem('selectedTheme') == 'Day'
                          //     ? (theme) => theme.palette.nft_light.hoverNFTdata
                          //     : (theme) => theme.palette.nft_dark.hoverNFTdata,
                          cursor: 'pointer',
                        },
                      }}>
                      <Tranfer_Body variant="transferbody" align="left">
                        {convertTimestampToDate(object.timestamp)}
                      </Tranfer_Body>
                      <Tranfer_Body variant="transferbody" align="left">
                        {walletAddressCutter(object.from)}
                      </Tranfer_Body>
                      <Tranfer_Body variant="transferbody" align="left">
                        {walletAddressCutter(object.to)}
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
            <Social_light direction="row" spacing={4}>
              <a href={eLink} target="_blank">
                <img src={nft_popup_1} alt="" />
              </a>
              <a href={openseaLink} target="_blank">
                <img src={nft_popup_2} alt="" />
              </a>
              <a href={raribleLink} target="_blank">
                <img src={nft_popup_3} alt="" />
              </a>
            </Social_light>
          ) : (
            <Social direction="row" spacing={4}>
              <a href={eLink} target="_blank">
                <img src={nft_dark_1} alt="" />
              </a>
              <a href={openseaLink} target="_blank">
                <img src={nft_dark_2} alt="" />
              </a>
              <a href={raribleLink} target="_blank">
                <img src={nft_dark_3} alt="" />
              </a>
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
          <LeftArrow_Div
            onClick={() => {
              changeNFT('minus');
              flagNFT(Math.random());
            }}>
            <LeftArrow src={leftarrownft} alt="" />
          </LeftArrow_Div>
          <RightArrow_Div
            onClick={() => {
              changeNFT('plus');
              flagNFT(Math.random());
            }}>
            <RightArrow src={rightarrow} alt="" />
          </RightArrow_Div>
        </>
      ) : (
        <>
          <LeftArrow_Div_dark
            onClick={() => {
              changeNFT('minus');
              flagNFT(Math.random());
            }}>
            <LeftArrow src={leftdarknft} alt="" />
          </LeftArrow_Div_dark>
          <RightArrow_Div_dark
            onClick={() => {
              changeNFT('plus');
              flagNFT(Math.random());
            }}>
            <RightArrow src={rightdarknft} alt="" />
          </RightArrow_Div_dark>
        </>
      )}
    </Container_nft>
  );
}
