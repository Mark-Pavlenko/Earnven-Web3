import BatchCall from 'web3-batch-call';
import AlchemixABI from '../../../../abi/AlchemixFinance.json';
import axios from 'axios';

export const getAlxData = async (attributes) => {
  //batch-call process starts
  //configuration
  //set the request scheme with array of objects
  const contracts = [
    {
      namespace: 'AlxFinance', //Namespace will be used to group contract results
      // list of contract address that need to look
      addresses: [
        '0xab8e74017a8cc7c15ffccd726603790d26d7deca', //Alchemix Finance: Staking Pool
      ],
      // Specify an ABI to use for all addresses in this contract config
      abi: AlchemixABI,
      allReadMethods: false,
      // set the read methods/Array of methods with custom arguments
      readMethods: [
        {
          name: 'getStakeTotalDeposited', //Alchemix USD (alUSD)
          args: [attributes.accountAddress, 0],
        },
        {
          name: 'getStakeTotalDeposited', //method name
          args: [attributes.accountAddress, 1], //list of args that method need/expecting - here its userAddress
        },
        {
          name: 'getStakeTotalDeposited', //method name
          args: [attributes.accountAddress, 2], //list of args that method need/expecting - here its userAddress
        },
        {
          name: 'getStakeTotalDeposited', //method name
          args: [attributes.accountAddress, 3], //list of args that method need/expecting - here its userAddress
        },
        {
          name: 'getStakeTotalDeposited', //method name
          args: [attributes.accountAddress, 4], //list of args that method need/expecting - here its userAddress
        },
        {
          name: 'getStakeTotalDeposited', //method name
          args: [attributes.accountAddress, 5], //list of args that method need/expecting - here its userAddress
        },
        {
          name: 'getStakeTotalDeposited', //method name
          args: [attributes.accountAddress, 6], //list of args that method need/expecting - here its userAddress
        },
        {
          name: 'getStakeTotalDeposited', //method name
          args: [attributes.accountAddress, 7], //list of args that method need/expecting - here its userAddress
        },
        {
          name: 'getStakeTotalDeposited', //method name
          args: [attributes.accountAddress, 8], //list of args that method need/expecting - here its userAddress
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

  let dataResult = [];

  //get the Alchemix token image and price from coingecko
  try {
    const coinData = await axios.get(
      'https://api.coingecko.com/api/v3/coins/ethereum/contract/0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF'
    );
    let alxPrice = coinData.data.market_data.current_price.usd;
    let tokenImage = coinData.data.image.thumb;

    //let stakingTokenAddress;
    //max length token can store upto 9 ( 0 -8)
    for (let i = 0; i < 9; i++) {
      let object = {};
      //get other attributes by calling for its resptive staking/Reward token
      //get the stakeTotalDeposited from the above contract and get their respective symbol
      if (parseFloat(result[0].getStakeTotalDeposited[i].value) != 0) {
        if (i == 0) {
          object.symbol = 'alUSD';
          object.balance = result[0].getStakeTotalDeposited[i].value / 10 ** 18;
          object.price = alxPrice;
          object.value = object.balance * object.price;
        } else if (i == 1) {
          object.symbol = 'ALCX';
          object.balance = result[0].getStakeTotalDeposited[i].value / 10 ** 18;
          object.price = alxPrice;
          object.value = object.balance * object.price;
        } else if (i == 2) {
          object.symbol = 'SLP';
          object.balance = result[0].getStakeTotalDeposited[i].value / 10 ** 18;
          object.price = alxPrice;
          object.value = object.balance * object.price;
        } else if (i == 3) {
          object.symbol = 'TIME';
          object.balance = result[0].getStakeTotalDeposited[i].value / 10 ** 18;
          object.price = alxPrice;
          object.value = object.balance * object.price;
        } else if (i == 4) {
          object.symbol = 'alUSD3CRV';
          object.balance = result[0].getStakeTotalDeposited[i].value / 10 ** 18;
          object.price = alxPrice;
          object.value = object.balance * object.price;
        } else if (i == 5) {
          object.symbol = 'POOL';
          object.balance = result[0].getStakeTotalDeposited[i].value / 10 ** 18;
          object.price = alxPrice;
          object.value = object.balance * object.price;
        } else if (i == 6) {
          object.symbol = 'saddlealETH';
          object.balance = result[0].getStakeTotalDeposited[i].value / 10 ** 18;
        } else if (i == 7) {
          object.symbol = 'alETH+ETH';
          object.balance = result[0].getStakeTotalDeposited[i].value / 10 ** 18;
          object.price = alxPrice;
          object.value = object.balance * object.price;
        } else if (i == 8) {
          object.symbol = 'tALCX';
          object.balance = result[0].getStakeTotalDeposited[i].value / 10 ** 18;
          object.price = alxPrice;
          object.value = object.balance * object.price;
        }
        object.tokenImage = tokenImage;
        object.chain = 'Ethereum';
        object.protocol = 'Alchemix';
      }
      if (object.balance > 0) {
        dataResult.push(object);
      }
    }
    return dataResult;
  } catch (err) {
    console.log('Error log- In alchemix data fetch coingecko API', err.message);
    return false;
  }
};
