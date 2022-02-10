import {DEFAULT_CHAIN_ID} from "./connectors";

export interface Address {
  4: string;
  1: string;
}

export interface Token {
  key: string;
  address: Address;
  decimals: number;
  DEFAULT_CHAIN_ID: number
}

export interface Contract {
  address: Address;
}

export interface Contracts {
  [name: string]: Contract;
}
export const CONTRACTS: Contracts = {
  Staking: {
    address: {
      4: '0x96d893AFcA0C07723162201C24d4948F760B4eae',
      1: '',
    },
  },
  ara: {
    address: {
      4: '0x6dc6f2dFC8EAf9d5027662d52c88Be03173E4233',
      1: '',
    },
  },
  leag: {
    address: {
      4: '0x930B8e747B4f338be558521cfC38181839649e33',
      1: '',
    },
  },
  xyz: {
    address: {
      4: '0x42b1A64780A00f2A01a15e126B09923425753CD0',
      1: '',
    },
  },
  ohm: {
    address: {
      4: '0x3710c887942429Dbc17f2c46771b9E7DaF06D449',
      1: '',
    },
  },
  ens: {
    address: {
      4: '0x16A0b2393FD6e5853c0A1d645c73DEB2Ad785254',
      1: '',
    },
  },
};
