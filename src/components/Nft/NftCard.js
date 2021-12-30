import { Box, Card, Typography, Stack } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import spinner from '../../assets/icons/spinner.svg';
import MenuPopover from '../MenuPopover';
import NftDetails from '../../screens/NftDetail';
import NFT_Popover from '../NFT_Popover';
import Popup from '../PopUp';
import PopupMobile from '../PopUpMobile';
import NftDetailsMobile from '../../screens/NFTDetailMobile';
import { useWeb3React } from '@web3-react/core';

const NftImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const Image_Grid = styled(Box)(({ theme }) => ({
  borderRadius: '10px',
  width: '255px', // 325
  height: '264px', // 334
  marginLeft: '12px',
  ['@media (max-width:600px)']: {
    // eslint-disable-line no-useless-computed-key
    margin: 'auto',
    textAlign: 'center',
    width: '170px',
    height: '170px',
  },
}));

const NFT_Name = styled(Typography)(({ theme }) => ({
  fontWeight: '800',
  fontSize: '20px',
  lineHeight: '31px',
  marginTop: '16px',
  marginLeft: '11px',
  ['@media (max-width:600px)']: {
    // eslint-disable-line no-useless-computed-key
    textAlign: 'left',
    fontSize: '14px',
    marginTop: '1px',
    marginLeft: '1px',
  },
}));

const NFT_Price = styled(Typography)(({ theme }) => ({
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '22px',
  ['@media (max-width:600px)']: {
    // eslint-disable-line no-useless-computed-key
    textAlign: 'left',
    fontSize: '10px',
    opacity: 0.5,
    marginTop: '-10px',
    marginLeft: '-12px',
  },
}));

const NFT_Price_data = styled('div')(({ theme }) => ({
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '22px',
  marginLeft: '-40px',
  ['@media (max-width:600px)']: {
    // eslint-disable-line no-useless-computed-key
    textAlign: 'left',
    fontSize: '10px',
    opacity: 0.5,
    marginTop: '-10px',
    marginLeft: '-12px',
  },
}));

// ----------------------------------------------------------------------

