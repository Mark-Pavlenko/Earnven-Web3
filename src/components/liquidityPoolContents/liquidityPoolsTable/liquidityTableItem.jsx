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
  ResetButton,
} from './styledComponents';
import { SvgComponent } from '../svgComponent/svgComponent';
import { numberWithCommas } from '../../../commonFunctions/commonFunctions';
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
import { Link, useParams } from 'react-router-dom';

import { SelectOptionsWithJSX } from '../HOC/selectOptionsWithJSX';
import Web3 from 'web3';
import ERC20ABI from '../../../abi/ERC20.json';
import ROUTERABI from '../../../abi/UniRouterV2.json';
import FACTORYABI from '../../../abi/UniFactoryV2.json';
import Addresses from '../../../contractAddresses';
import axios from 'axios';
import tokenURIs from '../../../screens/Exchange/tokenURIs';
import TOKENDECIMALSABI from '../../../abi/TokenDecomals.json';
import { CommonSubmitButton } from '../../../screens/TokenPage/components/styledComponentsCommon';
import { GasMenuItem } from '../../gasDropDownMenu/styles';
import { useSelector } from 'react-redux';
import { data } from '../../../globalStore';

export const LiquidityTableItem = ({
  item,
  index,
  theme,
  type,
  addLiquidity,
  addLiquidityNormal,
}) => {
  const GasPrices = useSelector((state) => state.gesData.gasPriceData);

  const address = useParams().address;

  const [isModalVisible, setIsModalVisible] = useState('');
  //''
  //addLiquidity
  //slippageTolerance
  const [selectedModal, setSelectedModal] = useState('');

  const [outValue, setOutValue] = useState('');
  const [inValue, setInValue] = useState('');

  const [addLiquidityNormalTokenA, setAddLiquidityNormalTokenA] = useState('');
  const [addLiquidityNormalTokenB, setAddLiquidityNormalTokenB] = useState('');

  const [tokenAddress, setTokenAddress] = useState('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  const [singleTokenValue, setSingleTokenValue] = useState();

  const [allTokens, setAllTokens] = useState([]);
  const [inputType, setInputType] = useState('single');

  const selectInitialValue = {
    label: 'Ether',
    value: 'Ether',
  };

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
          console.log('imagesTOKENS', data);
          let tokens = fetchedTokens.map((token) => ({
            ...token,
            logoURI: data.find((x) => x.address === token.address)
              ? data.find((x) => x.address === token.address).logoURI
              : tokenURIs.find((x) => x.address === token.address).logoURI,
          }));
          console.log('tokensWithImages', tokens);
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
    setIsModalVisible('addLiquidity');
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

  const updatedOptions = SelectOptionsWithJSX(allTokens);

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

  const convertTokenPrice = async (inputId, value, token1, token2) => {
    await loadWeb3();
    const web3 = window.web3;
    //------------------------------------->
    const tokenDecimal1 = await new web3.eth.Contract(TOKENDECIMALSABI, token1).methods
      .decimals()
      .call()
      .then((res) => {
        return res;
      });
    const tokenDecimal2 = await new web3.eth.Contract(TOKENDECIMALSABI, token2).methods
      .decimals()
      .call()
      .then((res) => {
        return res;
      });
    //------------------------------------->
    const NewContract = new web3.eth.Contract(
      ROUTERABI,
      '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
    );
    if (!isNaN(value)) {
      if (inputId === 'firstInput') {
        const convertedValue = await NewContract.methods
          .getAmountsOut((value * 10 ** tokenDecimal1).toString(), [token1, token2])
          .call();

        setAddLiquidityNormalTokenA((value * 10 ** tokenDecimal1).toString());
        setAddLiquidityNormalTokenB(convertedValue[1]);

        setOutValue(+convertedValue[1] / 10 ** tokenDecimal2);
        setInValue(value);
      }
      if (inputId === 'secondInput') {
        const convertedValue = await NewContract.methods
          .getAmountsIn((value * 10 ** tokenDecimal2).toString(), [token1, token2])
          .call();

        setAddLiquidityNormalTokenA(convertedValue[0]);
        setAddLiquidityNormalTokenB((value * 10 ** tokenDecimal2).toString());

        setInValue(+convertedValue[0] / 10 ** tokenDecimal1);
        setOutValue(value);
      }
    } else {
      setInValue('');
      setOutValue('');
    }
  };

  const supplyTokenHandler = (value) => {
    console.log('supplyTokenHandler', value);
    setTokenAddress(value.address);
  };

  const addLiquidityToPair = async (token1, token2, tokenValue) => {
    const tokenValueHalf = tokenValue / 2;

    await loadWeb3();
    const web3 = window.web3;

    //------------------------------------->
    const tokenDecimal = await new web3.eth.Contract(TOKENDECIMALSABI, tokenAddress).methods
      .decimals()
      .call()
      .then((res) => {
        return res;
      });
    const tokenDecimalPair1 = await new web3.eth.Contract(TOKENDECIMALSABI, token1).methods
      .decimals()
      .call()
      .then((res) => {
        return res;
      });
    const tokenDecimalPair2 = await new web3.eth.Contract(TOKENDECIMALSABI, token2).methods
      .decimals()
      .call()
      .then((res) => {
        return res;
      });
    //------------------------------------->

    const NewContract = new web3.eth.Contract(
      ROUTERABI,
      '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
    );
    if (tokenAddress !== token1) {
      const convertedValue1 = await NewContract.methods
        .getAmountsOut((tokenValueHalf * 10 ** tokenDecimal).toString(), [tokenAddress, token1])
        .call();

      setInValue(+convertedValue1[1] / 10 ** tokenDecimalPair1);
    } else {
      setInValue(tokenValueHalf.toString());
    }

    if (tokenAddress !== token2) {
      const convertedValue2 = await NewContract.methods
        .getAmountsOut((tokenValueHalf * 10 ** tokenDecimal).toString(), [tokenAddress, token2])
        .call();

      setOutValue(+convertedValue2[1] / 10 ** tokenDecimalPair2);
    } else {
      setOutValue(tokenValueHalf.toString());
    }
  };

  const inputsHandler = () => {
    switch (inputType) {
      case 'single':
        return addLiquidity(
          item.token0.id,
          item.token1.id,
          tokenAddress,
          (singleTokenValue * 10 ** 18).toString()
        );
      case 'pair':
        return addLiquidityNormal(
          item.token0.id,
          item.token1.id,
          addLiquidityNormalTokenA,
          addLiquidityNormalTokenB
        );
    }
  };

  const slippageHandler = () => {
    setIsModalVisible('slippageTolerance');
  };

  const handleClose = () => {
    // setopen(false);
  };

  const updateGasValue = (val, label) => {
    // data.gasSelected = val;
    // setselected(label);
  };

  return (
    <>
      {/*MODAL addLiquidity====================================>*/}
      {isModalVisible === 'addLiquidity' && (
        <ModalContainer
          theme={theme}
          title={selectedModal}
          isOpen={isModalVisible}
          closeModal={setIsModalVisible}>
          <SelectWrapper>
            <SelectTitle>{'Supply a token'}</SelectTitle>
            <Select
              defaultValue={selectInitialValue}
              styles={selectStyle}
              options={updatedOptions}
              onChange={supplyTokenHandler}
            />
            <InputBlock>
              <ModalInput
                value={singleTokenValue}
                type="number"
                onChange={(e) => {
                  addLiquidityToPair(item.token0.id, item.token1.id, e.target.value).then(
                    (res) => res
                  );
                  setSingleTokenValue(e.target.value);
                  setInputType('single');
                }}
              />
              <Balance>{`Balance: ${5}`}</Balance>
            </InputBlock>
            {/*<ButtonsBlock>*/}
            {/*  <SupplyTokenButton>{`Supply a token`}</SupplyTokenButton>*/}
            {/*</ButtonsBlock>*/}
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
                  convertTokenPrice(
                    'firstInput',
                    parseInt(e.target.value),
                    item.token0.id,
                    item.token1.id
                  );
                  setInputType('pair');
                }}
                type="number"
                onFocus={() => {
                  setOutValue('');
                  setSingleTokenValue('');
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
                  convertTokenPrice(
                    'secondInput',
                    parseInt(e.target.value),
                    item.token0.id,
                    item.token1.id
                  );
                  setInputType('pair');
                }}
                type="number"
                onFocus={() => {
                  setInValue('');
                  setSingleTokenValue('');
                }}
              />
              <Balance>{`Balance: ${5}`}</Balance>
            </InputBlock>
            {/*input-------------------->*/}
            <LinksContainer>
              <ModalLink onClick={slippageHandler} href={'#'}>
                {'Slippage Tolerance'}
              </ModalLink>
              <ModalLinkRight href={'#'}>bbb</ModalLinkRight>
              <ModalLink href={'#'}>{'Transaction speed'}</ModalLink>
              <ModalLinkRight href={'#'}>ddd</ModalLinkRight>
            </LinksContainer>
            <ButtonsBlock>
              <SupplyTokenButton onClick={inputsHandler}>{`Supply tokens`}</SupplyTokenButton>
            </ButtonsBlock>
          </SelectWrapper>
        </ModalContainer>
      )}
      {/*MODAL slippageTolerance====================================>*/}
      {isModalVisible === 'slippageTolerance' && (
        <ModalContainer
          modalType={isModalVisible}
          theme={theme}
          isOpen={isModalVisible}
          closeModal={setIsModalVisible}>
          {GasPrices.map((option) => (
            <div
              style={{ display: 'flex', flexDirection: 'column' }}
              // selected={option.label === selected}
              onClick={() => {
                handleClose();
                updateGasValue(option.value, option.label);
              }}
              sx={{ py: 1, px: 2.5 }}>
              <GasMenuItem isLightTheme={theme}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <img src={option.icon} alt="" />
                  <span>{`${option.label} `}</span>
                </div>
                <div>
                  <span>{`${option.value} Gwei`}</span>
                </div>
              </GasMenuItem>
            </div>
          ))}
          <ResetButton
            isLightTheme={theme}
            onClick={() => {
              setIsModalVisible('');
            }}>
            {'Reset'}
          </ResetButton>
          <CommonSubmitButton
            width={'165px'}
            isLightTheme={theme}
            onClick={() => {
              setIsModalVisible('');
            }}>
            {'Save'}
          </CommonSubmitButton>
        </ModalContainer>
      )}
      {/*MODAL slippageTolerance====================================>*/}
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
          <CommonSubmitButton
            width={'165px'}
            isLightTheme={theme}
            id="Add Liquidity"
            onClick={switchModal}>
            Invest
          </CommonSubmitButton>
          {type === 'sushiswap' ? (
            <Link to={`/${address}/${type}/address/${item.token0.id}/${item.token1.id}`}>
              <InfoButton isLightTheme={theme}>
                {theme ? <SvgComponent color="#4453AD" /> : <SvgComponent color="white" />}
              </InfoButton>
            </Link>
          ) : (
            <Link to={`/${address}/${type}/address/${item.token0.id}/${item.token1.id}`}>
              <InfoButton isLightTheme={theme}>
                {theme ? <SvgComponent color="#4453AD" /> : <SvgComponent color="white" />}
              </InfoButton>
            </Link>
          )}
        </ItemButtons>
      </TableItem>
    </>
  );
};
