/**************************************************************************************************
Purpose : This component is used to get Compound protocol data value for a given user
Developed by : Prabhakaran.R
Version log:
---------------------------------------------------------------------------------------------------
Version      Date                Description                                    Developed/Fixed 
----------------------------------------------------------------------------------------------------
1.0         31/Jan/2021          Initial Development                             Prabhakaran.R

**************************************************************************************************/
import React, { useEffect, useState } from 'react';
import CompoundLogo from '../../assets/icons/Compound.svg';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import actionTypes from '../../constants/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import loadWeb3 from '../../utils/loadWeb3';

export default function CompoundFinance({ accountAddress }) {
  const [compTokenContent, setcompTokenContent] = useState([]);

  //get useWeb3React hook
  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();

  //logic implementing for web3 provider connection using web3 React hook
  async function getWeb3() {
    let web3;
    try {
      const provider = active ? await connector.getProvider() : await loadWeb3();
      web3 = new Web3(provider);
    } catch (err) {
      console.log('Web3 is not connected, check the Metamask connectivity!!');
    }
    return web3;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    const getCompTokenData = async () => {
      const web3 = await getWeb3();
      if (web3 != undefined) {
        const compTokenAttributes = { accountAddress: accountAddress, web3: web3 };
        try {
          dispatch({
            type: actionTypes.SET_COMP_TOKEN_DATA,
            payload: compTokenAttributes,
          });
        } catch (err) {
          console.log('Dispatch error in compound protocol', err.message);
        }
      }
    };

    getCompTokenData();
  }, [accountAddress]);

  // //recevie the value return from the saga
  // let compTokenDataValue = useSelector((state) => state.compoundFinance.compTokenData);
  // let compTotalValue = useSelector((state) => state.compoundFinance.compTokenTotal);
  // let compTokenClaim = useSelector((state) => state.compoundFinance.compClaimValue);

  // //Below process is used to implement the fetched SNX collateral value in UI
  // useEffect(() => {
  //   if (compTokenDataValue.length > 0) {
  //     try {
  //       var content = compTokenDataValue.map((object) => (
  //         <Accordion
  //           style={{
  //             background: 'transparent',
  //             marginRight: '1px',
  //             color: 'black',
  //             width: '100%',
  //             border: '1px',
  //             borderColor: 'black',
  //             borderStyle: 'hidden',
  //           }}>
  //           <AccordionSummary
  //             expandIcon={<ExpandMoreIcon />}
  //             aria-controls="panel1a-content"
  //             id="panel1a-header">
  //             <React.Fragment
  //               style={{
  //                 display: 'inline-block',
  //                 width: '100%',

  //                 wordBreak: 'break-all',
  //               }}>
  //               <React.Fragment>
  //                 <img
  //                   style={{
  //                     height: '20px',
  //                     width: '20px',
  //                     display: 'inline-block',
  //                   }}
  //                   src={object.tokenImage}
  //                   alt=""
  //                 />
  //               </React.Fragment>
  //               {object.symbol}&nbsp;
  //               {parseFloat(object.value).toLocaleString()} USD
  //             </React.Fragment>
  //           </AccordionSummary>
  //           <AccordionDetails>
  //             <div style={{ display: 'inline-block', width: '70%', fontSize: '15px' }}>
  //               Token &nbsp;&nbsp;&nbsp;&nbsp; {object.symbol}
  //               <br />
  //               Balance &nbsp; {parseFloat(object.balance).toLocaleString()}
  //               <br />
  //               Price &nbsp;&nbsp;&nbsp;&nbsp;${object.price}
  //               <br />
  //               Value &nbsp;&nbsp;&nbsp;&nbsp;$
  //               {parseFloat(object.value).toLocaleString()}
  //               <br />
  //               Apy &nbsp;&nbsp;&nbsp;&nbsp; {object.apy}%
  //               <br />
  //               Chain &nbsp;&nbsp;&nbsp;&nbsp; Ethereum
  //               <br />
  //               Protocol &nbsp;&nbsp; Compound
  //             </div>
  //           </AccordionDetails>
  //         </Accordion>
  //       ));
  //     } catch (err) {
  //       console.log('No Curve LP token data found');
  //     }
  //   }

  //   setcompTokenContent(content);
  // }, [compTokenDataValue]);

  return (
    //   <React.Fragment>
    //     {compTokenClaim > 0 ? (
    //       <React.Fragment>
    //         <img
    //           src={CompoundLogo}
    //           style={{
    //             height: '20px',
    //             marginTop: '',
    //             marginLeft: '15px',
    //             display: 'inline-block',
    //           }}
    //           alt=""
    //         />
    //         Claimable -- ${compTokenClaim.toLocaleString()}
    //       </React.Fragment>
    //     ) : (
    //       ''
    //     )}
    //     <br />
    //     <div
    //       style={{
    //         fontSize: '15px',
    //         marginRight: '15px',

    //         display: compTokenDataValue.length > 0 ? '' : 'none',
    //       }}>
    //       <img
    //         src={CompoundLogo}
    //         style={{
    //           height: '20px',
    //           marginTop: '',
    //           marginLeft: '15px',
    //           display: 'inline-block',
    //         }}
    //         alt=""
    //       />
    //       Compound -- ${compTotalValue.toLocaleString()}
    //       {compTokenContent}
    //     </div>
    //     <br />
    //   </React.Fragment>
    // );
    <div></div>
  );
}
