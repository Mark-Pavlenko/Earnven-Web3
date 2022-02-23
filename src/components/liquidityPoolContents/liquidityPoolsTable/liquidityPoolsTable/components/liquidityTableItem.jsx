import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import {
  APR,
  AprName,
  AprBlock,
  AprValue,
  TableItem,
  ItemIndex,
  ItemHeader,
  InfoButton,
  TokenImage,
  TokenNames,
  ItemButtons,
  TokenImages,
  ResetButton,
  BalanceValue,
  MenuPopoverBoxTitle,
} from '../styledComponents';
import chroma from 'chroma-js';
import Select from 'react-select';
import {
  Balance,
  ModalLink,
  ModalInput,
  InputBlock,
  ChangeToken,
  SelectTitle,
  BlockTokens,
  ButtonsBlock,
  LinksContainer,
  ModalLinkRight,
  BlockTokenName,
  SupplyTokenButton,
} from '../../../uniV2/StyledComponents';
import { data } from '../../../../../globalStore';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addIconsGasPrices,
  numberWithCommas,
} from '../../../../../commonFunctions/commonFunctions';
import { SelectWrapper } from '../../../styledComponents';
import ROUTERABI from '../../../../../abi/UniRouterV2.json';
import actionTypes from '../../../../../constants/actionTypes';
import { GasMenuItem } from '../../../../gasDropDownMenu/styles';
import { SvgComponent } from '../../../svgComponent/svgComponent';
import TOKENDECIMALSABI from '../../../../../abi/TokenDecomals.json';
import fastDice from '../../../../../assets/icons/fastDice-icon.svg';
import fastDiceDark from '../../../../../assets/icons/fastDiceNight-icon.svg';
import slowDice from '../../../../../assets/icons/slowDice-icon.svg';
import slowDiceDark from '../../../../../assets/icons/slowDiceNight-icon.svg';
import { SelectOptionsWithJSX } from '../../../HOC/selectOptionsWithJSX';
import middleDice from '../../../../../assets/icons/middleDice-icon.svg';
import middleDiceDark from '../../../../../assets/icons/middleDiceNight-icon.svg';
import ModalContainer from '../../../../common/modalContainer/modalContainer';
import { CommonSubmitButton } from '../../../../../screens/TokenPage/components/styledComponentsCommon';
import Addresses from '../../../../../contractAddresses';

export const LiquidityTableItem = ({
  item,
  type,
  index,
  theme,
  protocolType,
  addLiquidity,
  addLiquidityNormal,
}) => {
  const dispatch = useDispatch();
  const address = useParams().address;

  const GasPrices = useSelector((state) => state.gesData.gasPriceData);
  const proposeGasPrice = useSelector((state) => state.gesData.proposeGasPrice);
  const selectedGasPrice = useSelector((state) => state.gesData.selectedGasPrice);
  const allTokensList = useSelector((state) => state.tokensListReducer.receiveTokensList);

  const gasPricesWithIcons = addIconsGasPrices(
    GasPrices,
    fastDice,
    middleDice,
    slowDice,
    fastDiceDark,
    middleDiceDark,
    slowDiceDark,
    theme
  );

  // const [modalType, setModalType] = useState('');
  // //''
  // //addLiquidity
  // //slippageTolerance
  const [inValue, setInValue] = useState('');
  const [outValue, setOutValue] = useState('');
  const [selected, setSelected] = useState('');
  const [singleTokenValue, setSingleTokenValue] = useState();
  const [inputType, setInputType] = useState('single');
  const [selectedModal, setSelectedModal] = useState('');
  const [isModalVisible, setIsModalVisible] = useState('');
  const [supplyTokenBalance, setSupplyTokenBalance] = useState('');
  const [addLiquidityNormalTokenA, setAddLiquidityNormalTokenA] = useState('');
  const [addLiquidityNormalTokenB, setAddLiquidityNormalTokenB] = useState('');
  const [tokenAddress, setTokenAddress] = useState('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');

  const updatedOptions = SelectOptionsWithJSX(allTokensList);

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

  const selectInitialValue = {
    label: 'Ethereum',
    value: 'Ethereum',
  };

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
      //UNISWAP V2 contract address
      item.protocol === 'Sushiswap' ? Addresses.sushiRouter : Addresses.uniRouter
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
    switch (inputType) {
      case 'single':
        return addLiquidity(
          item.token0.id,
          item.token1.id,
          tokenAddress,
          (singleTokenValue * 10 ** 18).toString(),
          selectedGasPrice ? selectedGasPrice : proposeGasPrice,
          item.protocol !== undefined ? item.protocol : protocolType
        );
      case 'pair':
        return addLiquidityNormal(
          item.token0.id,
          item.token1.id,
          addLiquidityNormalTokenA,
          addLiquidityNormalTokenB,
          selectedGasPrice ? selectedGasPrice : proposeGasPrice,
          item.protocol ? item.protocol : protocolType
        );
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
          isOpen={isModalVisible}
          closeModal={setIsModalVisible}>
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
                  addLiquidityToPair(item.token0.id, item.token1.id, e.target.value).then(
                    (res) => res
                  );
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
                  <TokenImage src={`https://ethplorer.io${item.token0.image}`} />
                </div>
                <BlockTokenName isLightTheme={theme}>{item.token0.name}</BlockTokenName>
              </BlockTokens>
              <ModalInput
                value={inValue}
                isLightTheme={theme}
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
              {/*<Balance isLightTheme={theme}>{`Balance: ${5}`}</Balance>*/}
            </InputBlock>
            {/*input-------------------->*/}
            {/*input-------------------->*/}
            <InputBlock>
              <BlockTokens>
                <div>
                  <TokenImage src={`https://ethplorer.io${item.token1.image}`} />
                </div>
                <BlockTokenName isLightTheme={theme}>{item.token1.name}</BlockTokenName>
              </BlockTokens>
              <ModalInput
                value={outValue}
                isLightTheme={theme}
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
              {/*<Balance isLightTheme={theme}>{`Balance: ${5}`}</Balance>*/}
            </InputBlock>
            {/*input-------------------->*/}
            <LinksContainer>
              <ModalLink isLightTheme={theme} onClick={slippageHandler} href={'#'}>
                {'Transaction speed'}
              </ModalLink>
              <ModalLinkRight onClick={slippageHandler} isLightTheme={theme} href={'#'}>
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
            {gasPricesWithIcons.map((option) => (
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
          {/*//TODO:slippageTolerance (doesn't implemented yet)*/}
          {/*<div style={{ display: 'flex', justifyContent: 'center' }}>*/}
          {/*  <CommonSubmitButton*/}
          {/*    width={'189px'}*/}
          {/*    isLightTheme={theme}*/}
          {/*    // onClick={() => {*/}
          {/*    //   setIsModalVisible('advancedSettings');*/}
          {/*    // }}*/}
          {/*  >*/}
          {/*    {'Advanced settings'}*/}
          {/*  </CommonSubmitButton>*/}
          {/*</div>*/}
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
            <AprName isLightTheme={theme}>Weekly</AprName>
            <AprValue color="#00DFD1">
              +
              {(((parseInt(item.volumeUSD) * 0.003) / parseInt(item.reserveUSD)) * 100 * 7).toFixed(
                2
              )}
              %
            </AprValue>
          </AprBlock>
          <AprBlock>
            <AprName isLightTheme={theme}>Yearly</AprName>
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
          <CommonSubmitButton isLightTheme={theme} id="Add Liquidity" onClick={switchModal}>
            {'Invest'}
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
