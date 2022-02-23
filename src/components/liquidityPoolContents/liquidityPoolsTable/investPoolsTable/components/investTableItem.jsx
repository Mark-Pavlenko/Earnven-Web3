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
  LiquidityValue,
  BalanceValue,
  TokensValue,
  ResetButton,
  MenuPopoverBoxTitle,
} from '../styledComponents';
import { SvgComponent } from '../../../svgComponent/svgComponent';
import {
  addIconsGasPrices,
  numberWithCommas,
} from '../../../../../commonFunctions/commonFunctions';
import ModalContainer from '../../../../common/modalContainer/modalContainer';
import { SelectWrapper } from '../../../styledComponents';
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
} from '../../../uniV2/StyledComponents';
import Select from 'react-select';
import { Link, useParams } from 'react-router-dom';

import { SelectOptionsWithJSX } from '../../../HOC/selectOptionsWithJSX';
import Web3 from 'web3';
import ERC20ABI from '../../../../../abi/ERC20.json';
import ROUTERABI from '../../../../../abi/UniRouterV2.json';
import FACTORYABI from '../../../../../abi/UniFactoryV2.json';
import Addresses from '../../../../../contractAddresses';
import axios from 'axios';
import tokenURIs from '../../../../../screens/Exchange/tokenURIs';
import TOKENDECIMALSABI from '../../../../../abi/TokenDecomals.json';
import {
  CommonSubmitButton,
  CommonHoverButton,
  CommonHoverButtonTrans,
} from '../../../../../screens/TokenPage/components/styledComponentsCommon';
import { GasMenuItem } from '../../../../gasDropDownMenu/styles';
import { useDispatch, useSelector } from 'react-redux';
import { data } from '../../../../../globalStore';
import fastDice from '../../../../../assets/icons/fastDice-icon.svg';
import middleDice from '../../../../../assets/icons/middleDice-icon.svg';
import slowDice from '../../../../../assets/icons/slowDice-icon.svg';
import actionTypes from '../../../../../constants/actionTypes';

