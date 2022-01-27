import React, { useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../../constants/actionTypes';

const BalancerV2 = ({ accountAddress }) => {
  const [BalancerTotalv2, setBalancerTotalv2] = useState([]);
  const [BalancerPoolsDatav2, setBalancerPoolsDatav2] = useState([]);
  const [BalancerPoolsContentv2, setBalancerPoolsContentv2] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      console.log('inside dispatch', accountAddress);
      dispatch({
        type: actionTypes.SET_BALANCER_LP,
        payload: accountAddress,
      });
    } catch (error) {
      console.log('dispatch error in balancer v2', error);
    }
  }, [accountAddress]);

  useEffect(() => {
    const content = BalancerPoolsDatav2.map((object) => (
      <Tooltip
        title={
          <>
            <div
              style={{
                display: 'inline-block',
                textAlign: 'left',
                wordBreak: 'break-word',
              }}>
              Tokens in Pool: <br />
              {object.tokens.map((obj) => (
                <>
                  ${obj.symbol}
                  <br />
                </>
              ))}
            </div>
            <br />
            <br />
            Pool Percentage : {parseFloat(object.poolPercentage).toFixed(2)} % <br />
            Pool Liquidity : {parseFloat(object.liquidity).toFixed(2)} USD <br />
            Total Investment : {object.totalInvestment} USD
          </>
        }>
        <div style={{ width: '90%', marginTop: '12px', marginLeft: '20px' }}>
          <br />
          <div
            style={{
              display: 'inline-block',
              width: '60%',
              textAlign: 'left',
              wordBreak: 'break-word',
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
            {object.tokens.map((obj) => (
              <>
                <>{obj.symbol}-</>
              </>
            ))}
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
              <>&nbsp;-&nbsp;{parseFloat(object.balance).toFixed(3)}&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px' }}>
              <p>Liquidity</p>
              <>&nbsp;-&nbsp;{parseFloat(object.liquidity).toFixed(2)}&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px' }}>
              <p>Chain</p>
              <>&nbsp;-&nbsp;Ethereum&nbsp;</>
            </div>
            <div style={{ display: 'flex', width: '300px' }}>
              <p>Protocol</p>
              <>&nbsp;-&nbsp;Balancer-V2&nbsp;</>
            </div>
          </div>
        </div>
      </Tooltip>
    ));

    setBalancerPoolsContentv2(content);
  }, [BalancerPoolsDatav2]);

  const balancerV2array = useSelector((state) => state.balancerV2lp.balancerV2lp);

  useEffect(() => {
    setBalancerPoolsDatav2(balancerV2array);
    let total = 0;
    if (balancerV2array.length > 0) {
      balancerV2array.map((object) => {
        total += parseFloat(object.totalInvestment);
      });
      setBalancerTotalv2(parseFloat(total).toFixed(2));
    }
  }, [balancerV2array]);
  return (
    <div>
      {/*<div*/}
      {/*  style={{*/}
      {/*    fontSize: '12px',*/}
      {/*    marginLeft: '15px',*/}
      {/*    display: BalancerPoolsDatav2.length > 0 ? '' : 'none',*/}
      {/*  }}>*/}
      {/*  Balancer V2 ---{parseFloat(BalancerTotalv2).toFixed(2)} USD*/}
      {/*</div>*/}
      {/*{BalancerPoolsContentv2}*/}
      {/*<br />*/}
    </div>
  );
};

export default BalancerV2;
