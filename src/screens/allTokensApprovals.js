import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import { Link } from 'react-router-dom';

export default function AllTokensApprovals() {
  const [Tokens, setTokens] = useState([]);
  const [Content, setContent] = useState('');

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  function mouseOver(e) {
    e.target.style.borderColor = '#BB86FC';
  }

  function mouseOut(e) {
    e.target.style.borderColor = 'white';
  }

  useEffect(() => {
    const content = Tokens.map((object) => (
      <>
        <Link to={{ pathname: `/app/approvals/${object.address}` }}>
          <div
            onMouseOver={(e) => {
              mouseOver(e);
            }}
            pointer
            onMouseOut={(e) => {
              mouseOut(e);
            }}
            style={{
              width: '40%',
              height: '75px',
              marginLeft: '20px',
              display: 'inline-block',
              textAlign: 'center',
              marginTop: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              borderRadius: '10px',
              border: '1px',
              borderStyle: 'solid',
              borderColor: 'white',
            }}>
            <br />
            {object.name}
          </div>
        </Link>
      </>
    ));
    setContent(content);
  }, [Tokens]);

  useEffect(() => {
    async function getData() {
      await loadWeb3();
      const tokens = [];
      // const web3 = window.web3;
      // const accounts = await web3.eth.getAccounts()

      // await axios.get(`https://api.ethplorer.io/getAddressHistory/${accounts[0]}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,{},{})
      await axios
        .get(
          `https://api.ethplorer.io/getAddressHistory/0xbfbe5822a880a41c2075dc7e1d92663739cf119e?apiKey=EK-qSPda-W9rX7yJ-UY93y&limit=1000`,
          {},
          {}
        )
        .then(async (response) => {
          const ops = response.data.operations;
          // var balance = {}
          console.log(ops);
          const buffer = [];
          for (let i = 0; i < ops.length; i++) {
            if (ops[i].type === 'approve') {
              const index = buffer.indexOf(ops[i].tokenInfo.address);
              if (index === -1) {
                const object = { name: ops[i].tokenInfo.name, address: ops[i].tokenInfo.address };
                buffer.push(ops[i].tokenInfo.address);
                tokens.push(object);
              }
            }
          }
          console.log(buffer);
          setTokens(tokens);
        });
    }
    getData();
  }, []);

  return (
    <div>
      <center>
        <h1 style={{ color: 'white', fontSize: '40px' }}>All Token Approvals</h1>
        <br />
        <br />
        {Content}
      </center>
    </div>
  );
}
