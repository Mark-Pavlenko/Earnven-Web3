import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button_Cancel, Button_Success_Action, ButtonsLayout, CutAddressName } from './styles';
import { DisconnectWarnLabel, Address, Button_Rename, Button_Rename_Disconnect } from './styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const DisconnectPopup = ({ address, name, setOpenPopup, isLightTheme }) => {
  const navigate = useNavigate();
  const mobilePopoverSize = useMediaQuery('(max-width:850px)');

  const disconnect = (address) => {
    let result = localStorage.getItem('wallets');
    result = JSON.parse(result);
    let flag_variable = false;
    let selected = localStorage.getItem('selected-account');
    let selected_name = localStorage.getItem('selected-name');
    let mywallet = localStorage.getItem('mywallet');
    mywallet = JSON.parse(mywallet);
    if (selected === address) {
      flag_variable = true;
      mywallet &&
        mywallet.map((option) => {
          selected = option.address;
          selected_name = option.name;
        });
    }
    localStorage.setItem('selected-account', selected);
    localStorage.setItem('selected-name', selected_name);
    let output = result.filter((option) => {
      return option.address !== address;
    });
    if (output.length > 0) {
      localStorage.setItem('wallets', JSON.stringify(output));
    } else {
      localStorage.removeItem('mywallet');
      localStorage.setItem('selected-name', 'null');
      localStorage.setItem('selected-address', 'null');
    }
    localStorage.setItem('wallets', JSON.stringify(output));
    flag_variable === true
      ? navigate(`/app/connect-wallet`, { replace: true })
      : navigate(`/${address}${localStorage.getItem('setnavigation')}/`, { replace: true });
  };

  return (
    <div>
      <DisconnectWarnLabel isLightTheme={isLightTheme}>
        Are you sure you want to disconnect?
      </DisconnectWarnLabel>

      <CutAddressName isLightTheme={isLightTheme}>{name === 'null' ? '' : name}</CutAddressName>

      <Address style={{ flexGrow: 1 }} isLightTheme={isLightTheme}>
        {address}
      </Address>

      {mobilePopoverSize ? (
        <ButtonsLayout>
          <Button_Success_Action
            isLightTheme={isLightTheme}
            onClick={() => {
              disconnect(address);
              setOpenPopup(false);
            }}>
            <p> Disconnect </p>
          </Button_Success_Action>

          <Button_Cancel onClick={() => setOpenPopup(false)} isLightTheme={isLightTheme}>
            <p> Cancel </p>
          </Button_Cancel>
        </ButtonsLayout>
      ) : (
        <ButtonsLayout>
          <Button_Cancel onClick={() => setOpenPopup(false)} isLightTheme={isLightTheme}>
            <p> Cancel </p>
          </Button_Cancel>
          <Button_Success_Action
            isLightTheme={isLightTheme}
            onClick={() => {
              disconnect(address);
              setOpenPopup(false);
            }}>
            <p> Disconnect </p>
          </Button_Success_Action>
        </ButtonsLayout>
      )}
    </div>
  );
};
