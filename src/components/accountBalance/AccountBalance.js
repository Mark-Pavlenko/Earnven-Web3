import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import actionTypes from '../../constants/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AccountBalanceValue } from './styles';

function AccountBalance({ address, accountBalance }) {
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);
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
        <AccountBalanceValue isLightTheme={themeType}>
          ${accountBalance?.finalTotal}
        </AccountBalanceValue>
      )}
    </>
  );
}

AccountBalance.propTypes = {
  address: string,
};

export default AccountBalance;
