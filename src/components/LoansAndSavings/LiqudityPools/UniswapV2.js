import React, { useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../../constants/actionTypes';
import { ConsoleView } from 'react-device-detect';

const UniswapV2 = ({ accountAddress }) => {
  const dispatch = useDispatch();
  const [PoolsContent, setPoolsContent] = useState([]); // UNI v2
  const [PoolsData, setPoolsData] = useState([]); // UNI v2
  const [UniV2Total, setUniV2Total] = useState([]); // UNI v2 total
  useEffect(() => {
    try {
      dispatch({
        type: actionTypes.SET_UNISWAPV2_LP,
        payload: accountAddress,
      });
    } catch (error) {
      console.log('dispatch error in balancer v2', error);
    }
  }, [accountAddress]);

  useEffect(() => {
    const content = PoolsData.map((object) => (
      <Tooltip
        title={
          <>
            Token 0 : {object.token0name} <br />
            Token 1 : {object.token1name} <br />
            Pool Share : {parseFloat((object.tokenBalance / object.tokenSupply) * 100).toFixed(
              2
            )} % <br />
            Pool Liquidity : {parseFloat(object.liquidity).toFixed(2)} <br />
            Total Investment : {object.totalInvestment} USD <br />
            LP Token Balance : {parseFloat(object.tokenBalance).toFixed(2)}
          </>
        }>
        <div style={{ width: '90%', marginTop: '12px', marginLeft: '30px' }}>
          <div
            style={{
              display: 'inline-block',
              width: '45%',
              textAlign: 'left',
              wordBreak: 'break-all',
            }}>
            <div style={{ display: 'flex' }}>
              {object.imageData.map((obj) => (
                <div style={{ display: 'flex', marginLeft: '-10px' }}>
                  <img
                    src={obj}
                    alt="noimage"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                    width="30px"
                    height="30px"></img>
                  {/* <>${obj.symbol}-</> */}
                </div>
              ))}
            </div>
            ${object.token0Symbol}-${object.token1Symbol}
          </div>
          <div style={{ display: 'flex', width: '300px' }}>
            <p>Value</p>
            <>&nbsp;-&nbsp;{parseFloat(object.totalInvestment).toFixed(2)}&nbsp;USD</>
          </div>
          <div style={{ display: 'flex', width: '300px' }}>
            <p>LP price</p>
            <>&nbsp;-&nbsp;{parseFloat(object.price).toFixed(2)}&nbsp;USD</>
          </div>
          <div style={{ display: 'flex', width: '300px' }}>
            <p>LP balance</p>
            <>
              &nbsp;-&nbsp;
              {object.tokenBalance < 0.001
                ? parseFloat(object.tokenBalance).toFixed(5)
                : parseFloat(object.tokenBalance).toFixed(3)}
              &nbsp;
            </>
          </div>
          <div style={{ display: 'flex', width: '300px' }}>
            <p>Liquidity</p>
            <>&nbsp;-&nbsp;{parseFloat(object.liquidity).toFixed(2)}&nbsp;</>
          </div>

          {object.volume > 0 && (
            <div style={{ display: 'flex', width: '300px' }}>
              <p>Volume</p>
              <>&nbsp;-&nbsp;{object.volume > 0 && parseFloat(object.volume).toFixed(2)}&nbsp;USD</>
            </div>
          )}
          <div style={{ display: 'flex', width: '300px' }}>
            <p>Chain</p>
            <>&nbsp;-&nbsp;Ethereum&nbsp;</>
          </div>
          <div style={{ display: 'flex', width: '300px' }}>
            <p>Protocol</p>
            <>&nbsp;-&nbsp;Uniswap-V2&nbsp;</>
          </div>

          <br />
        </div>
      </Tooltip>
    ));

    setPoolsContent(content);
  }, [PoolsData]);

  const uniswapV2array = useSelector((state) => state.uniswapV2lp.uniswapV2lp);

  useEffect(() => {
    setPoolsData(uniswapV2array);
    let total = 0;
    if (uniswapV2array.length > 0) {
      uniswapV2array.map((object) => {
        total += parseFloat(object.totalInvestment);
      });
      setUniV2Total(parseFloat(total).toFixed(2));
    }
  }, [uniswapV2array]);
  return (
    <div>
      {/*<div*/}
      {/*  style={{*/}
      {/*    fontSize: '12px',*/}
      {/*    marginLeft: '15px',*/}
      {/*    display: PoolsData.length > 0 ? '' : 'none',*/}
      {/*  }}>*/}
      {/*  Uniswap V2 --- {UniV2Total} USD*/}
      {/*</div>*/}
      {/*{PoolsContent}*/}
    </div>
  );
};

export default UniswapV2;
