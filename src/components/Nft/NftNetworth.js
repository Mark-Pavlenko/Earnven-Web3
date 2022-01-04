import React, { useEffect, useState } from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Typography, Stack } from '@material-ui/core';
import Web3 from 'web3';
// import { Stack } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
const NftNetworth = ({ changeTheme, NFTDATA, Account, address, ethUSDPrice }) => {
  const [netWorth, setnetWorth] = useState(0);
  const { activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();

  const NetWorth = styled('div')(({ theme }) => ({
    background: !changeTheme
      ? theme.palette.nft_dark.noNFT_background
      : theme.palette.nft_light.noNFT_background,
    mixBlendMode: 'normal',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.16)',
    backdropFilter: 'blur(35px)',
    borderRadius: '10px',
    minWidth: '302px',
    height: '88px',
    marginTop: '10px',
    ['@media (max-width:600px)']: {
      // eslint-disable-line no-useless-computed-key
      margin: 'auto',
      marginTop: '10px',
      textAlign: 'center',
      minWidth: '345px',
      height: '90px',
    },
    ['@media (min-width:600px)']: {
      // eslint-disable-line no-useless-computed-key
      marginLeft: '22px',
    },
  }));

  const AccountNetWorth = styled(Typography)(({ theme }) => ({
    color: changeTheme
      ? theme.palette.nft_light.NFT_popup_name
      : theme.palette.nft_dark.NFT_bodyFont,
    marginLeft: '20px',
    fontSize: '40px',
    fontWeight: 600,
    ['@media (max-width:600px)']: {
      // eslint-disable-line no-useless-computed-key
      fontSize: '26px',
      fontWeight: 600,
      margin: 'auto',
      marginTop: '17px',
      marginLeft: 'auto',
      textAlign: 'center',
    },
  }));
  let sum = 0;

  const NetWorthText = styled(Typography)(({ theme }) => ({
    marginLeft: '22px',
    lineHeight: '16px',
    opacity: changeTheme ? 0.5 : 0.8,
    color: changeTheme ? theme.palette.nft_light.NFT_bodyFont : theme.palette.nft_dark.NFT_bodyFont,
    marginTop: '-4px',
    ['@media (max-width:600px)']: {
      // eslint-disable-line no-useless-computed-key
      margin: 'auto',
      textAlign: 'center',
    },
  }));

  async function getWeb3() {
    const provider = await connector.getProvider(
      'https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8'
    );
    const web3 = await new Web3(provider);
    return web3;
  }

  const getTransactionValue = async (hash) => {
    console.log('hash', hash);
    const web3 = await getWeb3();
    var tx = '';
    try {
      // tx = await web3.eth.getTransaction(hash);
      tx = await web3.eth.getTransaction(hash);
      console.log('tx', tx);
    } catch (err) {
      console.log('eerr', err);
    }
    let usdPrice = 1;
    if (tx !== '') {
      if (tx.value > 0) {
        const valueInWei = parseInt(tx.value);
        sum = parseFloat(sum);
        let floatPrice = parseFloat(parseFloat((valueInWei / 10 ** 18) * ethUSDPrice).toFixed(2));
        sum = sum + floatPrice;
        localStorage.setItem('netWorth', sum);
        setnetWorth(sum);
      }
    }
  };

  useEffect(() => {
    console.log('NFTDATA', NFTDATA);
    NFTDATA.map((over) => {
      getTransactionValue(over.txHash[0]);
    });
  }, [NFTDATA]);

  return (
    <div style={{ display: 'flex' }}>
      <NetWorth>
        <Stack direction="column">
          <AccountNetWorth>$ {parseFloat(netWorth.toFixed(3))}</AccountNetWorth>
          <NetWorthText variant="NFT_networth_text">Net Worth</NetWorthText>
        </Stack>
      </NetWorth>
    </div>
  );
};

export default NftNetworth;
