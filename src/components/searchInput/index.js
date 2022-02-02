import React from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

export default function index({ value, onSubmit1, isLightTheme, ...props }) {
  return (
    <>
      <Paper
        elevation={3}
        style={{
          width: '300px',
          height: '40px',
          background: 'transparent',
          borderStyle: 'solid',
          borderColor: '#737373',
          borderRadius: '10px',
          borderWidth: '1px',
        }}>
        <form onSubmit={onSubmit1}>
          <InputBase
            style={{ width: '230px', color: 'white', marginTop: '5px' }}
            value={value}
            {...props}
          />

          <IconButton type="submit" style={{ height: '35px', width: '35px', color: 'white' }}>
            <SearchIcon />
          </IconButton>
        </form>
      </Paper>
    </>
  );
}
