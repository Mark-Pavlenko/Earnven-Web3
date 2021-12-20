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
  const [halfNFTdata, sethalfNFTdata] = useState([]);
  let flag = '';
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
          // console.log("final data:::", Object.values(b).filter((object) => object.tokens.length > 0))
          // setdata(Object.values(b).filter((object) => object.tokens.length > 0));

          const temp = Object.values(b);
          console.log('value of all nfts', temp);
          let NFTData = [];
          for (var i = 0; i < temp.length; i++) {
            if (temp[i].tokens.length > 1) {
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
          }
          setnftData(NFTData);
          // let halfdata = [];
          // for (var k = 0; k < NFTData.length / 2; k++) {
          //   let newData = {
          //     token: temp[k].token,
          //     name: temp[k].name,
          //     address: temp[k].address,
          //   };
          //   halfdata.push(newData);
          // }
          // sethalfNFTdata(halfdata);
          // console.log('half data', halfNFTdata);
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

    getData();
  }, [Account, address]);
  const [currentTheme, setCurrentTheme] = React.useState('');
  React.useEffect(() => {
    window.addEventListener('storage', () => {
      const theme = localStorage.getItem('selectedTheme');
      setCurrentTheme(theme);
    });
  }, []);

  return (
    <>
      <div>
        <NftNetworth changeTheme={changeTheme} />
      </div>
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
              <NftGroup changeTheme={changeTheme} nftData={data} NFTDATA={nftData} />
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
