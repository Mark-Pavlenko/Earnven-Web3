import axios from 'axios';

//call the below url to get the user releated information that holds the curveLp tokens
export const getAddressInfo = async (accountAddress) => {
  const response = await axios.get(
    `https://api.ethplorer.io/getAddressInfo/${accountAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
  );
  return response.data;
};

export const getCreamData = async (
  accountAddress,
  CreamABI,
  CreamIronBankAddress,
  coingecko_contract_address,
  web3
) => {
  const IronBankContract = new web3.eth.Contract(CreamABI, CreamIronBankAddress);
  const IronBankAmount = await IronBankContract.methods.balanceOf(accountAddress).call();
  const CreamSymbol = await IronBankContract.methods.symbol().call();
  const CreamDecimal = await IronBankContract.methods.decimals().call();
  const CreamTokenName = await IronBankContract.methods.name().call();
  let decimals;
  let object = {};
  switch (CreamSymbol) {
    case 'cyUSDT':
      decimals = 10 ** 10;
      break;
    case 'cyDAI':
      decimals = 10 ** 10;
      break;
    case 'cyLINK':
      decimals = 10 ** 14;
      break;
    case 'cyYFI':
      decimals = 10 ** 13;
      break;
    default:
      decimals = 10 ** 10;
  }
  const tokenAmount = IronBankAmount / decimals;
  if (tokenAmount > 0) {
    await axios
      .get(`${coingecko_contract_address}`, {}, {})
      .then(async ({ data }) => {
        const tokenPrice = data.market_data.current_price.usd;
        const IronBankUSDPrice = (tokenAmount * tokenPrice).toFixed(2);
        if (IronBankUSDPrice > 0) {
          object.tokenName = CreamTokenName;
          object.symbol = CreamSymbol;
          object.value = IronBankUSDPrice;
          object.totalValue = parseFloat(IronBankUSDPrice);
          object.tokenImage = data.image.thumb;
          object.price = tokenPrice;
          object.balance = tokenAmount;
          object.protocol = 'Cream Iron Bank';
          object.chain = 'Ethereum';
        }
      })
      .catch((err) => {
        console.log('Error Message message', err);
      });
  }

  return object;
};
