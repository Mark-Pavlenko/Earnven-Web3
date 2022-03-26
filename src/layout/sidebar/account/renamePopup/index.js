import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Address, AddressInputLayout, Input_Rename, RenameWalletGeneraLayout } from './styles';
import { makeStyles } from '@material-ui/styles';
import { Button_Cancel, Button_Success_Action, ButtonsLayout } from '../disconnectPopup/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DesktopRenameIcon from '../../../../assets/icons/desktopRemaneIcon.svg';

const useStyles = makeStyles((theme) => ({
  noBorder: {
    border: 'none !important',
  },
}));

const renamePopup = ({ address, name, setOpenPopup, isLightTheme }) => {
  const classes = useStyles(isLightTheme);
  const mobilePopoverSize = useMediaQuery('(max-width:850px)');

  const [rename, setRename] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setRename(address);
  }, []);

  const renameWallet = (address) => {
    // console.log('address rename', address);

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
  };

  return (
    <RenameWalletGeneraLayout>
      <AddressInputLayout>
        <div style={{ justifyContent: 'center', width: mobilePopoverSize && '100%' }}>
          {!mobilePopoverSize && <Address isLightTheme={isLightTheme}>{address}</Address>}
          <Input_Rename
            InputProps={{
              startAdornment: !mobilePopoverSize && (
                <img src={DesktopRenameIcon} alt="user" style={{ marginRight: '10px' }} />
              ),
              classes: { notchedOutline: classes.noBorder },
              sx: {
                color: isLightTheme ? '#1E1E20' : '#FFFFFF',
                height: '60px',
                fontSize: 14,
              },
            }}
            onChange={(event) => setRename(event.target.value)}
            value={rename}
            isLightTheme={isLightTheme}
          />
          {mobilePopoverSize && <Address isLightTheme={isLightTheme}>{address}</Address>}
        </div>
      </AddressInputLayout>
      {mobilePopoverSize ? (
        <ButtonsLayout>
          <Button_Success_Action
            isLightTheme={isLightTheme}
            onClick={() => {
              renameWallet(address);
              routeToDashboard();
              setOpenPopup(false);
            }}>
            <p> Save </p>
          </Button_Success_Action>
          <Button_Cancel
            onClick={() => {
              setOpenPopup(false);
            }}
            isLightTheme={isLightTheme}>
            <p> Cancel</p>
          </Button_Cancel>
        </ButtonsLayout>
      ) : (
        <ButtonsLayout>
          <Button_Cancel
            onClick={() => {
              setOpenPopup(false);
            }}
            isLightTheme={isLightTheme}>
            <p> Cancel</p>
          </Button_Cancel>
          <Button_Success_Action
            isLightTheme={isLightTheme}
            onClick={() => {
              renameWallet(rename);
              routeToDashboard();
              setOpenPopup(false);
            }}>
            <p> Save </p>
          </Button_Success_Action>
        </ButtonsLayout>
      )}
    </RenameWalletGeneraLayout>
  );
};

export default renamePopup;