export default function NftCard({
  tokenId,
  contractAddress,
  txHash,
  ethUSDPrice,
  changeTheme,
  NFTDATA,
  propnetWorth,
}) {
  const navigate = useNavigate();
  const { address } = useParams();
  const [price, setprice] = useState(0);
  const [nftDetails, setnftDetails] = useState();
  const [account, setaccount] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [flag_nft, setflag_nft] = useState('');
  const [Address_NFT, setAddress_NFT] = useState(contractAddress);
  const [tokenId_NFT, settokenId_NFT] = useState(tokenId);
  const [Theme_NFT, setTheme_NFT] = useState(localStorage.getItem('selectedTheme'));
  const [flagKill, setflagKill] = useState(1);
  const [testName, settestName] = useState('');
  const [netWorth, setnetWorth] = useState(0);
  let temp_Address = '';
  let temp_TokenId = '';
  const showAccountPopover = () => {
    setaccount(true);
  };
  const hideAccountPopover = () => {
    setaccount(false);
  };

  const { activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  useEffect(() => {
    propnetWorth(netWorth);
  }, [netWorth]);

  const Card_NFT = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    width: '309px', //379
    height: '381px', // 451
    '&:hover': {
      // background: changeTheme
      //   ? theme.palette.nft_light.hoverNFTdata
      //   : theme.palette.nft_dark.hoverNFTdata,
      color: changeTheme ? '#4453AD' : 'white',
      backdropFilter: 'blur(30px)',
      // border: (theme) => `solid 1px ${theme.palette.grey[500_8]}`,
      mixBlendMode: 'normal',
      boxShadow: '7px 21px 22px -15px rgba(51, 78, 131, 0.1)',
    },
    ['@media (max-width:600px)']: {
      // eslint-disable-line no-useless-computed-key
      margin: 'auto',
      marginTop: '80px',
      textAlign: 'center',
      width: '170px',
      height: '170px',
    },
    borderRadius: '10px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '15px',
  }));

  useEffect(() => {
    const wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));
    const nftDetail = async () => {
      var count = 0;
      // console.log('hash sathya tracs', txHash, contractAddress);
      try {
        await wait(1000);
        const response = await axios.get(
          `https://api.opensea.io/api/v1/assets?token_ids=${tokenId}&asset_contract_addresses=${contractAddress}`
        );
        await wait(1000);
        const tempObject = {};
        // console.log(
        //   txHash,
        //   'sathuaurl',
        //   `https://api.opensea.io/api/v1/assets?token_ids=${tokenId}&asset_contract_addresses=${contractAddress}`
        // );
        if (response.data.assets[0].name) {
          tempObject.name = response.data.assets[0].name;
          tempObject.img = response.data.assets[0].image_url;
          setnftDetails(tempObject);
          // console.log('responsecode', response);
          sessionStorage.setItem('nftCount', 0);
          sessionStorage.setItem('nftCount_left', 0);
          // count++;
        }
      } catch (err) {
        console.log('error in card', err);
      }
    };
    nftDetail();
  }, [contractAddress, tokenId]);

  // useEffect(async () => {
  //   const tempObject1 = {};
  //   const responce_price = await axios.get(
  //     `https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`
  //   );
  //   tempObject1.name = responce_price.data.asset_contract.name;
  //   // tempObject1.usd_price = responce_price.data.last_sale.payment_token.usd_price;
  //   tempObject1.price = responce_price.data.collection.stats.average_price;
  //   // tempObject1.img = responce_price.data.image_original_url;
  //   // setnftDetails(tempObject1);
  //   settestName(tempObject1.name);
  //   setprice(tempObject1.price);
  //   console.log('test sathya name2', responce_price);
  // }, [contractAddress, tokenId]);
  async function getWeb3() {
    const provider = await connector.getProvider(
      'https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8'
    );
    const web3 = await new Web3(provider);
    return web3;
  }

  const getTransactionValue = async (hash) => {
    const web3 = await getWeb3();
    // const tx = await web3.eth.getTransaction(
    //   '0x3dbf57317b11b83ce4365ba2642aaf707bd7ee22ed7a441870e9e99e2fccd713'
    // )
    var tx = '';
    try {
      // tx = await web3.eth.getTransaction(hash);
      tx = await web3.eth.getTransaction(txHash[0]);
      // console.log('tx sathya', tx);
    } catch (err) {
      console.log('eerr sathya', err);
    }
    let usdPrice = 1;
    if (tx.value > 0) {
      const valueInWei = parseInt(tx.value);
      settestName(tx.value);
      // try {
      //   const response = await axios.get(
      //     `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR`
      //   );
      //   usdPrice = response.data.USD;
      // } catch (err) {
      //   console.log('error in usd price', err);
      // }
      // console.log('sathyakrihna', usdPrice);
      setprice(parseFloat((valueInWei / 10 ** 18) * ethUSDPrice).toFixed(2));
      // setnetWorth(parseFloat(localStorage.getItem('netWorth')) + price);
      let sum = localStorage.getItem('netWorth');
      sum = parseFloat(sum);
      let floatPrice = parseFloat(parseFloat((valueInWei / 10 ** 18) * ethUSDPrice).toFixed(2));
      sum = sum + floatPrice;
      // console.log('value of wei', valueInWei, 'value of eth', valueInWei / 10 ** 18);
      // console.log('float price sum sathya', floatPrice);
      localStorage.setItem('netWorth', sum);
      // console.log('resulrt sum sathya', sum);
      setnetWorth(sum);
    }
  };
  useEffect(async () => {
    // console.log('inside useefect sathya');
    await getTransactionValue(txHash);
  }, [contractAddress, tokenId]);

  useEffect(async () => {
    let nftdata = localStorage.getItem('nftdata');
    let parsed_nftdata = JSON.parse(nftdata);
    var keys = Object.keys(parsed_nftdata);
    var index = keys.indexOf(parsed_nftdata);
    let contractAddress_nft = '';
    let name = '';
    let count_session = sessionStorage.getItem('nftCount');
    try {
      if (
        flag_nft !== '' &&
        flag_nft == 'plus' &&
        count_session < parsed_nftdata.length &&
        count_session > -1
      ) {
        let count = sessionStorage.getItem('nftCount');
        count = parseInt(count) + 1;
        count < parsed_nftdata.length && sessionStorage.setItem('nftCount', count);
        for (let i = 0; i < parsed_nftdata.length; i++) {
          if (tokenId == parsed_nftdata[i].token && count < parsed_nftdata.length) {
            i + count < parsed_nftdata.length && setAddress_NFT(parsed_nftdata[i + count].address);
            i + count < parsed_nftdata.length && settokenId_NFT(parsed_nftdata[i + count].token);
          }
        }
      }
      if (
        flag_nft !== '' &&
        flag_nft == 'minus' &&
        count_session < parsed_nftdata.length &&
        count_session > -1
      ) {
        let count = sessionStorage.getItem('nftCount_left');
        count = parseInt(count) - 1;
        sessionStorage.setItem('nftCount_left', count);
        for (let i = 0; i < parsed_nftdata.length; i++) {
          if (tokenId == parsed_nftdata[i].token) {
            setAddress_NFT(parsed_nftdata[i + count].address);
            settokenId_NFT(parsed_nftdata[i + count].token);
            // temp_Address = parsed_nftdata[i - 1].address;
            // temp_TokenId = parsed_nftdata[i - 1].token;
          }
        }
      }
    } catch (err) {
      // do smg
    }
  }, [flag_nft, flagKill]);

  const routeToDetailPage = () => {
    // navigate(`/${address}/nftdetails/${contractAddress}/${tokenId}`);
  };

  return (
    <>
      <Card_NFT
        onClick={() => {
          // showAccountPopover();
          // getTransactionValue(txHash);
          setOpenPopup(true);
        }}>
        <Image_Grid sx={{ position: 'relative' }}>
          {nftDetails !== undefined ? (
            <NftImgStyle
              alt=" "
              style={{ height: '100%', width: '100%', borderRadius: '10px' }}
              src={nftDetails.img}
            />
          ) : (
            <NftImgStyle alt=" " src={spinner} />
          )}
        </Image_Grid>

        <Stack spacing={0.5}>
          {/* <Link to="#" color="inherit" underline="hover" component={RouterLink}> */}
          <NFT_Name noWrap>{nftDetails !== undefined ? nftDetails.name : 'loading'}</NFT_Name>
          {price == 0 ? (
            <div style={{ marginLeft: '13px' }}>
              <NFT_Price align="left">$ 0.00</NFT_Price>
            </div>
          ) : (
            <NFT_Price_data style={{ marginLeft: '10px' }}>
              <Typography>$ {price}</Typography>
            </NFT_Price_data>
          )}

          <Stack direction="row" alignItems="center" justifyContent="space-between" />
        </Stack>
      </Card_NFT>
      {!isMobile ? (
        <Popup title="Disconnect" openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <NftDetails
            setOpenPopup={(w) => setOpenPopup(w)}
            changeNFT={(flag_nft) => setflag_nft(flag_nft)}
            flagNFT={(w) => setflagKill(w)}
            contract={Address_NFT}
            id={tokenId_NFT}
            NFT_Price={price}
          />
        </Popup>
      ) : (
        <PopupMobile title="Disconnect" openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <NftDetailsMobile
            setOpenPopup={(w) => setOpenPopup(w)}
            changeNFT={(flag_nft) => setflag_nft(flag_nft)}
            flagNFT={(w) => setflagKill(w)}
            contract={Address_NFT}
            id={tokenId_NFT}
            NFT_Price={price}
          />
        </PopupMobile>
      )}
    </>
  );
}
