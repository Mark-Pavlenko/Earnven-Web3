/*
Developed by - Prabhakaran.R
Date : 08-SEP-2021
purpose : this component is used to display pool details for the selected pool of tokens
*/

import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
//import { useNavigate } from 'react-router'
import PoolDetailData from './PoolDetailData'
//import PoolDetailsRecord from "./Index"
import { Chart } from '../Chart/Chart'
import TransactionPerToken from '../transactionHistory/transactionPerToken copy'
import unilogo from '../../assets/icons/Uniswap.webp'
import SushiswapPoolDetails from './Index'

export default function DetailLoadPage(props) {
  //const navigate = useNavigate()
  const { address } = useParams()
  const { tokenid } = useParams()
  const [Loading, setLoading] = useState(false)
  const token0 = props.token0
  const token1 = props.token1
  //let tokenid = 0xceff51756c56ceffca006cd410b03ffc46dd3a58
  // let token0 = 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
  // let token1 = 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2

  //console.log('Address from loading page', props.address)
  console.log('sushiswap Pair token0 from loading page-', token0)
  console.log('sushiswap Pair token1 from loading page-', token1)
  const setLoadingFlag = (flag) => {
    setLoading(flag)
  }
  // const [Token, setToken] = useState('')
  // useEffect(() => {
  //   setToken(token0)
  // })
  // console.log('sushiswap Pair after from loading page-', Token)
  //<PoolDetailData address={props.address} tokenid={props.tokenid} />
  return (
    <div style={{ margin: 'auto' }}>
      <h3>I am in sushiswap pool detail page {tokenid}</h3>
      <PoolDetailData address={address} token0={token0} token1={token1} />
    </div>
  )
}
