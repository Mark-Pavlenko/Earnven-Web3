import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import UniStakingABI from '../../abi/uniStakingContract.json';
import Addresses from '../../contractAddresses';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../constants/actionTypes';
import usdcicon from '../../assets/icons/usdtlogo.png';
import ethicon from '../../assets/icons/ethlogo.png';
import usdticon from '../../assets/icons/usdtlogo.png';
import daiicon from '../../assets/icons/dailogo.png';
import wbtcicon from '../../assets/icons/wbtclogo.png';

export default function UniStaking({ accountAddress }) {
  const [UniStateData, setUniStateData] = useState([]);
  const dispatch = useDispatch();
  const [stakeContent, setstakeContent] = useState([]);
  const [stakeTotal, setstakeTotal] = useState(0);

  useEffect(() => {
    try {
      dispatch({
        type: actionTypes.SET_UNISWAPV2_STAKE,
        payload: accountAddress,
      });
    } catch (error) {
      console.log('dispatch error in uniswap stake v2', error);
    }
  }, [accountAddress]);

  const uniswapV2array = useSelector((state) => state.uniswapV2stake.uniswapV2stake);
  useEffect(() => {
    let tot = 0;
    setUniStateData(uniswapV2array);
    if (uniswapV2array.USDT && uniswapV2array.USDT !== 'null') {
      tot = tot + uniswapV2array.USDT[3];
    }
    if (uniswapV2array.USDC && uniswapV2array.USDC !== 'null') {
      tot = tot + uniswapV2array.USDC[3];
    }
    if (uniswapV2array.DAI && uniswapV2array.DAI !== 'null') {
      tot = tot + uniswapV2array.DAI[3];
    }
    if (uniswapV2array.WBTC && uniswapV2array.WBTC !== 'null') {
      tot = tot + uniswapV2array.WBTC[3];
    }
    setstakeTotal(tot);
  }, [uniswapV2array]);

  useEffect(() => {
    console.log('check content', UniStateData.USDT);
    const content = (
      <div>
        {UniStateData.USDT && UniStateData.USDT !== 'null' && (
          <>
            <div style={{ display: 'flex', marginLeft: '10%' }}>
              <div style={{ display: 'flex' }}>
                <img
                  src={usdcicon}
                  alt="noimage"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  width="30px"
                  height="30px"></img>
                <img
                  src={ethicon}
                  alt="noimage"
                  style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '-10px' }}
                  width="30px"
                  height="30px"></img>
                {/* <>${obj.symbol}-</> */}
              </div>
            </div>
            <div style={{ marginLeft: '10%' }}>
              USDT/ETH: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{' '}
              {parseFloat(UniStateData.USDT[3]).toFixed(2)}
              USD
              <br />
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Value</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.USDT[3]).toFixed(2)}&nbsp;USD</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Price</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.USDT[2]).toFixed(2)}&nbsp;USD</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Balance</p>
              <>
                {' '}
                &nbsp;-&nbsp;&nbsp;
                {UniStateData.USDT[4] < 0.001
                  ? parseFloat(UniStateData.USDT[4]).toFixed(5)
                  : parseFloat(UniStateData.USDT[4]).toFixed(2)}
                &nbsp;
              </>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Claimable</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.USDT[5]).toFixed(2)}&nbsp;USD</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Liquidity</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.USDT[0]).toFixed(2)}&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Volume</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.USDT[1]).toFixed(2)}&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Chain</p>
              <>&nbsp;-&nbsp;Ethereum&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Protocol</p>
              <>&nbsp;-&nbsp;Uniswap-V2&nbsp;</>
            </div>
          </>
        )}
        {UniStateData.WBTC && UniStateData.WBTC !== 'null' && (
          <>
            <div style={{ display: 'flex', marginLeft: '10%' }}>
              <div style={{ display: 'flex' }}>
                <img
                  src={wbtcicon}
                  alt="noimage"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  width="30px"
                  height="30px"></img>
                <img
                  src={ethicon}
                  alt="noimage"
                  style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '-10px' }}
                  width="30px"
                  height="30px"></img>
                {/* <>${obj.symbol}-</> */}
              </div>
            </div>
            <div style={{ marginLeft: '10%' }}>
              WBTC/ETH: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{' '}
              {parseFloat(UniStateData.WBTC[3]).toFixed(2)}
              USD
              <br />
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Value</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.WBTC[3]).toFixed(2)}&nbsp;USD</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Price</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.WBTC[2]).toFixed(2)}&nbsp;USD</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Balance</p>
              <>
                {' '}
                &nbsp;-&nbsp;&nbsp;
                {UniStateData.WBTC[4] < 0.001
                  ? parseFloat(UniStateData.WBTC[4]).toFixed(5)
                  : parseFloat(UniStateData.WBTC[4]).toFixed(2)}
                &nbsp;
              </>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Claimable</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.WBTC[5]).toFixed(2)}&nbsp;USD</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Liquidity</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.WBTC[0]).toFixed(2)}&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Volume</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.WBTC[1]).toFixed(2)}&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Chain</p>
              <>&nbsp;-&nbsp;Ethereum&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Protocol</p>
              <>&nbsp;-&nbsp;Uniswap-V2&nbsp;</>
            </div>
          </>
        )}
        {UniStateData.DAI && UniStateData.DAI !== 'null' && (
          <>
            <div style={{ display: 'flex', marginLeft: '10%' }}>
              <div style={{ display: 'flex' }}>
                <img
                  src={daiicon}
                  alt="noimage"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  width="30px"
                  height="30px"></img>
                <img
                  src={ethicon}
                  alt="noimage"
                  style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '-10px' }}
                  width="30px"
                  height="30px"></img>
                {/* <>${obj.symbol}-</> */}
              </div>
            </div>
            <div style={{ marginLeft: '10%' }}>
              DAI/ETH: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{' '}
              {parseFloat(UniStateData.DAI[3]).toFixed(2)}
              USD
              <br />
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Value</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.DAI[3]).toFixed(2)}&nbsp;USD</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Price</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.DAI[2]).toFixed(2)}&nbsp;USD</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Balance</p>
              <>
                &nbsp;-&nbsp;&nbsp;
                {UniStateData.DAI[4] < 0.001
                  ? parseFloat(UniStateData.DAI[4]).toFixed(5)
                  : parseFloat(UniStateData.DAI[4]).toFixed(2)}
                &nbsp;
              </>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Claimable</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.DAI[5]).toFixed(2)}&nbsp;USD</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Liquidity</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.DAI[0]).toFixed(2)}&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Volume</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.DAI[1]).toFixed(2)}&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Chain</p>
              <>&nbsp;-&nbsp;Ethereum&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Protocol</p>
              <>&nbsp;-&nbsp;Uniswap-V2&nbsp;</>
            </div>
          </>
        )}
        {UniStateData.USDC && UniStateData.USDC !== 'null' && (
          <>
            <div style={{ display: 'flex', marginLeft: '10%' }}>
              <div style={{ display: 'flex' }}>
                <img
                  src={usdcicon}
                  alt="noimage"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  width="30px"
                  height="30px"></img>
                <img
                  src={ethicon}
                  alt="noimage"
                  style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '-10px' }}
                  width="30px"
                  height="30px"></img>
                {/* <>${obj.symbol}-</> */}
              </div>
            </div>
            <div style={{ marginLeft: '10%' }}>
              USDC/ETH: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{' '}
              {parseFloat(UniStateData.USDC[3]).toFixed(2)}
              USD
              <br />
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Value</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.USDC[3]).toFixed(2)}&nbsp;USD</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Price</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.USDC[2]).toFixed(2)}&nbsp;USD</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Balance</p>
              <>&nbsp;-&nbsp;{UniStateData.USDC[4]}&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Claimable</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.USDC[5]).toFixed(2)}&nbsp;USD</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Liquidity</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.USDC[0]).toFixed(2)}&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Volume</p>
              <>&nbsp;-&nbsp;{parseFloat(UniStateData.USDC[1]).toFixed(2)}&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Chain</p>
              <>&nbsp;-&nbsp;Ethereum&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px', marginLeft: '10%' }}>
              <p>Protocol</p>
              <>&nbsp;-&nbsp;Uniswap-V2&nbsp;</>
            </div>
          </>
        )}
      </div>
    );
    setstakeContent(content);
  }, [UniStateData]);
  return (
    <>
      <div>
        <div>
          {stakeTotal > 0 && (
            <div
              style={{
                fontSize: '12px',
                marginLeft: '15px',
              }}>
              Uniswap V2 total --- {stakeTotal > 0 && parseFloat(stakeTotal).toFixed(2)} USD
            </div>
          )}
          {stakeContent && stakeContent}
        </div>
      </div>
    </>
  );
}
