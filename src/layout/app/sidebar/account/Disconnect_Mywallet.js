import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    position: 'absolute',
    top: '119px',
    left: '297px',
    fontSize: '14px',
    color: '#1E1E20',
    fontFamily: 'Saira, sans-serif',
    lineHeight: '22px',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  name: {
    textAlign: 'center',
    position: 'relative',
    top: '80px',
    // left: '260px',
    fontSize: '14px',
    color: '#4453AD',
    lineHeight: '22px',
    font: 'Saira',
    fontStyle: 'normal',
    fontWeight: 500,
  },
  address: {
    textAlign: 'center',
    position: 'absolute',
    top: '200px',
    left: '260px',
    fontSize: '14px',
    lineHeight: '22px',
    font: 'Saira',
    fontStyle: 'normal',
    color: '#1E1E20',
    opacity: 0.5,
    fontFamily: 'Saira, sans-serif',
  },
  save: {
    background: 'rgba(255, 255, 255, 0.16);',
    width: '150px',
    height: '40px',
    position: 'absolute',
    left: '250px',
    bottom: '57px',
    mixBlendMode: 'normal',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    backdropFilter: 'blur(35px)',
    borderRadius: '10px',
    fontFamily: 'Saira, sans-serif',
    color: '#1E1E20',
    fontSize: '14px',
    lineHeight: '22px',
    display: 'flex',
    fontStyle: 'normal',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.16);',
      width: '150px',
      height: '40px',
      position: 'absolute',
      left: '250px',
      bottom: '57px',
      mixBlendMode: 'normal',
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      backdropFilter: 'blur(35px)',
      borderRadius: '10px',
      fontFamily: 'Saira, sans-serif',
      color: '#1E1E20',
      fontSize: '14px',
      lineHeight: '22px',
      display: 'flex',
      fontStyle: 'normal',
    },
  },
  disconnect: {
    background: '#FFFFFF',
    width: '150px',
    height: '40px',
    position: 'absolute',
    left: '430px',
    bottom: '57px',
    mixBlendMode: 'normal',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    backdropFilter: 'blur(35px)',
    borderRadius: '10px',
    fontFamily: 'Saira, sans-serif',
    color: '#4453AD',
    fontSize: '14px',
    lineHeight: '22px',
    display: 'flex',
    fontStyle: 'normal',
    overflow: 'inherit',
    '&:hover': {
      background: '#FFFFFF',
      width: '150px',
      height: '40px',
      position: 'absolute',
      left: '430px',
      bottom: '57px',
      mixBlendMode: 'normal',
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      backdropFilter: 'blur(35px)',
      borderRadius: '10px',
      fontFamily: 'Saira, sans-serif',
      color: '#4453AD',
      fontSize: '14px',
      lineHeight: '22px',
      display: 'flex',
      fontStyle: 'normal',
      overflow: 'inherit',
    },
  },
}));

export const Disconnection_Mywallet = ({ address, name }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const disconnect = (address) => {
    console.log('inside disconnect wallet');
    let result = localStorage.getItem('mywallet');
    result = JSON.parse(result);
    let wallets = localStorage.getItem('wallets');
    wallets = JSON.parse(wallets);
    let selected_address = '';
    let selected_name = '';
    let selected = localStorage.getItem('selected-account');
    let mywallet = localStorage.getItem('mywallet');
    mywallet = JSON.parse(mywallet);
    if (selected == address) {
      mywallet.map((option) => {
        selected = option.address;
      });
    }
    wallets.map((option) => {
      selected_address = option.address;
      selected_name = option.name;
    });
    localStorage.setItem('selected-account', selected_address);
    localStorage.setItem('selected-account', selected_name);
    let output = result.filter((option) => {
      return option.address !== address;
    });
    localStorage.setItem('mywallet', JSON.stringify(output));
    navigate(`/${selected_address}/dashboard/`, { replace: false });
  };
  return (
    <div>
      <Typography className={classes.title} component="div" style={{ flexGrow: 1 }}>
        Are you sure you want to disconnect ?
      </Typography>
      <Typography className={classes.name} component="div" style={{ flexGrow: 1 }}>
        {name}
      </Typography>
      <Typography className={classes.address} component="div" style={{ flexGrow: 1 }}>
        {address}
      </Typography>
      <Button className={classes.save}>
        <p> Cancel </p>
      </Button>
      <Button
        className={classes.disconnect}
        onClick={() => {
          disconnect(address);
        }}>
        <p> Disconnect </p>
      </Button>
    </div>
  );
};
