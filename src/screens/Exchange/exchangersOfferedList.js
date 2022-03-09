import balancerExchangerIcon from '../../assets/icons/exchangers/balancerExchangerIcon.svg';
import bancorExchangerIcon from '../../assets/icons/exchangers/bancorExchangerIcon.svg';
import curveExchangerIcon from '../../assets/icons/exchangers/curveExchangerIcon.svg';
import dodoExchangerIcon from '../../assets/icons/exchangers/dodoExchangerIcon.svg';
import eth2DaiExchangerIcon from '../../assets/icons/exchangers/eth2DaiExchangerIcon.png';
import kyberExchangerIcon from '../../assets/icons/exchangers/kyberExchangerIcon.svg';
import multiBridgeExchangerIcon from '../../assets/icons/exchangers/miltiBridgeExchangerIcon.svg';
import mooniswapExchangerIcon from '../../assets/icons/exchangers/mooniswapExchangerIcon.png';
import mStableExchangerIcon from '../../assets/icons/exchangers/mStableExchangerIcon.svg';
import shellExchangerIcon from '../../assets/icons/exchangers/shellExchangerIcon.svg';
import swerveExchangerIcon from '../../assets/icons/exchangers/swerveExchangerIcon.png';
import zeroExchangeIcon from '../../assets/icons/exchangers/0xExchangerIcon.svg';
import sushiSwapExchangerIcon from '../../assets/icons/exchangers/sushiSwapExchangerIcon.svg';
import uniswapV2ExchangerIcon from '../../assets/icons/exchangers/uniswapV2ExchangerIcon.svg';

const exchangersOfferedList = [
  {
    name: 'UniSwap',
    routerAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    receiveTokenUSDCurrencyCourse: '3510 DAI ($3510.03)',
    gasFee: '$10.03',
    isBestRate: true,
    logoIcon: uniswapV2ExchangerIcon,
    isExchangerSelected: true,
  },
  {
    name: 'SushiSwap',
    routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    receiveTokenUSDCurrencyCourse: '3510 DAI ($3510.03)',
    gasFee: '$10.03',
    isBestRate: false,
    logoIcon: sushiSwapExchangerIcon,
    isExchangerSelected: false,
  },
  {
    name: 'Test exchanger',
    routerAddress: '0x1basdsadasdsad',
    receiveTokenUSDCurrencyCourse: '3510 DAI ($3510.03)',
    gasFee: '$10.03',
    isBestRate: false,
    logoIcon: sushiSwapExchangerIcon,
    isExchangerSelected: false,
  },
];

export default exchangersOfferedList;
