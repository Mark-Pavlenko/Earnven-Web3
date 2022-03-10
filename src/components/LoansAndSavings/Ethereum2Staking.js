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
  //useSelector is a function that takes currentState as an argument
  //and returns data from it and store the return values inside a variable within the scope
  //of the functional component
  //const BeaconData = useSelector((state) => state.eth2Stake.eth2StakeData); //to get statking value
  ////console.log('BeaconData', BeaconData);
  //const BeaconTotal = useSelector((state) => state.eth2Stake.eth2StakeTotal); //to get total value
  ////console.log('TestABC ETH receveid data', BeaconData);
  ////console.log('TestABC ETH Total Value data', BeaconTotal);
  //dispatch/send an action to store by simply adding an action as an argument
  //pass payload to pass arguments
  const dispatch = useDispatch();
  // const [BeaconData, setBeaconData] = useState([]); // Beacon (Ethereum 2.0 Staking)
  // const [BeaconTotal, setBeaconTotal] = useState([]); // Beacon Total
  //Beacon (Ethereum 2.0 Staking)
  //below function is used to get eth2.0 staking balance from the subgraph
  const userAccountAddress = { accountAddress: accountAddress };
  useEffect(() => {
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

  return <></>;
}
