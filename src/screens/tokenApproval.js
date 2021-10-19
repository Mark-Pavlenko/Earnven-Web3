import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import axios from 'axios';
import ERC20ABI from '../abi/ERC20.json';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TransparentButton from '../components/TransparentButton';
import AmountInput from '../components/amountInput';

export default function TokenApproval() {
  const { tokenAddress } = useParams();

  const [Addresses, setAddresses] = useState([]);
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

  useEffect(() => {
    var content = Addresses.map((object) => (
      <>
        <br />
        <Accordion
          style={{
            background: 'transparent',
            marginLeft: '40px',
            color: 'white',
            width: '90%',
            border: '1px',
            borderColor: 'white',
            borderStyle: 'solid',
            borderRadius: '10px',
          }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <br />
            {object.contractName}
            <br />
            <br />
            Approved Address &nbsp;&nbsp; &nbsp;: &nbsp; &nbsp; {object.address}
            <br />
            Approved Quantity &nbsp; &nbsp;: &nbsp; &nbsp;{' '}
            {(parseFloat(object.allowed) / 10 ** 18).toFixed(4) > 10 ** 58
              ? 'Unlimited'
              : (parseFloat(object.allowed) / 10 ** 18).toFixed(4)}{' '}
            &nbsp; ${object.symbol}
            <br />
            <br />
          </AccordionSummary>
          <AccordionDetails>
            <AmountInput
              value={object.newAllowance}
              onChange={(e) => {
                object.newAllowance = e.target.value;
              }}
            />
            &nbsp;${object.symbol}
            <br />
            <font style={{ fontSize: '10px' }}>
              {' '}
              &nbsp;&nbsp;**Set Approval <b>0</b> to revoke Approval.
            </font>
            <br />
            <TransparentButton
              value="Set new Allowance"
              onClick={async () => {
                let web3 = window.web3;
                const accounts = await web3.eth.getAccounts();
                let Token = await new web3.eth.Contract(ERC20ABI, tokenAddress);
                await Token.methods
                  .approve(object.address, (object.newAllowance * 10 ** 18).toString())
                  .send({ from: accounts[0] });
              }}
            />
          </AccordionDetails>
        </Accordion>
      </>
    ));
    setContent(content);
  }, [Addresses, tokenAddress]);

  useEffect(() => {
    async function getData() {
      await loadWeb3();
      var addresses = [];
      const web3 = window.web3;
      // const accounts = await web3.eth.getAccounts()
      let Token = await new web3.eth.Contract(ERC20ABI, tokenAddress);

      // await axios.get(`https://api.ethplorer.io/getAddressHistory/${accounts[0]}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,{},{})
      await axios
        .get(
          `https://api.ethplorer.io/getAddressHistory/0xbfbe5822a880a41c2075dc7e1d92663739cf119e?apiKey=EK-qSPda-W9rX7yJ-UY93y&limit=1000`,
          {},
          {}
        )
        .then(async (response) => {
          var ops = response.data.operations;
          var buffer = [];
          for (var i = 0; i < ops.length; i++) {
            if (ops[i].type === 'approve' && ops[i].tokenInfo.address === tokenAddress) {
              var index = buffer.indexOf(ops[i].to);
              let contractName = 0;
              if (index === -1) {
                await axios
                  .get(
                    `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${ops[i].to}&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`,
                    {},
                    {}
                  )
                  .then(async (response) => {
                    // console.log(response.data.result[0].ContractName)
                    contractName = response.data.result[0].ContractName;
                  });
                let allowance = await Token.methods
                  .allowance('0xbfbe5822a880a41c2075dc7e1d92663739cf119e', ops[i].to)
                  .call();
                var object = {
                  address: ops[i].to,
                  allowed: allowance,
                  symbol: ops[i].tokenInfo.symbol,
                  contractName: contractName,
                };
                buffer.push(ops[i].to);
                addresses.push(object);
              }
            }
          }
          console.log(addresses);
          setAddresses(addresses);
        });
    }

    getData();
  }, [tokenAddress]);

  return <div>{Content}</div>;
}
