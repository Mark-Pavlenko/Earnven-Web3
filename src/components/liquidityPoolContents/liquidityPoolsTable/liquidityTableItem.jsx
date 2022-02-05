import React, { useEffect, useState } from 'react';
import {
  TableItem,
  ItemHeader,
  InvestButton,
  InfoButton,
  TokenImage,
  ItemIndex,
  TokenImages,
  TokenNames,
  AprBlock,
  AprName,
  ItemButtons,
  APR,
  AprValue,
  BalanceValue,
} from './style';
import { SvgComponent } from '../svgComponent/svgComponent';
import { numberWithCommas } from '../../../commonFunctions/commonFunctions';
import eth from '../../../assets/icons/ethereum.svg';
import uni from '../../../assets/icons/uniswap-icon.svg';
import mkr from '../../../assets/icons/mkr.svg';
import ModalContainer from '../../common/modalContainer/modalContainer';
import { SelectWrapper } from '../styledComponents';
import {
  ButtonsBlock,
  ChangeToken,
  InputBlock,
  LinksContainer,
  ModalInput,
  ModalLink,
  ModalLinkRight,
  SelectTitle,
  SupplyTokenButton,
  Balance,
  BlockTokenName,
  BlockTokens,
} from '../uniV2/StyledComponents';
import Select from 'react-select';

import { SelectOptionsWithJSX } from '../HOC/selectOptionsWithJSX';
import Web3 from 'web3';
import TransparentButton from '../../TransparentButton';
import ERC20ABI from '../../../abi/ERC20.json';
import ROUTERABI from '../../../abi/UniRouterV2.json';
import FACTORYABI from '../../../abi/UniFactoryV2.json';
import Addresses from '../../../contractAddresses';
import axios from 'axios';
import tokenURIs from '../../../screens/Exchange/tokenURIs';

