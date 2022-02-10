import BigNumber from 'bignumber.js';
import { BigNumber as BigNumberETH } from '@ethersproject/bignumber';
import { Address } from './constants';
import { DEFAULT_CHAIN_ID } from './connectors';
import Numeral from 'numeral';
import { parseUnits, formatUnits } from '@ethersproject/units';

export const DEFAULT_DECIMAL: number = 18;

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatAddress = (address: string) => `${address.slice(0, 5)}...${address.slice(-4)}`;

export const toK = (num: number) => Numeral(num).format('0.[000000]a').toUpperCase();

export const formatTokensBalanceToK = (balance: number, decimal: number = 6) => {
  const balanceValue = Math.trunc(balance * 10 ** decimal) / 10 ** decimal;
  if (balanceValue < 0.000001) {
    return 0;
  }
  return toK(Number(balanceValue));
};

const UsdFormat = {
  style: 'currency',
  currency: 'USD',
};

const TokenFormat = {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
};

const PercentFormat = {
  style: 'percent',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
};

export function getExponentValue(decimals: number): BigNumber {
  return new BigNumber(10).pow(decimals);
}

export function getHumanValue(value: string, decimals: number = DEFAULT_DECIMAL): BigNumber {
  return new BigNumber(value).div(getExponentValue(decimals));
}

export function getNonHumanValue(value: string, decimals: number): string {
  return parseUnits(value, decimals).toString();
}

// add 25%
export const calculateGasMargin = (value: BigNumberETH): BigNumberETH =>
  value.mul(BigNumberETH.from(10000).add(BigNumberETH.from(2500))).div(BigNumberETH.from(10000));

export const formatTokensBalance = (balance: number, decimal: number = 6, symbol: string = '') => {
  const balanceValue = Math.trunc(balance * 10 ** decimal) / 10 ** decimal;
  const TokenFormater = new Intl.NumberFormat('en-US', Object.assign({}, TokenFormat));

  return `${TokenFormater.format(balanceValue)} ${symbol}`;
};

export const formatDollarsBalance = (balance: number) => {
  const fractions = balance >= 1.0 ? 0 : 4;
  const UsdFormatter = new Intl.NumberFormat(
    'en-US',
    Object.assign({ maximumFractionDigits: fractions, minimumFractionDigits: fractions }, UsdFormat)
  );

  return UsdFormatter.format(balance);
};

export const formatPercent = (percent: number) => {
  const PercentFormatter = new Intl.NumberFormat('en-US', PercentFormat);

  return PercentFormatter.format(percent / 10 ** PercentFormat.maximumFractionDigits);
};

export enum ChainId {
  MAINNET = 1,
  RINKEBY = 4,
}

const SCAN_PREFIXES: { [chainId in ChainId]: string } = {
  1: 'https://etherscan.io',
  4: 'https://rinkeby.etherscan.io',
};

export function getScanLink(
  type: 'transaction' | 'token' | 'address' | 'block',
  chainId?: ChainId,
  data?: string
): string {
  const prefix = SCAN_PREFIXES[chainId!] || SCAN_PREFIXES[1];
  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'block': {
      return `${prefix}/block/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

// using a currency library here in case we want to add more in future
export const formatDollarAmount = (num: number, digits: number) => {
  const formatter = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return formatter.format(num);
};

export const formattedNum = (number: any, usd = false) => {
  if (Number.isNaN(number) || number === '' || number === undefined) {
    return usd ? '$0.00' : Number(0).toFixed(5);
  }
  const num = parseFloat(number);

  if (num > 500000000) {
    // @ts-ignore
    return (usd ? '$' : '') + toK(num.toFixed(0));
  }

  if (num === 0) {
    if (usd) {
      return '$0.00';
    }
    return Number(0).toFixed(5);
  }

  if (num < 0.00001 && num > 0) {
    return usd ? '< $0.00001' : '< 0.00001';
  }

  if (num > 100000) {
    return usd ? formatDollarAmount(num, 0) : parseFloat(String(num)).toFixed(0).toLocaleString();
  }

  if (usd) {
    if (num < 0.1) {
      return formatDollarAmount(num, 4);
    }
    return formatDollarAmount(num, 2);
  }

  return parseFloat(String(num)).toFixed(5).toString();
};

export const getAddressByChainId = (address: Address, chainId: number | undefined) =>
  chainId && address[chainId as keyof Address]
    ? address[chainId as keyof Address]
    : address[DEFAULT_CHAIN_ID as keyof Address];
