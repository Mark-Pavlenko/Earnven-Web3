import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Address, Button_Rename, Button_Rename_Disconnect, Input_Rename } from './styles';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  noBorder: {
    border: 'none !important',
  },
}));

const renamePopup = ({ address, name, setOpenPopup, isLightTheme }) => {
  const classes = useStyles(isLightTheme);

  const [rename, setrename] = useState('');
  const navigate = useNavigate();

  const Rename_name = (address) => {
    let result = localStorage.getItem('wallets');
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
    <>
      <Address isLightTheme={isLightTheme}>{address}</Address>
      <Input_Rename
        onChange={(event) => setrename(event.target.value)}
        classes={{ notchedOutline: classes.noBorder }}
        placeholder={name === 'null' ? '' : name}
        isLightTheme={isLightTheme}
      />
      <Button_Rename
        onClick={() => {
          setOpenPopup(false);
        }}
        isLightTheme={isLightTheme}>
        <p> Cancel</p>
      </Button_Rename>
      <Button_Rename_Disconnect
        isLightTheme={isLightTheme}
        onClick={() => {
          Rename_name(address);
          routeToDashboard();
          setOpenPopup(false);
        }}>
        <p> Save </p>
      </Button_Rename_Disconnect>
    </>
  );
};

export default renamePopup;
