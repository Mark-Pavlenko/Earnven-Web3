import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const Title = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'absolute',
  top: '119px',
  left: '297px',
  fontSize: '14px',
  color: 'orange',
  fontFamily: 'Saira, sans-serif',
  lineHeight: '22px',
  fontStyle: 'normal',
  fontWeight: 'normal',
}));

const Name = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  top: '80px',
  fontSize: '14px',
  color: 'orange',
  lineHeight: '22px',
  font: 'Saira',
  fontStyle: 'normal',
  fontWeight: 500,
}));

const Address = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'absolute',
  top: '200px',
  left: '260px',
  fontSize: '14px',
  lineHeight: '22px',
  font: 'Saira',
  fontStyle: 'normal',
  color: 'orange',
  opacity: 0.5,
  fontFamily: 'Saira, sans-serif',
}));

const Button_Rename = styled(Button)(({ theme }) => ({
  width: '150px',
  height: '40px',
  position: 'absolute',
  left: '250px',
  bottom: '97px',
  mixBlendMode: 'normal',
  boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  borderRadius: '10px',
  fontFamily: 'Saira, sans-serif',
  color: 'orange',
  fontSize: '14px',
  lineHeight: '22px',
  display: 'flex',
  fontStyle: 'normal',
  border: '0px',
  textAlign: 'center',
  '&:hover': {
    width: '150px',
    height: '40px',
    position: 'absolute',
    left: '250px',
    bottom: '97px',
    mixBlendMode: 'normal',
    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    fontFamily: 'Saira, sans-serif',
    // color: theme.palette.menu.account_font,
    fontSize: '14px',
    lineHeight: '22px',
    display: 'flex',
    fontStyle: 'normal',
    border: '0px',
    textAlign: 'center',
  },
}));

const Button_Rename_Disconnect = styled(Button)(({ theme }) => ({
  //background: theme.palette.menu.backgorundColor_wallet_secondary,
  width: '150px',
  height: '40px',
  position: 'absolute',
  left: '430px',
  bottom: '97px',
  mixBlendMode: 'normal',
  boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)',
  backdropFilter: 'blur(35px)',
  borderRadius: '10px',
  fontFamily: 'Saira, sans-serif',
  fontSize: '14px',
  lineHeight: '22px',
  display: 'flex',
  fontStyle: 'normal',
  overflow: 'inherit',
  //color: theme.palette.menu.account_balance,
  border: '0px',
  '&:hover': {
    // background: theme.palette.menu.backgorundColor_wallet_secondary,
    width: '150px',
    height: '40px',
    position: 'absolute',
    left: '430px',
    bottom: '97px',
    mixBlendMode: 'normal',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)',
    backdropFilter: 'blur(35px)',
    borderRadius: '10px',
    fontFamily: 'Saira, sans-serif',
    // color: theme.palette.menu.account_balance,
    fontSize: '14px',
    lineHeight: '22px',
    display: 'flex',
    fontStyle: 'normal',
    overflow: 'inherit',
  },
}));

export const Disconnection_Mywallet = ({ address, name, setOpenPopup }) => {
  const navigate = useNavigate();
  const [flag, setflag] = useState(false);

  const disconnect = (address) => {
    let result = localStorage.getItem('mywallet');
    result = JSON.parse(result);
    let flag_variable = false;
    let wallets = localStorage.getItem('wallets');
    wallets = JSON.parse(wallets);
    // let selected_address = '';
    let selected_name = 'null';
    let selected_address = localStorage.getItem('selected-account');
    let mywallet = localStorage.getItem('mywallet');
    mywallet = JSON.parse(mywallet);
    if (selected_address == address) {
      setflag(true);
      flag_variable = true;
      mywallet.map((option) => {
        selected_address = option.address;
        selected_name = option.name;
        // localStorage.setItem('selected-account', selected_name);
      });
    }
    // wallets.map((option) => {
    //   selected_address = option.address;
    //   selected_name = option.name;
    // });
    localStorage.setItem('selected-account', selected_address);
    let output = result.filter((option) => {
      return option.address !== address;
    });
    let output_wallets = wallets.filter((option) => {
      return option.address !== address;
    });
    if (output.length > 0) {
      localStorage.setItem('mywallet', JSON.stringify(output));
    } else {
      localStorage.removeItem('mywallet');
      localStorage.setItem('selected-name', 'null');
      localStorage.setItem('selected-address', 'null');
    }
    localStorage.setItem('wallets', JSON.stringify(output_wallets));
    flag_variable == true
      ? navigate(`/app/connect-wallet`, { replace: true })
      : navigate(`/${address}${localStorage.getItem('setnavigation')}/`, { replace: true });
  };
  return (
    <div>
      <Title style={{ flexGrow: 1 }}>Are you sure you want to disconnect ?</Title>
      <Name style={{ flexGrow: 1 }}>{name == 'null' ? '' : name}</Name>
      <Address style={{ flexGrow: 1 }}>{address}</Address>
      <Button_Rename onClick={() => setOpenPopup(false)}>
        <p> Cancel </p>
      </Button_Rename>
      <Button_Rename_Disconnect
        onClick={() => {
          disconnect(address);
          setOpenPopup(false);
        }}>
        <p> Disconnect </p>
      </Button_Rename_Disconnect>
    </div>
  );
};
