import React, { useEffect, useState } from 'react'
import './PoolDetailsInfo.css'
import TransparentButton from '../components/TransparentButton'
import { Button } from '@material-ui/core'

//call this component to get pool details information in main page at footer
function PoolDetailsInfo(props) {
  let tokenASymbol = props.tokenASymbol
  let tokenBSymbol = props.tokenBSymbol
  let tokenAId = props.tokenAId
  let tokenBId = props.tokenBId
  let tokenPair = props.tokenPair
  let tokeIdPairAddress
  let tokenAAddress
  let tokenBAddress
  let url = `https://etherscan.io/address/${tokenPair}}`
  //below code to get pairAddress and substring since address size is larger
  //showing first few digits and last few digits
  //ex :0xb4e1...c9dc
  try {
    const setTokenAddress = (token) => {
      let tokenId = token
      let tokenLength = tokenId.length //get the length of the pair address
      let tokenPairAddress1 = tokenId.substring(0, 6) //get first 6 digit of the address
      let tokenPairAddress2 = tokenId.substring(tokenLength - 4, tokenLength) //get last 4 digit of address
      return tokenPairAddress1 + '...' + tokenPairAddress2
    }
    //call the function to get token Address for paird token and tokens of the each pair
    tokeIdPairAddress = setTokenAddress(tokenPair)
    tokenAAddress = setTokenAddress(tokenAId) //tokenA Address
    tokenBAddress = setTokenAddress(tokenBId) //tokenB Address
  } catch (err) {
    console.log('No token found!!')
  }
  return (
    <div>
      <h2>&nbsp;Pair Information </h2>
      <div className="pairInfo-item">
        <div className="pairInfo__description">
          <h4 style={{ padding: '0.7rem' }}>Pair Name</h4>
          &nbsp;&nbsp;{tokenASymbol}-{tokenBSymbol}
        </div>
        <div className="pairInfo__description">
          <h4 style={{ padding: '0.5rem' }}>Pair address</h4>
          &nbsp;&nbsp;{tokeIdPairAddress}
        </div>
        <div className="pairInfo__description">
          <h5 style={{ padding: '0.5rem' }}>{tokenASymbol} Address</h5>
          &nbsp;&nbsp;{tokenAAddress}
        </div>
        <div className="pairInfo__description">
          <h5 style={{ padding: '0.5rem' }}>{tokenBSymbol} Address</h5>
          &nbsp;&nbsp;{tokenBAddress}
        </div>
        <a
          href={`https://etherscan.io/address/${tokenPair}`}
          style={{ textDecoration: 'none', color: '#00FFE7' }}
          target="blank"
        >
          Etherscan
        </a>
      </div>
    </div>
  )
}

export default PoolDetailsInfo