export const InvestTableItem = ({
  item,
  index,
  theme,
  addLiquidity,
  removeLiquidity,
  addLiquidityNormal,
  removeLiquidityNormal,
}) => {
  const dispatch = useDispatch();
  const address = useParams().address;
  const GasPrices = useSelector((state) => state.gesData.gasPriceData);
  const proposeGasPrice = useSelector((state) => state.gesData.proposeGasPrice);
  const selectedGasPrice = useSelector((state) => state.gesData.selectedGasPrice);
  const allTokensList = useSelector((state) => state.tokensListReducer.receiveTokensList);

  const addIconsGasPricesWithIcons = addIconsGasPrices(
    GasPrices,
    fastDice,
    middleDice,
    slowDice,
    fastDice,
    middleDice,
    slowDice,
    theme
  );

  const [isModalVisible, setIsModalVisible] = useState('');

  const [selectedModal, setSelectedModal] = useState('');

  const [outValue, setOutValue] = useState('');
  const [inValue, setInValue] = useState('');

  const [addLiquidityNormalTokenA, setAddLiquidityNormalTokenA] = useState('');
  const [addLiquidityNormalTokenB, setAddLiquidityNormalTokenB] = useState('');

  const [tokenAddress, setTokenAddress] = useState('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  const [singleTokenValue, setSingleTokenValue] = useState();

  const [inputType, setInputType] = useState('single');

  const [selected, setSelected] = useState('');

  const [isWithdrawActive, setIsWithdrawActive] = useState(false);
  const [supplyTokenBalance, setSupplyTokenBalance] = useState('');

  const selectInitialValue = {
    label: 'Ether',
    value: 'Ether',
  };

  useEffect(() => {
    const getBalance = async () => {
      await loadWeb3();
      const web3 = window.web3;
      const getBalance = await web3.eth.getBalance(tokenAddress);
      const ethBalance = web3.utils.fromWei(getBalance, 'ether');
      setSupplyTokenBalance(ethBalance);
    };
    getBalance().then((res) => res);
  }, [tokenAddress]);

  const switchModal = (e) => {
    setSelectedModal(e.target.id);
    setIsModalVisible('addLiquidity');
  };

  const selectStyle = {
    //opened dropdown
    menu: (provided, state) => ({
      ...provided,
      width: '100%',
      height: 'fitContent',
      background: theme ? 'rgba(255, 255, 255, 0.16)' : 'rgba(31, 38, 92, 0.24)',
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
        background: theme
          ? state.menuIsOpen
            ? 'rgba(255, 255, 255, 0.16)'
            : '#FFFFFF'
          : state.menuIsOpen
          ? 'rgba(31, 38, 92, 0.24)'
          : 'rgba(31, 38, 92, 0.24)',
        boxShadow: theme
          ? state.menuIsOpen
            ? 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'
            : 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
          : state.menuIsOpen
          ? 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'
          : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
        // backdropFilter: 'blur(35px)',
        // mixBlendMode: 'normal',
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
      color: theme ? '#4453AD' : '#8F86FF',
    }),
    indicatorsContainer: () => ({
      color: 'transparent',
    }),
    singleValue: (provided, state) => ({
      //select closed
      ...provided,
      color: theme ? '#464C52' : '#FFFFFF',
      fontSize: '18px',
      background: state.isSelected ? 'black' : 'transparent',
    }),
    option: (provided, state) => ({
      ...provided,
      ':hover': {
        background: theme ? '#FFFFFF' : 'rgba(31, 38, 92, 0.24)',
        boxShadow: theme
          ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
          : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
        borderRadius: '7px',
      },
      // -------------------------------->
      background: theme
        ? state.isSelected
          ? 'rgba(255, 255, 255, 0.16)'
          : 'transparent'
        : state.isSelected
        ? 'rgba(31, 38, 92, 0.24)'
        : 'transparent',
      // -------------------------------->
      boxShadow: theme
        ? state.isSelected && '7px 21px 22px -15px rgba(51, 78, 131, 0.17)'
        : state.isSelected && 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
      // -------------------------------->
      color: 'red',
      display: 'flex',
      // mixBlendMode: 'normal',
      height: state.isSelected ? '43px' : '60px',
      padding: '5px 10px',
      fontSize: '18px',
      borderRadius: '7px',
    }),
  };

  const updatedOptions = SelectOptionsWithJSX(allTokensList);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
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
      '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F'
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
      item.protocol === 'Sushiswap' ? Addresses.sushiRouter : Addresses.uniRouter
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
    if (!isWithdrawActive) {
      switch (inputType) {
        case 'single':
          return addLiquidity(
            item.poolDetails.token0Address,
            item.poolDetails.token1Address,
            tokenAddress,
            (singleTokenValue * 10 ** 18).toString(),
            selectedGasPrice ? selectedGasPrice : proposeGasPrice,
            item.protocol
          );
        case 'pair':
          return addLiquidityNormal(
            item.poolDetails.token0Address,
            item.poolDetails.token1Address,
            addLiquidityNormalTokenA,
            addLiquidityNormalTokenB,
            selectedGasPrice ? selectedGasPrice : proposeGasPrice,
            item.protocol
          );
      }
    }
    if (isWithdrawActive) {
      switch (inputType) {
        case 'single':
          return removeLiquidity(
            item.poolDetails.token0Address,
            item.poolDetails.token1Address,
            tokenAddress,
            (singleTokenValue * 10 ** 18).toString(),
            selectedGasPrice ? selectedGasPrice : proposeGasPrice,
            item.protocol
          );
        case 'pair':
          return removeLiquidityNormal(
            item.poolDetails.token0Address,
            item.poolDetails.token1Address,
            (singleTokenValue * 10 ** 18).toString(),
            selectedGasPrice ? selectedGasPrice : proposeGasPrice,
            item.protocol
          );
      }
    }
  };

  const slippageHandler = () => {
    setIsModalVisible('slippageTolerance');
  };

  const updateGasValue = (val, label) => {
    data.gasSelected = val;
    setSelected(label);
    dispatch({ type: actionTypes.SET_SELECTED_GAS_PRICE, payload: val });
  };

  const resetButtonHandler = () => {
    setIsModalVisible('addLiquidity');
    data.gasSelected = 0;
    dispatch({ type: actionTypes.SET_SELECTED_GAS_PRICE, payload: '' });
  };

  const saveButtonHandler = () => {
    setIsModalVisible('addLiquidity');
  };

  return (
    <>
      {/*MODAL addLiquidity====================================>*/}
      {isModalVisible === 'addLiquidity' && (
        <ModalContainer
          theme={theme}
          title={selectedModal}
          modalType={'withdraw'}
          isOpen={isModalVisible}
          closeModal={setIsModalVisible}
          setIsWithdrawActive={setIsWithdrawActive}>
          <SelectWrapper isLightTheme={theme}>
            <SelectTitle isLightTheme={theme}>{'Supply a token'}</SelectTitle>
            <Select
              defaultValue={selectInitialValue}
              styles={selectStyle}
              options={updatedOptions}
              onChange={supplyTokenHandler}
            />
            <InputBlock>
              <ModalInput
                isLightTheme={theme}
                value={singleTokenValue}
                type="number"
                onChange={(e) => {
                  addLiquidityToPair(
                    item.poolDetails.token0Address,
                    item.poolDetails.token1Address,
                    e.target.value
                  ).then((res) => res);
                  setSingleTokenValue(e.target.value);
                  setInputType('single');
                }}
              />
              <Balance isLightTheme={theme}>{`Balance: ${parseFloat(supplyTokenBalance).toFixed(
                2
              )}`}</Balance>
            </InputBlock>
            {/*<ButtonsBlock>*/}
            {/*  <SupplyTokenButton>{`Supply a token`}</SupplyTokenButton>*/}
            {/*</ButtonsBlock>*/}
            <ButtonsBlock>
              <ChangeToken>{'Or'}</ChangeToken>
            </ButtonsBlock>
            <SelectTitle isLightTheme={theme}>{'Supply a token'}</SelectTitle>
            {/*input-------------------->*/}
            <InputBlock>
              <BlockTokens>
                <div>
                  <TokenImage src={`${item.imageData[0]}`} />
                </div>
                <BlockTokenName isLightTheme={theme}>{item.token0Symbol}</BlockTokenName>
              </BlockTokens>
              <ModalInput
                isLightTheme={theme}
                value={inValue}
                onChange={(e) => {
                  convertTokenPrice(
                    'firstInput',
                    parseInt(e.target.value),
                    item.poolDetails.token0Address,
                    item.poolDetails.token1Address
                  );
                  setInputType('pair');
                }}
                type="number"
                onFocus={() => {
                  setOutValue('');
                  setSingleTokenValue('');
                }}
              />
              <Balance isLightTheme={theme}>{`Balance: ${5}`}</Balance>
            </InputBlock>
            {/*input-------------------->*/}
            {/*input-------------------->*/}
            <InputBlock>
              <BlockTokens>
                <div>
                  <TokenImage src={`${item.imageData[1]}`} />
                </div>
                <BlockTokenName isLightTheme={theme}>{item.token1Symbol}</BlockTokenName>
              </BlockTokens>
              <ModalInput
                value={outValue}
                isLightTheme={theme}
                onChange={(e) => {
                  convertTokenPrice(
                    'secondInput',
                    parseInt(e.target.value),
                    item.poolDetails.token0Address,
                    item.poolDetails.token1Address
                  );
                  setInputType('pair');
                }}
                type="number"
                onFocus={() => {
                  setInValue('');
                  setSingleTokenValue('');
                }}
              />
              <Balance isLightTheme={theme}>{`Balance: ${5}`}</Balance>
            </InputBlock>
            {/*input-------------------->*/}
            <LinksContainer>
              <ModalLink isLightTheme={theme} onClick={slippageHandler} href={'#'}>
                {'Transaction speed'}
              </ModalLink>
              <ModalLinkRight isLightTheme={theme} onClick={slippageHandler} href={'#'}>
                {`${selectedGasPrice.length > 0 ? selectedGasPrice : proposeGasPrice} Gwei`}
              </ModalLinkRight>
              {/*<ModalLink href={'#'}>{'Slippage Tolerance'}</ModalLink>*/}
              {/*<ModalLinkRight href={'#'}>ddd</ModalLinkRight>*/}
            </LinksContainer>
            <ButtonsBlock>
              <SupplyTokenButton
                isLightTheme={theme}
                onClick={inputsHandler}>{`Supply tokens`}</SupplyTokenButton>
            </ButtonsBlock>
          </SelectWrapper>
        </ModalContainer>
      )}
      {/*MODAL slippageTolerance====================================>*/}
      {isModalVisible === 'slippageTolerance' && (
        <ModalContainer modalType={isModalVisible} theme={theme} closeModal={setIsModalVisible}>
          <MenuPopoverBoxTitle isLightTheme={theme}>{'Realtime Gas Prices'}</MenuPopoverBoxTitle>
          <div style={{ marginBottom: '22px' }}>
            {addIconsGasPricesWithIcons.map((option) => (
              <div
                style={{ display: 'flex', flexDirection: 'column' }}
                selected={option.label === selected}
                onClick={() => {
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
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CommonSubmitButton
              width={'189px'}
              isLightTheme={theme}
              // onClick={() => {
              //   setIsModalVisible('advancedSettings');
              // }}
            >
              {'Advanced settings'}
            </CommonSubmitButton>
          </div>
          {/*//TODO:slippageTolerance (doesn't implemented yet)*/}
          {/*<MenuPopoverBoxTitle isLightTheme={theme}>{'Slippage Tolerance'}</MenuPopoverBoxTitle>*/}
          {/*<CommonHoverButtonTrans*/}
          {/*  height={'45px'}*/}
          {/*  width={'55px'}*/}
          {/*  isLightTheme={theme}*/}
          {/*  onClick={() => {}}>*/}
          {/*  {'1%'}*/}
          {/*</CommonHoverButtonTrans>*/}
          {/*<CommonHoverButton height={'45px'} width={'55px'} isLightTheme={theme} onClick={() => {}}>*/}
          {/*  {'3%'}*/}
          {/*</CommonHoverButton>*/}
          {/*<CommonHoverButtonTrans*/}
          {/*  height={'45px'}*/}
          {/*  width={'120px'}*/}
          {/*  isLightTheme={theme}*/}
          {/*  onClick={() => {}}>*/}
          {/*  {'%'}*/}
          {/*</CommonHoverButtonTrans>*/}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '45%' }}>
            <ResetButton isLightTheme={theme} onClick={resetButtonHandler}>
              {'Reset'}
            </ResetButton>
            <CommonSubmitButton width={'165px'} isLightTheme={theme} onClick={saveButtonHandler}>
              {'Save'}
            </CommonSubmitButton>
          </div>
        </ModalContainer>
      )}
      {/*MODAL slippageTolerance====================================>*/}
      {/*MODAL advanced settings====================================>*/}
      {isModalVisible === 'advancedSettings' && (
        <ModalContainer
          modalType={isModalVisible}
          theme={theme}
          closeModal={setIsModalVisible}></ModalContainer>
      )}
      {/*MODAL advanced settings====================================>*/}
      <TableItem isLightTheme={theme}>
        <ItemHeader>
          <ItemIndex>{index + 1}</ItemIndex>
          <TokenImages>
            {item.imageData.map((image) => (
              <>{image && <TokenImage src={`${image}`} />}</>
            ))}
          </TokenImages>
          <TokenNames>{item.symbol}</TokenNames>
        </ItemHeader>
        <LiquidityValue>{numberWithCommas(parseFloat(item.liquidity).toFixed(2))}</LiquidityValue>
        <APR>
          <AprBlock>
            <AprName>{'Weekly'}</AprName>
            <AprValue color="#00DFD1">
              +{(((parseInt(item.volume) * 0.003) / parseInt(item.liquidity)) * 100 * 7).toFixed(2)}
              %
            </AprValue>
          </AprBlock>
          <AprBlock>
            <AprName>{'Yearly'}</AprName>
            <AprValue color="#00DFD1">
              +
              {(((parseInt(item.volume) * 0.003) / parseInt(item.liquidity)) * 100 * 365).toFixed(
                2
              )}
              %
            </AprValue>
          </AprBlock>
        </APR>
        <BalanceValue>${numberWithCommas(parseFloat(item.balance).toFixed(2))}</BalanceValue>
        <TokensValue>${numberWithCommas(parseFloat(item.value).toFixed(2))}</TokensValue>
        <ItemButtons>
          <CommonSubmitButton
            width={'150px'}
            isLightTheme={theme}
            id="Add Liquidity"
            onClick={switchModal}>
            {'Invest'}
          </CommonSubmitButton>
          <CommonSubmitButton
            width={'150px'}
            isLightTheme={theme}
            id="Withdraw Liquidity"
            onClick={(e) => {
              switchModal(e);
              setIsWithdrawActive(true);
            }}>
            {'Withdraw'}
          </CommonSubmitButton>
          {item.protocol === 'Sushiswap' ? (
            <Link
              to={`/${address}/sushiswap/address/${item.poolDetails.token0Address}/${item.poolDetails.token1Address}`}>
              <InfoButton isLightTheme={theme}>
                {theme ? <SvgComponent color="#4453AD" /> : <SvgComponent color="white" />}
              </InfoButton>
            </Link>
          ) : (
            <Link
              to={`/${address}/uniswap/address/${item.poolDetails.token0Address}/${item.poolDetails.token1Address}`}>
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
