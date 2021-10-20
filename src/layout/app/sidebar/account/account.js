import { experimentalStyled as styled } from '@material-ui/core/styles';
import accountLogo from '../../../../assets/icons/accountlogo.png';
import {
  Box,
  Typography,
  Avatar,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Divider,
  ListItem,
  IconButton,
} from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { RiSettings5Line } from 'react-icons/ri';
import { VscAdd } from 'react-icons/vsc';
import './account.css';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from 'react-icons/md';
import AccountBalance from '../../../../components/AccountBalance';
import MenuPopover from '../../../../components/MenuPopover';

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  paddingBottom: 0,
}));

export default function Account({ address }) {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [account, setaccount] = useState(false);
  const [accountList, setaccountList] = useState([]);

  useEffect(() => {
    const result = localStorage.getItem('wallets');
    setaccountList(JSON.parse(result));
  }, [account]);

  const showAccountPopover = () => {
    setaccount(true);
  };
  const hideAccountPopover = () => {
    setaccount(false);
  };

  const routeToConnectWallet = () => {
    navigate('/app/connect-wallet');
    setaccount(false);
  };

  const updateSelectedAccount = (address) => {
    localStorage.setItem('selected-account', address);
  };

  const routeToDashboard = () => {
    const address = localStorage.getItem('selected-account');
    navigate(`/${address}/dashboard/`, { replace: true });
  };

  function shortaddress(addy) {
    if (addy === '') {
      return addy;
    }
    if (addy) {
      const l = addy.length;
      const addynew = `${addy[0] + addy[1] + addy[2] + addy[3] + addy[4] + addy[5]}...${
        addy[l - 4]
      }${addy[l - 3]}${addy[l - 2]}${addy[l - 1]}`;
      return addynew;
    }
  }

  function shortaddress1(addy) {
    if (addy === '') {
      return addy;
    }
    const l = addy.length;
    const addynew = `${
      addy[0] + addy[1] + addy[2] + addy[3] + addy[4] + addy[5] + addy[6] + addy[7] + addy[8]
    }...${addy[l - 8]}${addy[l - 7]}${addy[l - 6]}${addy[l - 5]}${addy[l - 4]}${addy[l - 3]}${
      addy[l - 2]
    }${addy[l - 1]}`;
    return addynew;
  }

  return (
    <>
      <AccountStyle ref={anchorRef} onClick={showAccountPopover} style={{ cursor: 'pointer' }}>
        <Avatar src={accountLogo} alt="photoURL" />
        <Box sx={{ ml: 2 }}>
          <Stack direction="row">
            <Typography variant="subtitle2" sx={{ color: '#fff' }}>
              {shortaddress(localStorage.getItem('selected-account'))}
            </Typography>
            <ExpandMoreIcon style={{ color: 'fff' }} />
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <AccountBalance address={address} />
          </Typography>
        </Box>
      </AccountStyle>
      <MenuPopover open={account} onClose={hideAccountPopover} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {accountList.map((option) => (
            /* <>
                        <Stack direction='coloumn' >
                        <MenuItem onClick={() => {
                            hideAccountPopover();
                            updateSelectedAccount(option.address);
                            routeToDashboard();
                        }}
                            sx={{ py: 1, px: 2.5 }}>
                            <ListItemText primaryTypographyProps={{ variant: 'body2', color: '#fff' }}>
                                {shortaddress1(option.address)}
                            </ListItemText>
                        </MenuItem>

                        ......
                        <CopyToClipboard text={option.address} style={{marginRight:'8px',marginLeft:'5px',marginTop:'8px'}}><RiSettings5Line style={{ color: 'fff' }} /></CopyToClipboard>
                        </Stack>
                        </> */
            /* <CopyToClipboard text={option.address}><RiSettings5Line style={{ color: 'fff' }} /></CopyToClipboard> */
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="copy">
                  <CopyToClipboard text={option.address}>
                    <MdContentCopy style={{ color: '#929292' }} />
                  </CopyToClipboard>
                </IconButton>
              }>
              <ListItemText
                onClick={() => {
                  hideAccountPopover();
                  updateSelectedAccount(option.address);
                  routeToDashboard();
                }}
                primaryTypographyProps={{ variant: 'body2', color: '#fff' }}
                sx={{ px: 0.5, cursor: 'pointer' }}>
                {shortaddress1(option.address)}
              </ListItemText>
            </ListItem>
          ))}

          <Divider variant="middle" />
          <MenuItem
            onClick={routeToConnectWallet}
            sx={{
              py: 1,
              px: 1,
              mx: 2,
              my: 1,
              borderRadius: '8px',
              background: (theme) => theme.palette.gradients.custom,
            }}>
            <ListItemIcon sx={{ mr: 1, minWidth: '17px' }}>
              <VscAdd style={{ color: 'fff' }} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ variant: 'body2', color: '#fff' }}>
              Add Account
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={hideAccountPopover}
            sx={{
              py: 1,
              px: 1,
              mx: 2,
              borderRadius: '8px',
              background: (theme) => theme.palette.gradients.custom,
            }}>
            <ListItemIcon sx={{ mr: 1, minWidth: '17px' }}>
              <RiSettings5Line style={{ color: 'fff' }} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ variant: 'body2', color: '#fff' }}>
              Manage account
            </ListItemText>
          </MenuItem>
        </Box>
      </MenuPopover>
    </>
  );
}
