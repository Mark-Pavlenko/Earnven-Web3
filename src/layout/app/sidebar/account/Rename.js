import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  address: {
    textAlign: 'left',
    position: 'absolute',
    top: '122px',
    left: '178px',
    fontSize: '12px',
    lineHeight: '19px',
    fontStyle: 'normal',
    color: '#1E1E20',
    opacity: 0.5,
    fontFamily: 'Saira, sans-serif',
  },
  input: {
    textAlign: 'left',
    position: 'absolute',
    top: '153px',
    left: '178px',
    fontSize: '14px',
    lineHeight: '22px',
    fontStyle: 'normal',
    color: '#1E1E20',
    opacity: 0.5,
    fontFamily: 'Saira, sans-serif',
    height: '60px',
    width: '475px',
    borderRadius: '10px',
    border: '0px',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)',
    background: '#FFFFFF',
  },
  save: {
    background: 'rgba(255, 255, 255, 0.16);',
    width: '150px',
    height: '40px',
    position: 'absolute',
    left: '250px',
    bottom: '97px',
    mixBlendMode: 'normal',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)',
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
      bottom: '97px',
      mixBlendMode: 'normal',
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)',
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
    bottom: '97px',
    mixBlendMode: 'normal',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)',
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
      bottom: '97px',
      mixBlendMode: 'normal',
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)',
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

const Rename = ({ address, name }) => {
  const [rename, setrename] = useState('');
  const classes = useStyles();
  const navigate = useNavigate();
  const Rename_name = (address) => {
    let result = localStorage.getItem('wallets');
    let mywallet = localStorage.getItem('mywallet');
    let selected = localStorage.getItem('selected-account');
    result = JSON.parse(result);
    result.map((option) => {
      if (option.address == address) {
        option.name = rename;
        // localStorage.setItem('selected-name', rename);
      }
      if (option.address == selected) {
        localStorage.setItem('selected-name', option.name);
      }
    });
    localStorage.setItem('wallets', JSON.stringify(result));
  };
  const routeToDashboard = () => {
    const address = localStorage.getItem('selected-account');
    console.log('inside route dashboard');
    navigate(-1);
  };

  return (
    <div>
      <Typography className={classes.address} component="div" style={{ flexGrow: 1 }}>
        {address}
      </Typography>
      <input
        onChange={(event) => setrename(event.target.value)}
        placeholder={name == 'null' ? '' : name}
        className={classes.input}></input>
      <Button className={classes.save}>
        <p> Cancel </p>
      </Button>
      <Button
        className={classes.disconnect}
        onClick={() => {
          Rename_name(address);
          routeToDashboard();
        }}>
        <p> Save </p>
      </Button>
    </div>
  );
};

export default Rename;
