import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import actionTypes from '../../constants/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AccountBalanceValue, AccountBalanceValueTablet } from './styles';

function AccountBalance({ address, accountBalance }) {
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);
  const isLoading = useSelector((state) => state.accountBalance.isLoading);
  const dispatch = useDispatch();
  const [totalValue, setTotalValue] = useState('00.00');

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

  // console.log('accountBalance', accountBalance);

  return (
    <>
      {isLoading ? (
        <div style={{ color: 'red' }}>loading</div>
      ) : (
        <>
          <AccountBalanceValue isLightTheme={themeType}>
            ${accountBalance?.finalTotal}
          </AccountBalanceValue>
          <AccountBalanceValueTablet isLightTheme={themeType}>
            ${accountBalance?.finalTotal?.substring(0, 3)}...
          </AccountBalanceValueTablet>
        </>
      )}
    </>
  );
}

AccountBalance.propTypes = {
  address: string,
};

export default AccountBalance;
