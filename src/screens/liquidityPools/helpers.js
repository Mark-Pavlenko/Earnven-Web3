import ERC20ABI from '../../abi/ERC20.json';
import OneClickLiquidity from '../../abi/UniV2PoolsOneClick.json';
import Addresses from '../../contractAddresses';
import ROUTERABI from '../../abi/UniRouterV2.json';
import Web3 from 'web3';
import FACTORYABI from '../../abi/UniFactoryV2.json';

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

//----------------------------------------------------------------->
//*********first input value sends to smartContract
export const addLiquidity = async (
  tokenA,
  tokenB,
  supplyToken,
  supplyTokenQtty,
  gasPrice,
  // slippage,
  protocolType
) => {
  console.log('HELPERS addLiquidity works and get protocol type ===>', protocolType);
  //we need to get as a parameter 'slippage'. It will be percent. We takes supplyTokenQtty and subtract slippage
  //(ExpectedAmountTokens - slippage) then we have amount below for this percent. This is protection from exchange rate
  // fluctuations. Then we put this value to contract like this:
  // const minAmountOut = ExpectedAmountTokens - slippage.
  // minAmountOut we will send to contract.
  const contract =
    protocolType === 'Sushiswap'
      ? Addresses.oneClickSushiV2Contract
      : Addresses.oneClickUniV2Contract;
  await loadWeb3();
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  var tokenContract = new web3.eth.Contract(ERC20ABI, supplyToken);
  const oneClickContract = new web3.eth.Contract(OneClickLiquidity, contract);
  await tokenContract.methods
    .approve(contract, supplyTokenQtty)
    .send({ from: accounts[0], gasPrice: web3.utils.toWei(gasPrice, 'gwei') });
  await oneClickContract.methods
    //.addLiquidityOneClick(tokenA, tokenB, supplyToken, supplyTokenQtty, minAmountOut) //examle of sending minAmountOut to contract
    .addLiquidityOneClick(tokenA, tokenB, supplyToken, supplyTokenQtty)
    .send({ from: accounts[0], gasPrice: web3.utils.toWei(gasPrice, 'gwei') });
};

//********two inputs value send to smartContract
export const addLiquidityNormal = async (
  tokenA,
  tokenB,
  amountTokenA,
  amountTokenB,
  gasPrice,
  protocolType
) => {
  console.log('HELPERS addLiquidityNormal works and get protocol type ===>', protocolType);
  const routerAddress = protocolType === 'Sushiswap' ? Addresses.sushiRouter : Addresses.uniRouter;
  const start = parseInt(Date.now() / 1000) + 180;
  await loadWeb3();
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  var tokenAContract = new web3.eth.Contract(ERC20ABI, tokenA);
  var tokenBContract = new web3.eth.Contract(ERC20ABI, tokenB);
  await tokenAContract.methods
    .approve(routerAddress, web3.utils.toWei(amountTokenA, 'ether'))
    .send({ from: accounts[0], gasPrice: web3.utils.toWei(gasPrice, 'gwei') });
  await tokenBContract.methods
    .approve(routerAddress, web3.utils.toWei(amountTokenB, 'ether'))
    .send({ from: accounts[0], gasPrice: web3.utils.toWei(gasPrice, 'gwei') });
  const router = new web3.eth.Contract(ROUTERABI, routerAddress);
  await router.methods
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
};
//----------------------------------------------------------------->

//*********first input value sends to smartContract for removing tokens
export const removeLiquidity = async (
  tokenA,
  tokenB,
  receiveToken,
  liquidityAmount,
  gasPrice,
  protocolType
) => {
  await loadWeb3();
  const factory = protocolType === 'Sushiswap' ? Addresses.sushiFactory : Addresses.uniFactory;
  const contract =
    protocolType === 'Sushiswap'
      ? Addresses.oneClickSushiV2Contract
      : Addresses.oneClickUniV2Contract;
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  var FactoryContract = new web3.eth.Contract(FACTORYABI, factory);
  var pairAddress = await FactoryContract.methods.getPair(tokenA, tokenB).call();
  var PairContract = new web3.eth.Contract(ERC20ABI, pairAddress);
  const oneClickContract = new web3.eth.Contract(OneClickLiquidity, contract);
  await PairContract.methods.approve(contract, liquidityAmount).send({ from: accounts[0] });
  await oneClickContract.methods
    .removeLiquidityOneClick(tokenA, tokenB, receiveToken, liquidityAmount)
    .send({ from: accounts[0] });
};

//********two inputs value send to smartContract to remove tokens
export const removeLiquidityNormal = async (
  tokenA,
  tokenB,
  LiquidityAmount,
  gasPrice,
  protocolType
) => {
  const start = parseInt(Date.now() / 1000) + 180;
  await loadWeb3();
  const factory = protocolType === 'Sushiswap' ? Addresses.sushiFactory : Addresses.uniFactory;
  const router = protocolType === 'Sushiswap' ? Addresses.sushiRouter : Addresses.uniRouter;
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  var FactoryContract = new web3.eth.Contract(FACTORYABI, factory);
  var pairAddress = await FactoryContract.methods.getPair(tokenA, tokenB).call();
  var PairContract = new web3.eth.Contract(ERC20ABI, pairAddress);
  const Router = new web3.eth.Contract(ROUTERABI, router);
  await PairContract.methods.approve(router, LiquidityAmount).send({ from: accounts[0] });
  await Router.methods
    .removeLiquidity(tokenA, tokenB, LiquidityAmount, 0, 0, accounts[0], start.toString())
    .send({ from: accounts[0] });
};
