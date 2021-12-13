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

const NftImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const Image_Grid = styled(Box)(({ theme }) => ({
  borderRadius: '10px',
  ['@media (max-width:400px)']: {
    // eslint-disable-line no-useless-computed-key
    margin: 'auto',
    marginTop: '10px',
    textAlign: 'center',
  },
}));

const NFT_Name = styled(Typography)(({ theme }) => ({
  fontWeight: '800',
  fontSize: '20px',
  lineHeight: '31px',
  marginTop: '16px',
}));

const NFT_Price = styled(Typography)(({ theme }) => ({
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '22px',
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
  let temp_Address = '';
  let temp_TokenId = '';
  const showAccountPopover = () => {
    setaccount(true);
  };
  const hideAccountPopover = () => {
    setaccount(false);
  };

  const Card_NFT = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    '&:hover': {
      background: changeTheme
        ? theme.palette.nft_light.hoverNFTdata
        : theme.palette.nft_dark.hoverNFTdata,
      backdropFilter: 'blur(30px)',
      // border: (theme) => `solid 1px ${theme.palette.grey[500_8]}`,
      mixBlendMode: 'normal',
      boxShadow: '7px 21px 22px -15px rgba(51, 78, 131, 0.1)',
    },
    borderRadius: '10px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '15px',
  }));

  useEffect(() => {
    const nftDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.opensea.io/api/v1/assets?token_ids=${tokenId}&asset_contract_addresses=${contractAddress}`
        );
        const tempObject = {};
        tempObject.name = response.data.assets[0].name;
        tempObject.img = response.data.assets[0].image_url;
        setnftDetails(tempObject);
        sessionStorage.setItem('nftCount', 0);
        sessionStorage.setItem('nftCount_left', 0);
      } catch {
        // do smth.
      }
    };
    nftDetail();
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
    // for (let i = 0; i < parsed_nftdata.length; i++) {
    //   if (contractAddress == parsed_nftdata[i].address) {
    //     contractAddress_nft = parsed_nftdata[i + 1].address;
    //     name = parsed_nftdata[i + 1].name;
    //   }
    // }
    // let count_tokenId = 0;
    // if (flag_nft !== '' && flag_nft == 'plus') {
    //   let count = 0;
    //   let count_flag = 3;
    //   let session_count = 0;
    //   session_count = sessionStorage.getItem('nftCount');
    //   session_count = parseInt(session_count) + 1;
    //   sessionStorage.setItem('nftCount', session_count);
    //   parsed_nftdata.map((obj) => {
    //     count++;
    //     if (obj.address == contractAddress) {
    //       count_flag = session_count;
    //     }
    //   });
    //   console.log('sathya map countflag ', count_flag);
    //   if (count_flag > -1 && count_flag < parsed_nftdata.length) {
    //     contractAddress_nft = parsed_nftdata[count_flag].address;
    //     name = parsed_nftdata[count_flag].name;
    //     count_tokenId = parsed_nftdata[count_flag].token;
    //     // console.log('token is sathya', parsed_nftdata[count_flag].tokens[0]);
    //   }
    //   console.log(
    //     'sathyacontractaddress and name and id',
    //     contractAddress_nft,
    //     name,
    //     count_tokenId
    //   );
    //   setAddress_NFT(contractAddress_nft);
    //   settokenId_NFT(count_tokenId);
    // }
    // if (flag_nft !== '' && flag_nft == 'minus') {
    //   let count = 0;
    //   let count_flag = 3;
    //   let session_count = 0;
    //   session_count = sessionStorage.getItem('nftCount');
    //   session_count = parseInt(session_count) - 1;
    //   sessionStorage.setItem('nftCount', session_count);
    //   parsed_nftdata.map((obj) => {
    //     count++;
    //     if (obj.address == contractAddress) {
    //       count_flag = session_count;
    //     }
    //   });
    //   console.log('sathya map countflag ', count_flag);
    //   if (count_flag > -1 && count_flag < parsed_nftdata.length) {
    //     contractAddress_nft = parsed_nftdata[count_flag].address;
    //     name = parsed_nftdata[count_flag].name;
    //     count_tokenId = parsed_nftdata[count_flag].tokens[0];
    //     console.log('token is sathya', parsed_nftdata[count_flag].tokens[0]);
    //   }
    //   console.log(
    //     'sathyacontractaddress and name and id',
    //     contractAddress_nft,
    //     name,
    //     count_tokenId
    //   );
    //   setAddress_NFT(contractAddress_nft);
    //   settokenId_NFT(count_tokenId);
    // }
    //////////////////////////////////////// to be used later
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
        <Image_Grid sx={{ pt: '100%', position: 'relative' }}>
          {nftDetails !== undefined ? (
            <NftImgStyle alt=" " style={{ borderRadius: '10px' }} src={nftDetails.img} />
          ) : (
            <NftImgStyle alt=" " src={spinner} />
          )}
        </Image_Grid>

        <Stack spacing={0.5}>
          {/* <Link to="#" color="inherit" underline="hover" component={RouterLink}> */}
          <NFT_Name noWrap>{nftDetails !== undefined ? nftDetails.name : 'loading'}</NFT_Name>
          {price == 0 ? <NFT_Price align="left">$ 2,234.23</NFT_Price> : <div />}

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
    </>
  );
}
