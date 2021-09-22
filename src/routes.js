import { Navigate, useRoutes } from 'react-router-dom'
// import { BrowserRouter , Routes, Route, Link } from 'react-router-dom'
import Landing from './screens/landingPage'
import PageNotFound from './screens/PageNotFound'
import AppLayout from './layout/app'
import Dashboard from './screens/dashboard/dashboard'
import History from './screens/History'
import DefiMadeEasy from './screens/DefiMadeEasy'
import Bridge from './screens/Bridge'
import Multisender from './screens/MultiSender'
import SafeFarm from './screens/safeFarms/safefarm'
import Trading from './screens/Exchange/exchange'
// import TestingPage from './screens/testingPage';
import AllAssetsPage from './screens/AllAssetsPage'
import TokenDetailsPage from './components/tokenDetails'
import NFTpage from './screens/NFTpage'
import NFTTokenPage from './components/NFTTokenPage'
import ConnectWallet from './components/ConnectWallet'
import AllTokensApprovals from './screens/allTokensApprovals'
import TokenApproval from './screens/tokenApproval'
import CubicleGraphs from './screens/chartsCubicle'
import LiquidityPools from './screens/liquidityPools'
import NFT from './screens/NFT'
import NftDetails from './screens/NftDetail'
import Home from './screens/Home'
import YieldFarm from './screens/YieldFarm'
import Savings from './screens/Savings'
import Airdrop from './screens/AirDrop'
import Swapping from './screens/TestSwapping/Swapping'
import HomeScreen from './container/home/HomeScreen'
import TokenCreator from './screens/TokenCreator'
import UniswapLiquidityPool from './components/liquidityPoolDetails/Index'
import UniswapPoolDetail from './components/liquidityPoolDetails/DetailLoadPage'
import SushiwapLiquidityPool from './components/sushiSwapPoolDetails/Index'
import SushiswapPoolDetail from './components/sushiSwapPoolDetails/DetailLoadPage'

export default function Router() {
  // return(
  //         <Routes>
  //             {/* <AppLayout/> */}
  //             <Route exact path="/lol" render={<></>} />
  //         </Routes>
  // )

  return useRoutes([
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '/:address',
      element: <AppLayout />,
      children: [
        { path: '/', element: <Navigate to="/:address/dashboard" replace /> },
        { path: 'home', element: <Home /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'liquiditypools', element: <LiquidityPools /> },
        { path: 'yieldfarm', element: <YieldFarm /> },
        { path: 'savings', element: <Savings /> },
        { path: 'history', element: <History /> },
        { path: 'defimadeasy', element: <DefiMadeEasy /> },
        { path: 'assets', element: <AllAssetsPage /> },
        { path: 'token/:tokenid', element: <TokenDetailsPage /> },
        {
          path: 'uniswap/address/:token0/:token1',
          element: <UniswapLiquidityPool />,
        },
        { path: 'uniswap/pair/:tokenid', element: <UniswapPoolDetail /> },
        {
          path: 'sushiswap/address/:token0/:token1',
          element: <SushiwapLiquidityPool />,
        },

        {
          path: 'sushiswap/pair/:tokenid',
          element: <SushiswapPoolDetail />,
        },
        { path: 'token', element: <TokenDetailsPage /> },
        { path: 'bridge', element: <Bridge /> },
        { path: 'multisender', element: <Multisender /> },
        { path: 'safefarm', element: <SafeFarm /> },
        { path: 'exchange', element: <Trading /> },
        { path: 'nft', element: <NFTpage /> },
        // {path:'nft-token',element:<NFTTokenPage/>},
        { path: 'nft-token/:contract/:id', element: <NFTTokenPage /> },
        { path: 'connect-wallet', element: <ConnectWallet /> },
        { path: 'approvals', element: <AllTokensApprovals /> },
        { path: 'approvals/:tokenAddress', element: <TokenApproval /> },
        { path: 'graphtools', element: <CubicleGraphs /> },
        { path: 'earn', element: <LiquidityPools /> },
        { path: 'airdrop', element: <Airdrop /> },
        { path: 'create-token', element: <TokenCreator /> },
        { path: 'nftdesign', element: <NFT /> },
        { path: 'nftdetails/:contract/:id', element: <NftDetails /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '/404', element: <PageNotFound /> },
    { path: '*', element: <Navigate to="/404" replace /> },
    // { path:'/testingpage', element: <TestingPage />},
    { path: '/swappingTest', element: <HomeScreen /> },
  ])
}
