import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NftGroup from '../components/Nft/NftGroup';
import Page from '../components/Page';
import NftNetworth from '../components/Nft/NftNetworth';
import NoNft from '../components/Nft/NoNft';

export default function NFT({ changeTheme }) {
  const { address } = useParams();
  const [Account, setAccount] = useState('0x0');
  const [data, setdata] = useState(null);
  const [flag_data, setflag_data] = useState([]);
  const [flag_theme, setflagtheme] = useState('');
  const [nftData, setnftData] = useState([]);
  let flag = '';
  useEffect(() => {
    async function getData() {
      console.log('sathya in render top');
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
          console.log('sathya inside nft res', flag_data);
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
          // console.log("final data:::", Object.values(b).filter((object) => object.tokens.length > 0))
          // setdata(Object.values(b).filter((object) => object.tokens.length > 0));

          const temp = Object.values(b);
          console.log('value of all nfts', temp);
          let NFTData = [];
          for (var i = 0; i < temp.length; i++) {
            if (temp[i].tokens.length > 1) {
              console.log('sathya in number of tokens');
              for (var j = 0; j < temp[i].tokens.length; j++) {
                let newData = {
                  token: temp[i].tokens[j],
                  name: temp[i].name,
                  address: temp[i].address,
                };
                NFTData.push(newData);
              }
            } else {
              let newData = {
                token: temp[i].tokens[0],
                name: temp[i].name,
                address: temp[i].address,
              };
              NFTData.push(newData);
            }
            console.log('sathyain NFTdata', NFTData);
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
          console.log('sathya inside nft data 2', data);
        });
    }

    getData();
  }, [Account, address]);
  const [currentTheme, setCurrentTheme] = React.useState('');
  React.useEffect(() => {
    console.log('sathya in render');
    window.addEventListener('storage', () => {
      const theme = localStorage.getItem('selectedTheme');
      console.log('sathyatheme', theme);
      setCurrentTheme(theme);
    });
  }, []);

  useEffect(() => {
    console.log('sathya selected theme in useeffect test', changeTheme);
  }, [changeTheme]);
  return (
    <>
      <NftNetworth changeTheme={changeTheme} />
      {flag_data.length == 0 ? (
        <NoNft changeTheme={changeTheme} />
      ) : (
        <Page>
          <Container sx={{ marginLeft: '-0.6rem' }}>
            {data === null ? (
              <div>
                <p>Loading</p>
              </div>
            ) : (
              <NftGroup
                style={{ width: '100%' }}
                changeTheme={changeTheme}
                nftData={data}
                NFTDATA={nftData}
              />
            )}
          </Container>
        </Page>
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
