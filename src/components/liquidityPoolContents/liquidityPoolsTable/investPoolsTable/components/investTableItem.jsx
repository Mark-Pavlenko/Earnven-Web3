import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Select from 'react-select';
import {
  addIconsGasPrices,
  numberWithCommas,
} from '../../../../../commonFunctions/commonFunctions';
import { SelectWrapper } from '../../../styledComponents';
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
  TokenImages,
  ItemButtons,
  TokensValue,
  ResetButton,
  BalanceValue,
  LiquidityValue,
  MyPoolsItemButton,
  MenuPopoverBoxTitle,
} from '../styledComponents';
import { SvgComponent } from '../../../svgComponent/svgComponent';
import ModalContainer from '../../../../common/modalContainer/modalContainer';
import {
  Balance,
  ModalLink,
  ModalInput,
  InputBlock,
  ChangeToken,
  SelectTitle,
  BlockTokens,
  ButtonsBlock,
  DividerBlock,
  LinksContainer,
  ModalLinkRight,
  BlockTokenName,
  SupplyTokenButton,
} from '../../../uniV2/StyledComponents';
import { data } from '../../../../../globalStore';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Addresses from '../../../../../contractAddresses';
import ROUTERABI from '../../../../../abi/UniRouterV2.json';
import actionTypes from '../../../../../constants/actionTypes';
import { GasMenuItem } from '../../../../gasDropDownMenu/styles';
import TOKENDECIMALSABI from '../../../../../abi/TokenDecomals.json';
import fastDice from '../../../../../assets/icons/fastDice-icon.svg';
import slowDice from '../../../../../assets/icons/slowDice-icon.svg';
import { SelectOptionsWithJSX } from '../../../HOC/selectOptionsWithJSX';
import middleDice from '../../../../../assets/icons/middleDice-icon.svg';
import { GasPriceLabel } from '../../liquidityPoolsTable/styledComponents';
import { CommonSubmitButton } from '../../../../../screens/TokenPage/components/styledComponentsCommon';
import { LoadingSpinner } from '../../../../../screens/dashboard/styledComponents';
import CircularProgress from '@mui/material/CircularProgress';

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
  const currentWallet = JSON.parse(localStorage.getItem('mywallet'));

  const gasPricesWithIcons = addIconsGasPrices(GasPrices, fastDice, middleDice, slowDice, theme);

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
  const [tokenSwapError, setTokenSwapError] = useState(false);
  const [firstInputIsLoading, setFirstInputIsLoading] = useState(false);
  const [secondInputIsLoading, setSecondInputIsLoading] = useState(false);

  const selectInitialValue = {
    label: 'Ethereum',
    value: 'Ethereum',
  };

  useEffect(() => {
    const getBalance = async () => {
      await loadWeb3();
      const web3 = window.web3;
      //const accounts = await web3.eth.getAccounts();
      const getBalance = await web3.eth.getBalance(currentWallet[0].address);
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
      //UNISWAP V2 contract address
      item.protocol === 'Sushiswap' ? Addresses.sushiRouter : Addresses.uniRouter
    );

    if (!isNaN(Number(value)) && value !== '') {
      if (inputId === 'firstInput') {
        setFirstInputIsLoading(true);
        let valueWithDecimal = value;
        for (let i = 0; i < tokenDecimal1; i++) {
          valueWithDecimal += 0;
        }
        const convertedValue = await NewContract.methods
          .getAmountsOut(valueWithDecimal, [token1, token2])
          .call()
          .catch(() => {});
        setAddLiquidityNormalTokenA((value * 10 ** tokenDecimal1).toString());
        setAddLiquidityNormalTokenB(convertedValue[1]);

        setOutValue(+convertedValue[1] / 10 ** tokenDecimal2);
        setInValue(value);
        setFirstInputIsLoading(false);
      }
      if (inputId === 'secondInput') {
        setSecondInputIsLoading(true);
        let valueWithDecimal = value;
        for (let i = 0; i < tokenDecimal2; i++) {
          valueWithDecimal += 0;
        }
        const convertedValue = await NewContract.methods
          .getAmountsIn(valueWithDecimal, [token1, token2])
          .call()
          .catch(() => {});
        if (convertedValue) {
          setAddLiquidityNormalTokenA(convertedValue[0]);
          setAddLiquidityNormalTokenB((value * 10 ** tokenDecimal2).toString());

          setInValue(+convertedValue[0] / 10 ** tokenDecimal1);
          setOutValue(value);
        }
      }
      setSecondInputIsLoading(false);
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
      setFirstInputIsLoading(true);
      setSecondInputIsLoading(true);
      const convertedValue1 = await NewContract.methods
        .getAmountsOut((tokenValueHalf * 10 ** tokenDecimal).toString(), [tokenAddress, token1])
        .call()
        .catch((e) => {
          setTokenSwapError(true);
        });

      if (convertedValue1?.[1]?.length) {
        setInValue(+convertedValue1[1] / 10 ** tokenDecimalPair1);
      }
      setFirstInputIsLoading(false);
      setSecondInputIsLoading(false);
    } else {
      setInValue(tokenValueHalf.toString());
    }

    if (tokenAddress !== token2) {
      setFirstInputIsLoading(true);
      setSecondInputIsLoading(true);
      const convertedValue2 = await NewContract.methods
        .getAmountsOut((tokenValueHalf * 10 ** tokenDecimal).toString(), [tokenAddress, token2])
        .call()
        .catch((e) => {
          setTokenSwapError(true);
        });

      if (convertedValue2?.[1]?.length) {
        setOutValue(+convertedValue2[1] / 10 ** tokenDecimalPair2);
      }
      setFirstInputIsLoading(false);
      setSecondInputIsLoading(false);
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

  const inputBox = document.getElementById('inputBox');

  const invalidChars = ['-', '+', 'e'];

  inputBox?.addEventListener('keydown', function (e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });

  return (
    <>
      {/*MODAL addLiquidity====================================>*/}
      {isModalVisible === 'addLiquidity' && (
        <ModalContainer
          tokenSwapError={tokenSwapError}
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
              onChange={(e) => {
                supplyTokenHandler(e);
                setSingleTokenValue('');
                setInValue('');
                setOutValue('');
                setTokenSwapError(false);
              }}
            />
            <InputBlock>
              <ModalInput
                isLightTheme={theme}
                id="inputBox"
                value={singleTokenValue}
                type="number"
                onChange={(e) => {
                  if (e.target.value.length > 0 && e.target.value !== 0) {
                    addLiquidityToPair(
                      item.poolDetails.token0Address,
                      item.poolDetails.token1Address,
                      e.target.value
                    ).catch((res) => res);
                  } else {
                    setTokenSwapError(false);
                  }
                  setSingleTokenValue(e.target.value);
                  setInputType('single');
                }}
              />
              <Balance isLightTheme={theme}>{`Balance: ${
                parseFloat(supplyTokenBalance) > 0
                  ? parseFloat(supplyTokenBalance).toFixed(8)
                  : '0.00'
              }`}</Balance>
            </InputBlock>
            <DividerBlock>
              <ChangeToken isLightTheme={theme}>{'Or'}</ChangeToken>
            </DividerBlock>
            <SelectTitle isLightTheme={theme}>{'Supply a token'}</SelectTitle>
            {/*input-------------------->*/}
            <InputBlock style={{ position: 'relative' }}>
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
                    e.target.value,
                    item.poolDetails.token0Address,
                    item.poolDetails.token1Address
                  );
                  setInputType('pair');
                }}
                type="number"
                onFocus={() => {
                  setOutValue('');
                  setSingleTokenValue('');
                  setTokenSwapError(false);
                }}
              />
              {firstInputIsLoading && (
                <div style={{ position: 'absolute', left: '85%', top: '55px' }}>
                  <LoadingSpinner>
                    <CircularProgress size={22} />
                  </LoadingSpinner>
                </div>
              )}
            </InputBlock>
            {/*input-------------------->*/}
            {/*input-------------------->*/}
            <InputBlock style={{ position: 'relative' }}>
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
                    e.target.value,
                    item.poolDetails.token0Address,
                    item.poolDetails.token1Address
                  );
                  setInputType('pair');
                }}
                type="number"
                onFocus={() => {
                  setInValue('');
                  setSingleTokenValue('');
                  setTokenSwapError(false);
                }}
              />
              {secondInputIsLoading && (
                <div style={{ position: 'absolute', left: '85%', top: '71px' }}>
                  <LoadingSpinner>
                    <CircularProgress size={22} />
                  </LoadingSpinner>
                </div>
              )}
            </InputBlock>
            {/*input-------------------->*/}
            <LinksContainer>
              <ModalLink isLightTheme={theme} onClick={slippageHandler} href={'#'}>
                {'Transaction speed'}
              </ModalLink>
              <ModalLinkRight isLightTheme={theme} onClick={slippageHandler} href={'#'}>
                {`${selectedGasPrice.length > 0 ? selectedGasPrice : proposeGasPrice} Gwei`}
              </ModalLinkRight>
            </LinksContainer>
            <ButtonsBlock>
              <SupplyTokenButton
                disabled={tokenSwapError}
                isLightTheme={theme}
                onClick={
                  !tokenSwapError ? inputsHandler : () => {}
                }>{`Supply tokens`}</SupplyTokenButton>
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
                onClick={() => {
                  updateGasValue(option.value, option.label);
                }}
                selected={option.label === selected}
                sx={{ py: 1, px: 2.5 }}>
                <GasMenuItem isLightTheme={theme} selected={option.label === selected}>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <img src={option.icon} alt="" />
                    <GasPriceLabel
                      style={
                        option.label === selected ? { color: '#4453AD' } : { color: 'inherit' }
                      }>{`${option.label}`}</GasPriceLabel>
                  </div>
                  <div>
                    <span>{`${option.value} Gwei`}</span>
                  </div>
                </GasMenuItem>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
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
            <AprName isLightTheme={theme}>{'Weekly'}</AprName>
            <AprValue color="#00DFD1">
              +{(((parseInt(item.volume) * 0.003) / parseInt(item.liquidity)) * 100 * 7).toFixed(2)}
              %
            </AprValue>
          </AprBlock>
          <AprBlock>
            <AprName isLightTheme={theme}>{'Yearly'}</AprName>
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
          <MyPoolsItemButton
            style={{ gridArea: 'invest' }}
            isLightTheme={theme}
            id="Add Liquidity"
            onClick={switchModal}>
            {'Invest'}
          </MyPoolsItemButton>
          <MyPoolsItemButton
            style={{ gridArea: 'withdraw' }}
            isLightTheme={theme}
            id="Withdraw Liquidity"
            onClick={(e) => {
              switchModal(e);
              setIsWithdrawActive(true);
            }}>
            {'Withdraw'}
          </MyPoolsItemButton>
          {item.protocol === 'Sushiswap' ? (
            <Link
              to={`/${address}/sushiswap/address/${item.poolDetails.token0Address}/${item.poolDetails.token1Address}/${item.token0Symbol}/${item.token1Symbol}`}>
              <InfoButton style={{ gridArea: 'info' }} isLightTheme={theme}>
                {theme ? <SvgComponent color="#4453AD" /> : <SvgComponent color="white" />}
              </InfoButton>
            </Link>
          ) : (
            <Link
              to={`/${address}/uniswap/address/${item.poolDetails.token0Address}/${item.poolDetails.token1Address}`}>
              <InfoButton style={{ gridArea: 'info' }} isLightTheme={theme}>
                {theme ? <SvgComponent color="#4453AD" /> : <SvgComponent color="white" />}
              </InfoButton>
            </Link>
          )}
        </ItemButtons>
      </TableItem>
    </>
  );
};
