import React from 'react';
import styled from 'styled-components';
import Avatar from 'react-avatar';

export const SelectOptionsWithJSX = (options) => {
  return options.map((option) => {
    return {
      label: (
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {option.logoURI !== null ? (
              <SendTokenImg alt="token_img" src={option.logoURI} />
            ) : (
              <Avatar
                style={{
                  marginLeft: '12px',
                  marginRight: '12px',
                  marginTop: '2px',
                }}
                name={option.name}
                round={true}
                size="21"
                textSizeRatio={1}
              />
            )}
          </div>
          <Name>{option.name}</Name>
        </div>
      ),
      value: option.name,
      symbol: option.symbol,
      address: option.address,
    };
  });
};

const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: serif Saira;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 31px;
  color: #1e1e20;
`;

export const SendTokenImg = styled.img`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: #e5e5e5;
  margin-right: 12px;
  margin-left: 12px;
`;