export const LiquidityTableItem = ({ item, index, theme }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedModal, setSelectedModal] = useState('');

  const [outValue, setOutValue] = useState('');
  const [inValue, setInValue] = useState('');

  console.log('outValue', outValue);
  console.log('outValue', inValue);

  const [TokenA, setTokenA] = useState('');
  const [TokenB, setTokenB] = useState('');

  const [allTokens, setAllTokens] = useState([]);
  console.log('allTokens', allTokens);

  useEffect(() => {
    async function getData() {
      let fetchedTokens;
      await axios.get(`https://api.0x.org/swap/v1/tokens`, {}).then(async (response) => {
        setAllTokens(response.data.records);
        fetchedTokens = response.data.records;
      });
      await axios
        .get(`https://tokens.coingecko.com/uniswap/all.json`, {})
        .then(async (response) => {
          let data = response.data.tokens;
          let tokens = fetchedTokens.map((token) => ({
            ...token,
            logoURI: data.find((x) => x.address === token.address)
              ? data.find((x) => x.address === token.address).logoURI
              : tokenURIs.find((x) => x.address === token.address).logoURI,
          }));
          setAllTokens(tokens);
        })
        .catch((res) => {
          console.log('liquidity pools Sushiswap-V2 returns error', res);
        });
    }
    getData().then((r) => r);
  }, []);

  const switchModal = (e) => {
    setSelectedModal(e.target.id);
    setIsModalVisible(true);
  };

  const selectStyle = {
    menu: (provided, state) => ({
      ...provided,
      width: '100%',
      height: 'fitContent',
      background: 'rgba(255, 255, 255, 0.16)',
      boxSizing: 'border-box',
      boxShadow: 'inset 2px 0px 0px rgba(255, 255, 255, 0.1)',
      borderTop: 'none',
      borderRadius: '0 0 7px 7px',
      mixBlendMode: 'normal',
      backdropFilter: 'blur(35px)',
      marginTop: '0px',
      padding: '0 20px 22px 11px',
    }),
    control: (provided, state) => {
      //valueLine
      return {
        ...provided,
        background: state.menuIsOpen ? 'rgba(255, 255, 255, 0.16)' : '#FFFFFF',
        boxShadow: state.menuIsOpen
          ? 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'
          : 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)',
        backdropFilter: 'blur(35px)',
        mixBlendMode: 'normal',
        border: 'none',
        borderRadius: state.menuIsOpen ? '7px 7px 0 0' : '7px',
        color: '#464C52',
        height: '60px',
        width: '100%',
        cursor: 'pointer',
        marginBottom: '20px',
        paddingRight: '28px',
        paddingLeft: '12px',
      };
    },
    placeholder: (provided, state) => ({
      ...provided,
      color: '#464C52',
      fontSize: '18px',
      textAlign: 'left',
    }),
    dropdownIndicator: (provided, state) => ({
      // ...provided,
      height: '20px',
      width: '20px',
      color: '#4453AD',
    }),
    indicatorsContainer: () => ({
      color: 'transparent',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#464C52',
      fontSize: '18px',
      background: state.isSelected ? 'black' : 'transparent',
    }),
    option: (provided, state) => {
      return {
        ...provided,
        ':hover': {
          background: '#FFFFFF',
          boxShadow: 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)',
          borderRadius: '7px',
        },
        // -------------------------------->
        background: state.isSelected ? 'rgba(255, 255, 255, 0.16)' : 'transparent',
        // -------------------------------->
        boxShadow: state.isSelected && '7px 21px 22px -15px rgba(51, 78, 131, 0.17)',
        // -------------------------------->
        display: 'flex',
        color: '#616161',
        mixBlendMode: 'normal',
        height: state.isSelected ? '43px' : '60px',
        padding: '5px 10px',
        fontSize: '18px',
        borderRadius: '7px',
      };
    },
  };

  const options = [
    {
      image: eth,
      name: 'Ethereum',
      value: '1',
    },
    {
      image: uni,
      name: 'Uniswap',
      value: '2',
    },
    {
      image: mkr,
      name: 'Uniswap MKR Pool (v1)',
      value: '3',
    },
    {
      image: mkr,
      name: 'Uniswap MKR Pool (v1)',
      value: '4',
    },
  ];

  const updatedOptions = SelectOptionsWithJSX(options);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      console.log('qwerty1', window.web3);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      console.log('qwerty2', window.web3);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async function checkLiquidity() {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    var FactoryContract = new web3.eth.Contract(FACTORYABI, Addresses.sushiFactory);
    var pairAddress = await FactoryContract.methods.getPair(item.token0.id, item.token1.id).call();
    var PairContract = new web3.eth.Contract(ERC20ABI, pairAddress);
    var NewContract = new web3.eth.Contract(
      ROUTERABI,
      '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
    );
    var reverses = await PairContract.methods.getReserves().call();
    // console.log('reverses', BigInt(reverses[0]), BigInt(reverses[1]));
    let out = await NewContract.methods
      .getAmountsOut(12374646465, [item.token0.id, item.token1.id])
      .call();
  }

  async function addLiquidityNormal(tokenA, tokenB, amountTokenA, amountTokenB) {
    const start = parseInt(Date.now() / 1000) + 180;
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    var tokenAContract = new web3.eth.Contract(ERC20ABI, tokenA);
    var tokenBContract = new web3.eth.Contract(ERC20ABI, tokenB);
    await tokenAContract.methods
      .approve(Addresses.sushiRouter, web3.utils.toWei(amountTokenA, 'ether'))
      .send({ from: accounts[0] });
    await tokenBContract.methods
      .approve(Addresses.sushiRouter, web3.utils.toWei(amountTokenB, 'ether'))
      .send({ from: accounts[0] });
    const UniRouter = new web3.eth.Contract(ROUTERABI, Addresses.sushiRouter);
    await UniRouter.methods
      .addLiquidity(
        tokenA,
        tokenB,
        web3.utils.toWei(amountTokenA, 'ether'),
        web3.utils.toWei(amountTokenB, 'ether'),
        0,
        0,
        accounts[0],
        start.toString()
      )
      .send({ from: accounts[0] });
  }

  const convertTokenPrice = async (inputId, value, token1, token2) => {
    console.log('tokenAddresses', item);
    const tokenDecimal1 = allTokens.find((o) => {
      return o.address === token1;
    });
    const tokenDecimal2 = allTokens.find((o) => {
      return o.address === token2;
    });

    console.log('Decimal1', tokenDecimal1?.decimals);
    console.log('Decimal2', tokenDecimal2?.decimals);

    await loadWeb3();
    const web3 = window.web3;

    const NewContract = new web3.eth.Contract(
      ROUTERABI,
      '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
    );
    if (!isNaN(value)) {
      if (inputId === 'firstInput') {
        const convertedValue = await NewContract.methods
          //.getAmountsOut(stringValue * 10 ** originDecimal.decimals, [token1, token2])
          .getAmountsOut(
            (value * 10 ** (tokenDecimal1?.decimals ? tokenDecimal1?.decimals : 18)).toString(),
            [token1, token2]
          )
          .call();
        // const valueWithDecimals = (
        //   convertedValue[1] /
        //   10 ** tokenDecimalConvertIn.decimals
        // ).toString();
        console.log('convertedValue', convertedValue);

        setOutValue(
          +convertedValue[1] / 10 ** (tokenDecimal2?.decimals ? tokenDecimal2?.decimals : 18)
        );
        setInValue(value);
      }
      if (inputId === 'secondInput') {
        const convertedValue = await NewContract.methods
          .getAmountsIn(
            (value * 10 ** (tokenDecimal2?.decimals ? tokenDecimal2?.decimals : 18)).toString(),
            [token1, token2]
          )
          .call();
        console.log('convertedValue', convertedValue);
        setInValue(
          +convertedValue[0] / 10 ** (tokenDecimal1?.decimals ? tokenDecimal1?.decimals : 18)
        );

        setOutValue(value);
      }
    } else {
      setInValue('');
      setOutValue('');
    }
  };

  return (
    <>
      {isModalVisible && (
        <ModalContainer
          theme={theme}
          title={selectedModal + (index + 1)}
          isOpen={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
          }}>
          <SelectWrapper>
            <SelectTitle>{'Supply a token'}</SelectTitle>
            <Select defaultValue={'Ethereum'} styles={selectStyle} options={updatedOptions} />
            <InputBlock>
              <ModalInput type="number" />
              <Balance>{`Balance: ${5}`}</Balance>
            </InputBlock>
            <ButtonsBlock>
              <SupplyTokenButton>{`Supply a token`}</SupplyTokenButton>
            </ButtonsBlock>
            <ButtonsBlock>
              <ChangeToken>{'Or'}</ChangeToken>
            </ButtonsBlock>
            <SelectTitle>{'Supply a token'}</SelectTitle>
            {/*input-------------------->*/}
            <InputBlock>
              <BlockTokens>
                <div>
                  <TokenImage src={`https://ethplorer.io${item.token0.image}`} />
                </div>
                <BlockTokenName>{item.token0.name}</BlockTokenName>
              </BlockTokens>
              <ModalInput
                value={inValue}
                onChange={(e) => {
                  setTokenA(e.target.value);
                  convertTokenPrice(
                    'firstInput',
                    parseInt(e.target.value),
                    item.token0.id,
                    item.token1.id
                  );
                }}
                type="number"
                onFocus={() => {
                  setOutValue('');
                }}
              />
              <Balance>{`Balance: ${5}`}</Balance>
            </InputBlock>
            {/*input-------------------->*/}
            {/*input-------------------->*/}
            <InputBlock>
              <BlockTokens>
                <div>
                  <TokenImage src={`https://ethplorer.io${item.token1.image}`} />
                </div>
                <BlockTokenName>{item.token1.name}</BlockTokenName>
              </BlockTokens>
              <ModalInput
                value={outValue}
                onChange={(e) => {
                  setTokenB(e.target.value);
                  convertTokenPrice(
                    'secondInput',
                    parseInt(e.target.value),
                    item.token0.id,
                    item.token1.id
                  );
                }}
                type="number"
                onFocus={() => {
                  setInValue('');
                }}
              />
              <Balance>{`Balance: ${5}`}</Balance>
            </InputBlock>
            {/*input-------------------->*/}
            <LinksContainer>
              <ModalLink href={'#'}>aaa</ModalLink>
              <ModalLinkRight href={'#'}>bbb</ModalLinkRight>
              <ModalLink href={'#'}>ccc</ModalLink>
              <ModalLinkRight href={'#'}>ddd</ModalLinkRight>
            </LinksContainer>
            <ButtonsBlock>
              <SupplyTokenButton
                onClick={() => {
                  addLiquidityNormal(item.token0.id, item.token1.id, TokenA, TokenB);
                }}>{`Supply tokens`}</SupplyTokenButton>
            </ButtonsBlock>
          </SelectWrapper>
        </ModalContainer>
      )}
      <TableItem isLightTheme={theme}>
        <ItemHeader>
          <ItemIndex>{index + 1}</ItemIndex>
          <TokenImages>
            {Object.keys(item)
              .filter((token) => token.includes('token'))
              .map((name) => (
                <>
                  {item[name].image && (
                    <TokenImage src={`https://ethplorer.io${item[name].image}`} />
                  )}
                </>
              ))}
          </TokenImages>
          <TokenNames>
            {Object.keys(item)
              .filter((token) => token.includes('token'))
              .map((name) => (
                <div>{item[name].symbol}</div>
              ))}
          </TokenNames>
        </ItemHeader>
        <BalanceValue>${numberWithCommas(parseFloat(item.reserveUSD).toFixed(2))}</BalanceValue>
        <APR>
          <AprBlock>
            <AprName>Weekly</AprName>
            <AprValue color="#00DFD1">
              +
              {(((parseInt(item.volumeUSD) * 0.003) / parseInt(item.reserveUSD)) * 100 * 7).toFixed(
                2
              )}
              %
            </AprValue>
          </AprBlock>
          <AprBlock>
            <AprName>Yearly</AprName>
            <AprValue color="#00DFD1">
              +
              {(
                ((parseInt(item.volumeUSD) * 0.003) / parseInt(item.reserveUSD)) *
                100 *
                365
              ).toFixed(2)}
              %
            </AprValue>
          </AprBlock>
        </APR>
        <ItemButtons>
          <InvestButton isLightTheme={theme} id="Add Liquidity" onClick={switchModal}>
            Invest
          </InvestButton>
          <InfoButton isLightTheme={theme} onClick={checkLiquidity}>
            {theme ? <SvgComponent color="#4453AD" /> : <SvgComponent color="white" />}
          </InfoButton>
        </ItemButtons>
      </TableItem>
    </>
  );
};
