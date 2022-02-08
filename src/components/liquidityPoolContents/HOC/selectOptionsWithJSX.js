import React from 'react';
import styled from 'styled-components';

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
            <Image src={option.image} />
          </div>
          <Name>{option.name}</Name>
        </div>
      ),
      value: option.value,
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
