import React from 'react';

export default function index({ background = 'transparent', value, ...props }) {
  function mouseOver(e) {
    e.target.style.background = '#BB86FC';
  }

  function mouseOut(e) {
    e.target.style.background = 'transparent';
  }

  return (
    <>
      <button
        onMouseOver={(e) => {
          mouseOver(e);
        }}
        pointer
        onMouseOut={(e) => {
          mouseOut(e);
        }}
        style={{
          height: '45px',
          width: '300px',
          background,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#ac6afc',
          borderRadius: '5px',
          color: 'white',
          cursor: 'pointer',
        }}
        {...props}>
        {value}
      </button>
    </>
  );
}
