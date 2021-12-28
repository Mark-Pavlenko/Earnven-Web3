import React, { useState } from 'react';
import Select, { components } from 'react-select';
import './style.css';
import emptyNetworkIcon from '../../assets/icons/emptyNetworkIcon.png';
import EthereumIcon from '../../assets/icons/ethereum.svg';
import BinanceIcon from '../../assets/icons/binance.svg';
import Solana from '../../assets/icons/solana.svg';
import Polkadot from '../../assets/icons/polkadot.svg';
import Polygon from '../../assets/icons/polygon.svg';

import { ReactSelectLayout, ComingSoonLabel } from './style';

const networks = [
  { value: 'eth', label: 'Ethereum', icon: EthereumIcon },
  { value: 'bnc', label: 'Binance', icon: BinanceIcon, disabled: true },
  { value: 'solana', label: 'Solana', icon: Solana },
  { value: 'polkadot', label: 'Polkadot', icon: Polkadot },
  { value: 'polygon', label: 'Polygon', icon: Polygon, disabled: true },
];

const Option = (props) => (
  <components.Option {...props} className="country-option">
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
        {props.data.disabled === true ? (
          <>
            <img
              src={props.data.icon}
              alt="logo"
              className="country-logo"
              style={{ width: 20, height: 20, opacity: 0.5 }}
            />
            <span style={{ color: '#b3b3b4' }}>{props.data.label}</span>
          </>
        ) : (
          <>
            <img
              src={props.data.icon}
              alt="logo"
              className="country-logo"
              style={{ width: 20, height: 20 }}
            />
            <span>{props.data.label}</span>
          </>
        )}
      </div>
      {props.data.disabled === true && <ComingSoonLabel>Coming soon</ComingSoonLabel>}
    </div>
  </components.Option>
);

const NetworkSelect = ({ isLightTheme }) => {
  // console.log('isLightThemeNetworkToggler', isLightTheme);
  const [selectedCountry, setSelectedCountry] = useState(networks[0]);

  const handleChange = (value) => {
    setSelectedCountry(value);
  };

  const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      <img src={selectedCountry.icon} alt="s-logo" className="selected-logo" />
      {children}
    </components.SingleValue>
  );

  return (
    <ReactSelectLayout>
      <Select
        value={selectedCountry}
        options={networks}
        isOptionDisabled={(option) => option.disabled}
        onChange={handleChange}
        isSearchable={false}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: isLightTheme ? '#ffffff' : '#10142D',
            border: 'none',
            boxShadow: isLightTheme
              ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
              : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
          }),
          // Menu: () => ({ borderRadius: '10px' }),
          menuList: () => ({
            backgroundColor: isLightTheme ? '#E5E5E5' : '#10142D',
            border: 'none !important',
            paddingTop: '5px',
            '&:hover': {
              cursor: 'pointer',
            },
          }),
          singleValue: (base) => ({
            ...base,
            display: 'flex',
            alignItems: 'center',
            color: isLightTheme ? 'black' : 'white',
            // marginLeft: '5px',
            '&:hover': {
              cursor: 'pointer',
            },
          }),
          dropdownIndicator: (provided, state) => ({
            ...provided,
            color: isLightTheme ? 'black' : 'white',
            transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
            '&:hover': {
              color: isLightTheme ? 'black' : 'white',
              cursor: 'pointer',
            },
          }),
          option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            console.log({ data, isDisabled, isFocused, isSelected });
            return {
              ...styles,
              backgroundColor: isLightTheme
                ? isSelected
                  ? '#ffffff'
                  : null
                : isSelected
                ? '#1F265C'
                : null,
              boxShadow: isSelected ? 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)' : null,
              fontSize: 14,
              color: isSelected
                ? isLightTheme
                  ? 'black'
                  : '#8F86FF'
                : isLightTheme
                ? 'black'
                : 'white',
              // width: isSelected ? '150px' : '160px',
              borderRadius: isSelected ? '10px' : '0',
              // color: '#000000',
            };
          },
        }}
        components={{
          Option,
          SingleValue,
          IndicatorSeparator: () => null,
        }}
      />
    </ReactSelectLayout>
  );
};

export default NetworkSelect;
