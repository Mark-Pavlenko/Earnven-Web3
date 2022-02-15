//uniV2 invest functions
//----------------------------------------------------------------->
//*first input value sends to smartContract
import ERC20ABI from '../../abi/ERC20.json';
import OneClickLiquidity from '../../abi/UniV2PoolsOneClick.json';
import Addresses from '../../contractAddresses';
import ROUTERABI from '../../abi/UniRouterV2.json';

export const addLiquidityUniV2 = async (tokenA, tokenB, supplyToken, supplyTokenQtty) => {
  await loadWeb3();
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  var tokenContract = new web3.eth.Contract(ERC20ABI, supplyToken);
  const oneClickContract = new web3.eth.Contract(
    OneClickLiquidity,
    Addresses.oneClickUniV2Contract
  );
  await tokenContract.methods
    .approve(Addresses.oneClickUniV2Contract, supplyTokenQtty)
    .send({ from: accounts[0] });
  await oneClickContract.methods
    .addLiquidityOneClick(tokenA, tokenB, supplyToken, supplyTokenQtty)
    .send({ from: accounts[0] });
};

//*two inputs value send to smartContract
export const addLiquidityNormalUniV2 = async (tokenA, tokenB, amountTokenA, amountTokenB) => {
  const start = parseInt(Date.now() / 1000) + 180;
  await loadWeb3();
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  var tokenAContract = new web3.eth.Contract(ERC20ABI, tokenA);
  var tokenBContract = new web3.eth.Contract(ERC20ABI, tokenB);
  await tokenAContract.methods
    .approve(Addresses.uniRouter, web3.utils.toWei(amountTokenA, 'ether'))
    .send({ from: accounts[0] });
  await tokenBContract.methods
    .approve(Addresses.uniRouter, web3.utils.toWei(amountTokenB, 'ether'))
    .send({ from: accounts[0] });
  const UniRouter = new web3.eth.Contract(ROUTERABI, Addresses.uniRouter);
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
};
//----------------------------------------------------------------->

//sushiV2 invest functions
//----------------------------------------------------------------->
//*********first input value sends to smartContract
export const addLiquiditySushiV2 = async (
  tokenA,
  tokenB,
  supplyToken,
  supplyTokenQtty,
  gasPrice,
  slippage
) => {
  //we need to get as a parameter 'slippage'. It will be percent. We takes supplyTokenQtty and subtract slippage
  //(ExpectedAmountTokens - slippage) then we have amount below for this percent. This is protection from exchange rate
  // fluctuations. Then we put this value to contract like this:
  // const minAmountOut = ExpectedAmountTokens - slippage.
  // minAmountOut we will send to contract.
  await loadWeb3();
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  var tokenContract = new web3.eth.Contract(ERC20ABI, supplyToken);
  const oneClickContract = new web3.eth.Contract(
    OneClickLiquidity,
    Addresses.oneClickSushiV2Contract
  );
  await tokenContract.methods
    .approve(Addresses.oneClickSushiV2Contract, supplyTokenQtty)
    .send({ from: accounts[0], gasPrice: web3.utils.toWei(gasPrice, 'gwei') });
  await oneClickContract.methods
    //.addLiquidityOneClick(tokenA, tokenB, supplyToken, supplyTokenQtty, minAmountOut) //examle of sending minAmountOut to contract
    .addLiquidityOneClick(tokenA, tokenB, supplyToken, supplyTokenQtty)
    .send({ from: accounts[0], gasPrice: web3.utils.toWei(gasPrice, 'gwei') });
};

//********two inputs value send to smartContract
export const addLiquidityNormalSushiV2 = async (
  tokenA,
  tokenB,
  amountTokenA,
  amountTokenB,
  gasPrice
) => {
  const start = parseInt(Date.now() / 1000) + 180;
  await loadWeb3();
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  var tokenAContract = new web3.eth.Contract(ERC20ABI, tokenA);
  var tokenBContract = new web3.eth.Contract(ERC20ABI, tokenB);
  await tokenAContract.methods
    .approve(Addresses.sushiRouter, web3.utils.toWei(amountTokenA, 'ether'))
    .send({ from: accounts[0], gasPrice: web3.utils.toWei(gasPrice, 'gwei') });
  await tokenBContract.methods
    .approve(Addresses.sushiRouter, web3.utils.toWei(amountTokenB, 'ether'))
    .send({ from: accounts[0], gasPrice: web3.utils.toWei(gasPrice, 'gwei') });
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
};
//----------------------------------------------------------------->
