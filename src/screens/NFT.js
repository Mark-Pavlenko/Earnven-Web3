import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NftGroup from '../components/Nft/NftGroup';
import Page from '../components/Page';
import NftNetworth from '../components/Nft/NftNetworth';
import NoNft from '../components/Nft/NoNft';

export default function NFT({ changeTheme, nftDataFlag }) {
  const { address } = useParams();
  const [Account, setAccount] = useState('0x0');
  const [data, setdata] = useState(null);
  const [flag_data, setflag_data] = useState([]);
  const [flag_theme, setflagtheme] = useState('');
  const [nftData, setnftData] = useState([]);
  const [halfNFTdata, sethalfNFTdata] = useState([]);
  const [ethUSDPrice, setethUSDPrice] = useState(0);
  const [netWorth, setnetWorth] = useState(0);

  let flag = '';

  useEffect(() => {
    setnetWorth(netWorth);
  }, [netWorth]);

  useEffect(() => {
    async function getData() {
      const account = address;
      setAccount(account);
      console.log(Account);
      await axios
        .get(
          `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${account}&startblock=0&endblock=999999999&sort=asc&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`,
          {},
          {}
        )
        .then(async (response) => {
          const b = {};
          const res = response.data.result;
          setflag_data(res);
          for (const i in res) {
            if (b[res[i].tokenName] === undefined) {
              b[res[i].tokenName] = {};
              b[res[i].tokenName].tokens = [];
              b[res[i].tokenName].txHash = [];
              if (res[i].from.toLowerCase() === account.toLowerCase()) {
                b[res[i].tokenName].qtty = -1;
              } else {
                b[res[i].tokenName].qtty = 1;
                b[res[i].tokenName].tokens.push(res[i].tokenID);
                b[res[i].tokenName].txHash.push(res[i].hash);
              }
              b[res[i].tokenName].name = res[i].tokenName;
              b[res[i].tokenName].address = res[i].contractAddress;
            } else if (res[i].from.toLowerCase() === account.toLowerCase()) {
              b[res[i].tokenName].qtty -= 1;
              const index = b[res[i].tokenName].tokens.indexOf(res[i].tokenID);
              if (index > -1) {
                b[res[i].tokenName].tokens.splice(index, 1);
                b[res[i].tokenName].txHash.splice(index, 1);
              }
            } else {
              b[res[i].tokenName].qtty += 1;
              b[res[i].tokenName].tokens.push(res[i].tokenID);
              b[res[i].tokenName].txHash.push(res[i].hash);
            }
          }
          let count_flag = 0;
          const temp = Object.values(b);
          let NFTData = [];
          for (var i = 0; i < temp.length; i++) {
            if (temp[i].tokens.length > 1) {
              for (var j = 0; j < temp[i].tokens.length; j++) {
                count_flag = count_flag + 1;
                let newData = {
                  token: temp[i].tokens[j],
                  name: temp[i].name,
                  address: temp[i].address,
                  txHash: temp[i].txHash,
                  count_flag: count_flag,
                };
                NFTData.push(newData);
              }
            } else {
              count_flag = count_flag + 1;
              let newData = {
                token: temp[i].tokens[0],
                name: temp[i].name,
                address: temp[i].address,
                txHash: temp[i].txHash,
                count_flag: count_flag,
              };
              NFTData.push(newData);
            }
          }
          setnftData(NFTData);
          let lFtdata = JSON.stringify(NFTData);
          localStorage.setItem('nftdata', lFtdata);
          const finalObject = [];
          for (const i in temp) {
            if (temp[i].tokens.length > 0) {
              finalObject.push(temp[i]);
            }
          }
          setdata(finalObject);
        });
    }

    async function getUSDPrice() {
      try {
        const response = await axios.get(
          `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR`
        );
        setethUSDPrice(response.data.USD);
      } catch (err) {
        console.log('error in usd price', err);
      }
    }
    getData();
    getUSDPrice();
  }, [Account, address]);

  return (
    <>
      {nftData.length == 0 ? (
        <p>
          {' '}
          <NftNetworth
            ethUSDPrice={ethUSDPrice}
            Account={Account}
            address={address}
            netWorth={netWorth}
            changeTheme={changeTheme}
            NFTDATA={nftData}
          />
        </p>
      ) : (
        <div>
          <NftNetworth
            ethUSDPrice={ethUSDPrice}
            Account={Account}
            address={address}
            netWorth={netWorth}
            changeTheme={changeTheme}
            NFTDATA={nftData}
          />
        </div>
      )}
      {flag_data.length == 0 ? (
        <NoNft changeTheme={changeTheme} />
      ) : (
        <div>
          <div>
            {data === null ? (
              <div>
                <p>Loading</p>
              </div>
            ) : (
              <NftGroup
                changeTheme={changeTheme}
                nftData={data}
                NFTDATA={nftData}
                ethUSDPrice={ethUSDPrice}
                propnetWorth2={(w) => setnetWorth(w)}
                // nftDataFlag={nftDataFlag}
              />
            )}
          </div>
        </div>
      )}
    </>
  );

  /*  return (
         <Page title="Nft">
             <Container>
                 {data === null ? <div>Loading</div> : <NftList nftData={data} />}
             </Container>
         </Page>
     ); */
}
