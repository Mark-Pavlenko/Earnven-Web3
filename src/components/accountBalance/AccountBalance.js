import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import { Typography } from '@material-ui/core';
import { string } from 'prop-types';
import actionTypes from '../../constants/actionTypes';
import { CommaFormatted } from '../../modules/common/commaFormatter';
import { useDispatch, useSelector } from 'react-redux';

function AccountBalance({ address, accountBalance }) {
  // console.log('accountBalance', accountBalance);
  const dispatch = useDispatch();
  const [totalValue, setTotalValue] = useState('00.00');

  const isLoading = useSelector((state) => state.accountBalance.isLoading);
  // console.log('isLoading', isLoading);

  useEffect(() => {
    const accountAddress = address;
    // console.log('account address', accountAddress);
    const totalAccountValue = async () => {
      try {
        dispatch({ type: actionTypes.SET_ACCOUNT_ADDRESS, payload: accountAddress });
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
        <Typography sx={{ color: (theme) => 'red' }} variant="primaryFont1">
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
