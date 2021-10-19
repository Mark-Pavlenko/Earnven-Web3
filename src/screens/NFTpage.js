import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NFTPageTokenIDs from '../components/NFTPageTokenIDs';
import { useParams } from 'react-router-dom';

var contents = '';
var arr1 = [];

function NFTpage() {
  const { address } = useParams();
  const [Account, setAccount] = useState('0x0');
  const [Content, setContent] = useState('');

  var change = (arr) => {
    console.log('result which is showing:::', arr);
    contents = arr.map((object, index) => (
      <Accordion
        key={index}
        style={{
          background: 'transparent',
          marginBottom: '5px',
          width: '90%',
          border: '1px',
          borderColor: 'white',
          borderStyle: 'solid',
          borderRadius: '10px',
        }}>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon style={{fill:'white'}}/>}
          expandIcon={
            object.image ? (
              <img
                src={object.image}
                alt=""
                style={{
                  height: '60px',
                  border: '3px',
                  borderColor: 'white',
                  borderStyle: 'solid',
                  borderRadius: '50px',
                }}
              />
            ) : (
              <ExpandMoreIcon />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ height: '100px' }}>
          <font color="white">{object.name}</font>
        </AccordionSummary>
        <AccordionDetails
          style={{ backgroundColor: 'transparent', paddingBottom: '30px', textAlign: 'left' }}>
          <NFTPageTokenIDs contractAddress={object.address} tokenIDs={object.tokens} />
        </AccordionDetails>
      </Accordion>
    ));
    // console.log(contents)
  };

  useEffect(() => {
    /* async function loadWeb3() {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                await window.ethereum.enable()
            }
            else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider)
            }
            else {
                window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
            }
        } */

    async function getData() {
      // const web3 = window.web3;
      // const accounts = await web3.eth.getAccounts();
      // var account = accounts[0]
      // var account = '0x6975be450864c02b4613023c2152ee0743572325';
      // var account = '0x48E8479b4906D45fBE702A18ac2454F800238b37'
      // var account = '0xbfbe5822a880a41c2075dc7e1d92663739cf119e';
      // setAccount(accounts[0])
      var account = address;
      setAccount(account);
      console.log(Account);

      // axios.get(`https://api.etherscan.io/api?module=account&action=tokennfttx&address=0x6975be450864c02b4613023c2152ee0743572325&startblock=0&endblock=999999999&sort=asc&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`,{},{})
      await axios
        .get(
          `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${account}&startblock=0&endblock=999999999&sort=asc&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`,
          {},
          {}
        )
        .then(async (response) => {
          var b = {};
          var res = response.data.result;
          console.log(res);
          for (let i in res) {
            if (b[res[i].tokenName] === undefined) {
              b[res[i].tokenName] = {};
              b[res[i].tokenName]['tokens'] = [];
              if (res[i].from.toLowerCase() === account.toLowerCase()) {
                b[res[i].tokenName]['qtty'] = -1;
              } else {
                b[res[i].tokenName]['qtty'] = 1;
                b[res[i].tokenName]['tokens'].push(res[i].tokenID);
              }
              await axios
                .get(
                  `https://api.opensea.io/api/v1/assets?token_ids=${res[i].tokenID}&asset_contract_addresses=${res[i].contractAddress}`,
                  {},
                  {}
                )
                .then(async (response) => {
                  if (response.data.assets[0]) {
                    b[res[i].tokenName]['image'] = response.data.assets[0].image_url;
                  } else {
                    b[res[i].tokenName]['image'] = undefined;
                  }
                });
              b[res[i].tokenName]['name'] = res[i].tokenName;
              b[res[i].tokenName]['address'] = res[i].contractAddress;
            } else {
              if (res[i].from.toLowerCase() === account.toLowerCase()) {
                b[res[i].tokenName]['qtty'] -= 1;
                var index = b[res[i].tokenName]['tokens'].indexOf(res[i].tokenID);
                if (index > -1) {
                  b[res[i].tokenName]['tokens'].splice(index, 1);
                }
              } else {
                b[res[i].tokenName]['qtty'] += 1;
                b[res[i].tokenName]['tokens'].push(res[i].tokenID);
              }
            }
          }

          arr1 = Object.values(b);
          console.log(arr1);
          change(arr1);
          setContent(contents);
        });
    }

    // loadWeb3();
    getData();

    // console.log(arr1)
    // change([''])
  }, [Account, address]);

  if (Content === '') {
    return (
      <>
        <center>
          <br />
          <h1 style={{ color: 'white', fontSize: '50px' }}>My NFTs</h1> <br />
          <br />
          <h3 style={{ color: 'white', fontSize: '20px' }}>Loading...</h3> <br />
          <br />
        </center>
      </>
    );
  } else {
    return (
      <>
        <center>
          <br />
          <h1 style={{ color: 'white', fontSize: '50px' }}>My NFTs</h1> <br />
          <br />
          {Content}
        </center>
      </>
    );
  }
}

export default NFTpage;
