import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const Input_Rename = styled('input')(({ theme }) => ({
  textAlign: 'left',
  position: 'absolute',
  top: '153px',
  left: '178px',
  fontSize: '14px',
  lineHeight: '22px',
  fontStyle: 'normal',
  paddingLeft: '1rem',
  //color: theme.palette.menu.account_font,
  fontFamily: 'Saira, sans-serif',
  height: '60px',
  width: '475px',
  borderRadius: '10px',
  border: '0px',
  boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)',
  // background: theme.palette.menu.backgorundColor_wallet_secondary,
}));

const Address = styled('div')(({ theme }) => ({
  textAlign: 'left',
  position: 'absolute',
  top: '122px',
  left: '178px',
  fontSize: '12px',
  lineHeight: '19px',
  fontStyle: 'normal',
  //color: theme.palette.menu.account_font,
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
  //color: theme.palette.menu.account_font,
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
  // background: theme.palette.menu.backgorundColor_wallet_secondary,
  width: '150px',
  height: '40px',
  position: 'absolute',
  left: '430px',
  bottom: '97px',
  mixBlendMode: 'normal',
  boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)',
  borderRadius: '10px',
  fontFamily: 'Saira, sans-serif',
  fontSize: '14px',
  lineHeight: '22px',
  display: 'flex',
  fontStyle: 'normal',
  overflow: 'inherit',
  border: '0px',
  '&:hover': {
    //background: theme.palette.menu.backgorundColor_wallet_secondary,
    width: '150px',
    height: '40px',
    position: 'absolute',
    left: '430px',
    bottom: '97px',
    mixBlendMode: 'normal',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)',
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

const Rename = ({ address, name, setOpenPopup, isLightTheme }) => {
  const [rename, setrename] = useState('');
  const navigate = useNavigate();
  const Rename_name = (address) => {
    let result = localStorage.getItem('wallets');
    let mywallet = localStorage.getItem('mywallet');
    let selected = localStorage.getItem('selected-account');
    let selected_name = localStorage.getItem('selected-name');
    result = JSON.parse(result);
    result.map((option) => {
      if (option.address === address) {
        option.name = rename;
      }
    });
    if (address === selected) {
      selected_name = rename;
    }
    localStorage.setItem('selected-name', selected_name);
    localStorage.setItem('wallets', JSON.stringify(result));
  };
  const routeToDashboard = () => {
    const address = localStorage.getItem('selected-account');
    navigate(`/${address}${localStorage.getItem('setnavigation')}/`, { replace: true });
    // navigate(-1);
  };

  return (
    <div>
      <Address style={{ flexGrow: 1 }}>{address}</Address>
      <Input_Rename
        onChange={(event) => setrename(event.target.value)}
        placeholder={name === 'null' ? '' : name}
      />
      <Button_Rename
        onClick={() => {
          setOpenPopup(false);
        }}>
        <p> Cancel</p>
      </Button_Rename>
      <Button_Rename_Disconnect
        onClick={() => {
          Rename_name(address);
          routeToDashboard();
          setOpenPopup(false);
        }}>
        <p> Save </p>
      </Button_Rename_Disconnect>
    </div>
  );
};

export default Rename;
