import React, { useEffect, useState } from 'react';
import ETHLogo from '../../assets/icons/eth.png';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../constants/actionTypes';
import Investment from '../common/investment/investment';

export default function Ethereum2Staking({ accountAddress }) {
  const [BeaconContent, setBeaconContent] = useState([]);
  console.log('BeaconContent', BeaconContent);
  //useSelector is a function that takes currentState as an argument
  //and returns data from it and store the return values inside a variable within the scope
  //of the functional component
  const BeaconData = useSelector((state) => state.eth2Stake.eth2StakeData);
  console.log('BeaconData', BeaconData);
  const BeaconTotal = useSelector((state) => state.eth2Stake.eth2StakeTotal);
  console.log('TestABC ETH receveid data', BeaconData);
  console.log('TestABC ETH Total Value data', BeaconTotal);
  //dispatch/send an action to store by simply adding an action as an argument
  //pass payload to pass arguments
  const dispatch = useDispatch();
  // const [BeaconData, setBeaconData] = useState([]); // Beacon (Ethereum 2.0 Staking)
  // const [BeaconTotal, setBeaconTotal] = useState([]); // Beacon Total
  //Beacon (Ethereum 2.0 Staking)
  //below function is used to get eth2.0 staking balance from the subgraph
  const userAccountAddress = { accountAddress: accountAddress };
  useEffect(() => {
    console.log('TestABC ETH for accounts', userAccountAddress.accountAddress);
    const getEth2StakeData = async () => {
      try {
        dispatch({
          type: actionTypes.GET_ETH2_STAKE_DATA,
          payload: userAccountAddress,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getEth2StakeData();
  }, [accountAddress]);

  //implementing below logic for ETH2.0 staking
  useEffect(() => {
    if (BeaconData) {
      console.log('TestABC inside eth 2 implmentation', BeaconData);
      try {
        var content = BeaconData.map((object) => {
          return (
            <>
              <Investment
                protocol={object}
                logoImage={ETHLogo}
                stakedToken={'ETH'}
                protocolName={'Ethereum'}
                chain={'Ethereum'}
                isStaked={true}
              />
              {/*<Accordion*/}
              {/*  style={{*/}
              {/*    background: 'transparent',*/}
              {/*    marginRight: '1px',*/}
              {/*    color: 'black',*/}
              {/*    width: '100%',*/}
              {/*    border: '1px',*/}
              {/*    borderColor: 'black',*/}
              {/*    borderStyle: 'hidden', //solid*/}
              {/*  }}>*/}
              {/*  <AccordionSummary*/}
              {/*    expandIcon={<ExpandMoreIcon />}*/}
              {/*    aria-controls="panel1a-content"*/}
              {/*    id="panel1a-header">*/}
              {/*    <React.Fragment*/}
              {/*      style={{*/}
              {/*        display: 'inline-block',*/}
              {/*        width: '100%',*/}
              {/*        //textAlign: 'left',*/}
              {/*        wordBreak: 'break-all',*/}
              {/*      }}>*/}
              {/*      <React.Fragment>*/}
              {/*        <img*/}
              {/*          style={{*/}
              {/*            height: '20px',*/}
              {/*            width: '20px',*/}
              {/*            display: 'inline-block',*/}
              {/*          }}*/}
              {/*          src={ETHLogo}*/}
              {/*          alt=""*/}
              {/*        />*/}
              {/*      </React.Fragment>*/}
              {/*      ETH 2.0 &nbsp; ${parseFloat(object.totalInvestment).toLocaleString()}*/}
              {/*    </React.Fragment>*/}
              {/*  </AccordionSummary>*/}
              {/*  <AccordionDetails>*/}
              {/*    <div style={{ display: 'inline-block', width: '70%', fontSize: '15px' }}>*/}
              {/*      Staked Token &nbsp;&nbsp;&nbsp;&nbsp; ETH*/}
              {/*      <br />*/}
              {/*      Balance &nbsp; {parseFloat(object.totalDeposit).toLocaleString()}*/}
              {/*      <br />*/}
              {/*      Price &nbsp;&nbsp;&nbsp;&nbsp;${parseFloat(object.ethPrice).toFixed(2)}*/}
              {/*      <br />*/}
              {/*      Value &nbsp;&nbsp;$*/}
              {/*      {parseFloat(object.totalInvestment).toFixed(2).toLocaleString()}*/}
              {/*      <br />*/}
              {/*      Chain &nbsp;&nbsp;&nbsp;&nbsp; Ethereum*/}
              {/*      <br />*/}
              {/*      Protocol &nbsp;&nbsp; Ethereum*/}
              {/*    </div>*/}
              {/*  </AccordionDetails>*/}
              {/*</Accordion>*/}
            </>
          );
        });
      } catch (err) {
        console.log('No Curve LP token data found');
      }
    }

    setBeaconContent(content);
  }, [BeaconData]);

  return (
    <React.Fragment>
      {/*<h1>ETHEREUM</h1>*/}
      {/*<div*/}
      {/*  style={{*/}
      {/*    fontSize: '15px',*/}
      {/*    marginRight: '15px',*/}
      {/*    display: BeaconData.length > 0 ? '' : 'none',*/}
      {/*  }}>*/}
      {/*  <img*/}
      {/*    src={ETHLogo}*/}
      {/*    style={{*/}
      {/*      height: '30px',*/}
      {/*      marginTop: '',*/}
      {/*      marginLeft: '15px',*/}
      {/*      display: 'inline-block',*/}
      {/*    }}*/}
      {/*    alt=""*/}
      {/*  />*/}
      {/*  Ethereum 2.0 staking -- ${BeaconTotal.toLocaleString()}*/}
      {BeaconContent}
      {/*</div>*/}
      {/*<br />*/}
    </React.Fragment>
  );
}
