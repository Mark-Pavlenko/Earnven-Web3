import BatchCall from 'web3-batch-call';
import mStableContractABI from '../../../../abi/mStableContract.json';
import mStableUnderlyingContractABI from '../../../../abi/mStableUnderlyingTokenContract.json';
import mStablePoolABI from '../../../../abi/mStablePool.json';
import mStableStakedABI from '../../../../abi/mStableStaked.json';
import axios from 'axios';

export const getMStableStakedata = async (attributes) => {
  //batch-call process starts
  //configuration
  //set the request scheme with array of objects
  const contracts = [
    {
      namespace: 'mStableStaking', //Namespace will be used to group contract results
      // list of contract address that need to look
      addresses: [
        '0x78BefCa7de27d07DC6e71da295Cc2946681A6c7B', //imUSD
        '0xF38522f63f40f9Dd81aBAfD2B8EFc2EC958a3016', //imBTC
        '0x8f2326316ec696f6d023e37a9931c2b2c177a3d7', //staked MTA(stkMTA)
        '0xeFbe22085D9f29863Cfb77EEd16d3cC0D927b011', //Staked BPT(stkBPT)
      ],
      // Specify an ABI to use for all addresses in this contract config
      abi: mStableContractABI,
      allReadMethods: false,
      // set the read methods/Array of methods with custom arguments
      readMethods: [
        {
          name: 'rawBalanceOf', //method name
          args: [attributes.accountAddress], //list of args that method need/expecting - here its userAddress
        },
        {
          name: 'earned',
          args: [attributes.accountAddress],
        },
        {
          name: 'stakingToken',
          args: [],
        },
        {
          name: 'getRewardToken',
          args: [],
        },
      ],
    },
  ];
  //--------set the batch call request-----------------------//
  //get the web3 instance provider
  const instance = {
    web3: attributes.web3,
  };
  // call the batchcall by passing the args with web3 instance
  const batchCall = new BatchCall(instance);
  //exeucte the batchCall by passing configure contracts to get the result of it
  const result = await batchCall.execute(contracts);

  //console.log('TestmStable data from batchcall data lenght', result.length);
  let dataResult = [];

  //let stakingTokenAddress;
  for (let i = 0; i < result.length; i++) {
    let object = {};
    let exchangeRate;
    let symbol;
    let currentprice;
    let imageUrl;

    //get other attributes by calling for its resptive staking/Reward token

    if (parseFloat(result[i].rawBalanceOf[0].value) != 0) {
      const stakingTokenAddress = result[i].stakingToken[0].value;

      if (stakingTokenAddress) {
        const mStableStakingContract = new attributes.web3.eth.Contract(
          mStableUnderlyingContractABI,
          stakingTokenAddress
        );
        object.price = (await mStableStakingContract.methods.exchangeRate().call()) / 10 ** 18;
        object.symbol = await mStableStakingContract.methods.symbol().call();
        object.tokenImage = 'https://assets.coingecko.com/coins/images/13696/thumb/imUSD.png';
      }

      //if staked MTA token address then get the MTA token price and image for further calc.
      if (result[i].address == '0x8f2326316ec696f6d023e37a9931c2b2c177a3d7') {
        const coinData = await axios.get(
          `https://api.coingecko.com/api/v3/coins/ethereum/contract/${result[i].getRewardToken[0].value}`
        );
        object.price = coinData.data.market_data.current_price.usd;
        object.tokenImage = coinData.data.image.thumb;
        object.symbol = 'MTA';
      }
    }

    //if staked BPT then look for the respective smart contract to get the pool rate
    if (result[i].address == '0xeFbe22085D9f29863Cfb77EEd16d3cC0D927b011') {
      const mtaWethPool = new attributes.web3.eth.Contract(
        mStablePoolABI,
        '0xe2469f47aB58cf9CF59F9822e3C5De4950a41C49' //mStable MTA/WETH Staking BPT (mBPT)
      );

      object.price = (await mtaWethPool.methods.getRate().call()) / 10 ** 18;
      object.tokenImage =
        'https://assets.coingecko.com/coins/images/11846/thumb/mStable.png?1594950533';
      object.symbol = 'MTA/WETH';
    }

    object.balance = result[i].rawBalanceOf[0].value
      ? result[i].rawBalanceOf[0].value / 10 ** 18
      : 0;
    object.value = object.balance * parseFloat(object.price).toFixed(2);
    object.claimable = result[i].earned[0].value ? result[i].earned[0].value / 10 ** 18 : 0;
    object.chain = 'Ethereum';
    object.protocol = 'mStable';

    if (object.balance > 0) {
      dataResult.push(object);
    }
  } //end of loop

  return dataResult;
};
