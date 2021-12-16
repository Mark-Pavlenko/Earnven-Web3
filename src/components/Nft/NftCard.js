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

const NftImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const Image_Grid = styled(Box)(({ theme }) => ({
  borderRadius: '10px',
  width: '325px',
  height: '334px',
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

// const Card_NFT = styled('div')(({ theme }) => ({
//   cursor: 'pointer',
//   '&:hover': {
//     background: 'rgba(31, 38, 92, 0.24)',
//     // border: (theme) => `solid 1px ${theme.palette.grey[500_8]}`,
//     mixBlendMode: 'normal',
//     // backdropFilter: 'blur(30px)',
//     boxShadow: '7px 21px 22px -15px rgba(51, 78, 131, 0.1)',
//   },
//   borderRadius: '10px',
//   paddingLeft: '15px',
//   paddingRight: '15px',
//   paddingTop: '15px',
// }));

// ----------------------------------------------------------------------

export default function NftCard({ tokenId, contractAddress, txHash, changeTheme, NFTDATA }) {
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
  const image12 = 'https://assets.coingecko.com/coins/images/15290/small/cwbtc.png?1620371929';
  let temp_Address = '';
  let temp_TokenId = '';
  const showAccountPopover = () => {
    setaccount(true);
  };
  const hideAccountPopover = () => {
    setaccount(false);
  };

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const Card_NFT = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    width: '379px',
    height: '451px',
    '&:hover': {
      background: changeTheme
        ? theme.palette.nft_light.hoverNFTdata
        : theme.palette.nft_dark.hoverNFTdata,
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
      try {
        await wait(1000);
        const response = await axios.get(
          `https://api.opensea.io/api/v1/assets?token_ids=${tokenId}&asset_contract_addresses=${contractAddress}`
        );
        const tempObject = {};
        console.log(
          'sathuaurl',
          `https://api.opensea.io/api/v1/assets?token_ids=${tokenId}&asset_contract_addresses=${contractAddress}`
        );
        if (response.data.assets[0].name) {
          tempObject.name = response.data.assets[0].name;
          tempObject.img = response.data.assets[0].image_url;
          setnftDetails(tempObject);
          console.log('responsecode', response);
          sessionStorage.setItem('nftCount', 0);
          sessionStorage.setItem('nftCount_left', 0);
          // count++;
        }
      } catch (err) {
        console.log('error in card', err);
      }
    };
    nftDetail();
    // console.log('countsathya', count);
  }, [contractAddress, tokenId]);

  const getTransactionValue = async (hash) => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        'https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8'
      )
    );
    const tx = await web3.eth.getTransaction(
      '0x196b3dcbe5274f843258de2f0f95dd2a92b32eb779aa4ae352dc72f5b6eecd9b'
    );
    if (tx.value > 0) {
      const valueInWei = parseInt(tx.value);
      setprice(parseFloat(web3.utils.fromWei(valueInWei.toString(), 'ether')).toFixed(3));
    }
  };

  useEffect(async () => {
    await getTransactionValue(txHash);
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
              <NFT_Price align="left">$ 2,234.23</NFT_Price>
            </div>
          ) : (
            <div />
          )}

          <Stack direction="row" alignItems="center" justifyContent="space-between" />
        </Stack>
      </Card_NFT>
      {/* <NFT_Popover open={account} onClose={hideAccountPopover}>
        <NftDetails contract={contractAddress} id={tokenId} />
      </NFT_Popover> */}
      {/* <Popup title="Disconnect" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <NftDetails
          setOpenPopup={(w) => setOpenPopup(w)}
          changeNFT={(flag_nft) => setflag_nft(flag_nft)}
          contract={temp_Address == '' ? Address_NFT : temp_Address}
          id={temp_TokenId == '' ? tokenId_NFT : temp_TokenId}
        />
      </Popup> */}
      {!isMobile ? (
        <Popup title="Disconnect" openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <NftDetails
            setOpenPopup={(w) => setOpenPopup(w)}
            changeNFT={(flag_nft) => setflag_nft(flag_nft)}
            flagNFT={(w) => setflagKill(w)}
            // contract={temp_Address == '' ? Address_NFT : temp_Address}
            // id={temp_TokenId == '' ? tokenId_NFT : temp_TokenId}
            contract={Address_NFT}
            id={tokenId_NFT}
          />
        </Popup>
      ) : (
        <PopupMobile title="Disconnect" openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <p style={{ textAlign: 'center' }}>under dev</p>
        </PopupMobile>
      )}
    </>
  );
}
