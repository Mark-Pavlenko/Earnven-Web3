import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import { Typography } from '@material-ui/core';
import { string } from 'prop-types';
import actionTypes from '../../constants/actionTypes';

import dispatch, { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function AccountBalance({ address, tokens }) {
  console.log('tokens', tokens);
  const dispatch = useDispatch();
  const [totalValue, settotalValue] = useState('00.00');

  function CommaFormatted(amount) {
    const delimiter = ','; // replace comma if desired
    const ab = amount.split('.', 2);
    const d = ab[1];
    let i = parseInt(ab[0]);
    if (isNaN(i)) {
      return '';
    }
    let minus = '';
    if (i < 0) {
      minus = '-';
    }
    i = Math.abs(i);
    let n = i.toString();
    const a = [];
    while (n.length > 3) {
      const nn = n.substr(n.length - 3);
      a.unshift(nn);
      n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) {
      a.unshift(n);
    }
    n = a.join(delimiter);
    if (d.length < 1) {
      amount = n;
    } else {
      amount = `${n}.${d}`;
    }
    amount = minus + amount;
    return amount;
  }

  useEffect(() => {
    let total = 0;
    const web3 = new Web3();
    const accountAddress = address;
    console.log('account address', accountAddress);
    const totalAccountValue = async () => {
      try {
        dispatch({ type: actionTypes.SET_ACCOUNT_ADDRESS, payload: accountAddress });

        const path = `https://api.ethplorer.io/getAddressInfo/${accountAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`;
        const response = await axios.get(path);
        const { tokens } = response.data;
        console.log('response.data', response.data);

        total =
          response.data.ETH.price.rate * web3.utils.fromWei(response.data.ETH.rawBalance, 'ether');
        if (tokens !== undefined) {
          for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].tokenInfo.price !== false) {
              total +=
                tokens[i].tokenInfo.price.rate * web3.utils.fromWei(tokens[i].rawBalance, 'ether');
            }
          }
        }
        settotalValue(CommaFormatted(total.toFixed(2)));
      } catch (error) {
        console.log(error);
      }
    };
    totalAccountValue();
  }, [totalValue, address]);

  // const tokens = useSelector((state) => state);
  // console.log('account balance token data', tokens);

  return (
    <>
      <div id="hleb">dsfsfdscvsdcefdscds</div>
      <Typography
        sx={{ color: (theme) => theme.palette.menu.account_balance }}
        variant="primaryFont1">
        ${totalValue}
      </Typography>
    </>
  );
}

AccountBalance.propTypes = {
  address: string,
};

export default AccountBalance;
