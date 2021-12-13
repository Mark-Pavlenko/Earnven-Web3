import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import { Typography } from '@material-ui/core';
import { string } from 'prop-types';
import actionTypes from '../../constants/actionTypes';
import { CommaFormatted } from '../../modules/common/commaFormatter';
import { useDispatch, useSelector } from 'react-redux';

function AccountBalance({ address, accountBalance }) {
  console.log('accountBalance', accountBalance);
  const dispatch = useDispatch();
  const [totalValue, setTotalValue] = useState('00.00');

  const isLoading = useSelector((state) => state.accountBalance.isLoading);
  console.log('isLoading', isLoading);

  useEffect(() => {
    let total = 0;
    const web3 = new Web3();
    const accountAddress = address;
    // console.log('account address', accountAddress);
    const totalAccountValue = async () => {
      try {
        dispatch({ type: actionTypes.SET_ACCOUNT_ADDRESS, payload: accountAddress });
        // console.log(accountBalance.total);

        // implement totalValue send immediaately from redux (with the help of web3-react)

        // const path = `https://api.ethplorer.io/getAddressInfo/${accountAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`;
        // const response = await axios.get(path);
        // const { tokens } = response.data;
        // console.log('response.data', response.data);

        // total =
        //   response.data.ETH.price.rate * web3.utils.fromWei(response.data.ETH.rawBalance, 'ether');
        // if (tokens !== undefined) {
        //   for (let i = 0; i < tokens.length; i++) {
        //     if (tokens[i].tokenInfo.price !== false) {
        //       total +=
        //         tokens[i].tokenInfo.price.rate * web3.utils.fromWei(tokens[i].rawBalance, 'ether');
        //     }
        //   }
        // }
        // setTotalValue(CommaFormatted(total.toFixed(2)));
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
      {isLoading ? (
        <div style={{ color: 'red' }}>loading</div>
      ) : (
        <Typography
          sx={{ color: (theme) => theme.palette.menu.account_balance }}
          variant="primaryFont1">
          ${accountBalance?.finalTotal}
        </Typography>
      )}
    </>
  );
}

AccountBalance.propTypes = {
  address: string,
};

export default AccountBalance;
