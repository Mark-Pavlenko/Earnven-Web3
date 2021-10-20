import React from 'react';

export default function index({ value, ...props }) {
  return (
    <>
      <input
        type="number"
        value={value}
        style={{
          background: 'transparent',
          borderColor: '#737373',
          borderStyle: 'solid',
          borderWidth: '1px',
          width: '100px',
          height: '35px',
          borderRadius: '10px',
          color: 'white',
          paddingLeft: '15px',
          paddingRight: '15px',
          // fontSize:'20px',
          // borderWidth:'1px'
        }}
        placeholder="00.00"
        {...props}
      />
    </>
  );
}
