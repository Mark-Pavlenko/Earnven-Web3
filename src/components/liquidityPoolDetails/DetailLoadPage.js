/*
Developed by - Prabhakaran.R
Date : 08-SEP-2021
purpose : this component is used to display pool details for the selected pool of tokens
*/

import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
//import { useNavigate } from 'react-router'
import PoolDetailData from './PoolDetailData'
import { Chart } from '../Chart/Chart'
import TransactionPerToken from '../transactionHistory/transactionPerToken copy'
import unilogo from '../../assets/icons/Uniswap.webp'

export default function DetailLoadPage(props) {
  //const navigate = useNavigate()
  const { address } = useParams()
  const { tokenid } = useParams()
  const [Loading, setLoading] = useState(false)

  //console.log('Address from loading page', props.address)
  //console.log('Pair token from loading page-', props.tokenid)
  const setLoadingFlag = (flag) => {
    setLoading(flag)
  }
  const [Token, setToken] = useState('')
  //<PoolDetailData address={props.address} tokenid={props.tokenid} />
  return (
    <div style={{ margin: 'auto' }}>
      <PoolDetailData />
    </div>
  )
}
