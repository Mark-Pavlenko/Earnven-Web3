import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import {
  Box,
  Typography,
  Stack,
  Container,
  Grid,
  TextField,
  Divider,
  Button,
  Modal,
  Tooltip,
  Avatar,
  InputAdornment,
  OutlinedInput,
} from '@material-ui/core';
import { maxHeight } from '@material-ui/system';
import { parseInt } from 'lodash';

import getUniswapGraphData from './getPoolDetailGraphData';
// const getUniswapGraphData = require('./getPoolDetailGraphData')
//   .getUniswapGraphData

const PoolDetailChart = (props) => {
  const [Data, setData] = useState([]); // UNI V2 Pools
  const [Loading, setLoading] = useState(false);
  // const [Selection, setSelection] = useState(null)
  const [currentTotalVolume, setCurrentTotalVolume] = useState(0);
  const [currentReserverUSD, setreserveUSD] = useState(0);
  const [priorMonthTotalVolume, setPriorMonthTV] = useState(0);
  const [twoMonthPriorTV, setTwoMonthPriorTV] = useState(0);
  const [threeMonthPriorTV, setThreeMonthPriorTV] = useState(0);
  const [currentMonth, setCurrentMonth] = useState();
  const [priorMonth, setPriorMonth] = useState();
  const [priorPirorMonth, setPriorPriorMonth] = useState();
  const [priorPriorPriorMonth, setPriorPriorPriorMonth] = useState();

  // const { tokenPair } = useParams()
  const { token0 } = props;
  const { token1 } = props;
  let currentReserve = 0;
  // call different data points for give month
  // function to get epoch time stamp
  const getEpoch = () => {
    const d = new Date();
    const day = d.getUTCDate();
    const month = d.getUTCMonth();
    const year = d.getUTCFullYear();
    const offset = new Date(year, month, day).getTimezoneOffset() * 60;
    const epoch = new Date(year, month, day).getTime() / 1000 - offset;
    return epoch;
  };

  // this function is used to get last three months from the current month
  const getMonths = () => {
    const d = new Date();
    const day = d.getUTCDate();
    const month = d.getUTCMonth();
    const year = d.getUTCFullYear();

    const offset = new Date(year, month, day).getTimezoneOffset() * 60;
    const epoch = new Date(year, month, day).getTime() / 1000 - offset;
    const currentDate = new Date(epoch * 1000);

    console.log('Current date derived from epco', currentDate);
    // get current month
    const currentMonth = currentDate.toLocaleString('default', {
      month: 'short',
    });
    // console.log('current month', currentMonth)
    // get previous month
    currentDate.setMonth(currentDate.getMonth() - 1);
    const previousMonth = currentDate.toLocaleString('default', {
      month: 'short',
    });
    // console.log('Previous Month', previousMonth)
    // second Month
    currentDate.setMonth(currentDate.getMonth() - 1);
    const secondMonth = currentDate.toLocaleString('default', {
      month: 'short',
    });
    // console.log('Secound Month', secondMonth)
    // Third Month
    currentDate.setMonth(currentDate.getMonth() - 1);
    const thirdMonth = currentDate.toLocaleString('default', {
      month: 'short',
    });
    // console.log('third Month', thirdMonth)
    const months = {
      currentMonth,
      priorMonth: previousMonth,
      priorPriorMonth: secondMonth,
      priorPriorPriorMonth: thirdMonth,
    };
    setCurrentMonth(months.currentMonth);
    setPriorMonth(months.priorMonth);
    setPriorPriorMonth(months.priorPriorMonth);
    setPriorPriorPriorMonth(months.priorPriorPriorMonth);

    // console.log('Current month', Months.currentMonth)
    // console.log('prior month', Months.preiorMonth)
    // console.log('prior Prior month', Months.preiorPriorMonth)
    // console.log('prior Prior prior month', Months.preiourPeriorPriorMonth)
    // return Months
  };

  // Current month total volume
  // This function is to get MarketCap  and FullyDiluted
  // this hook is used to get uniswap pool detail data from the graph for the sepecific pool token

  useEffect(() => {
    // console.log('Toke pari from chat bar page', tokenPair)
    setLoading(true);
    // function to fetch current pool data from graph
    async function getData() {
      // call below function to get epoc time stamp
      const epoch = getEpoch();
      // call this util function to get uniswap graph data
      // 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852 - weth/usdt
      // 0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
      try {
        const response = await getUniswapGraphData(token0, token1, epoch);
        // console.log('uniswap data', response)

        // main derive code
        if (response.data.data) {
          const res = response.data.data.pairDayDatas;

          // assing the current reserver to the local variable to get 24hrs difference
          currentReserve = res[0].reserveUSD;
          // get current market price by giving below formula
          const totalVolume = res[0].reserveUSD / res[0].totalSupply;

          // set/update value for state varaible

          // setSelection(Data)

          setreserveUSD(parseInt(res[0].reserveUSD).toLocaleString());
          // setCurrentTotalVolume(parseFloat(totalVolume).toLocaleString())
          setCurrentTotalVolume(totalVolume);
          setLoading(false);
        }
      } catch (err) {
        console.log('No record found for the paired token');
      }
    }
    getData();
    getMonths();
  }, []);

  // Previous month total volume from the current month
  // This function is to get MarketCap  and FullyDiluted
  // this hook is used to get uniswap pool detail data from the graph for the sepecific pool token

  useEffect(() => {
    // function to fetch current pool data from graph
    async function getData() {
      // call below function to get epoc time stamp
      const epoch = getEpoch();
      const priorMonth = epoch - 2678400; // take one month prior to the current date
      // call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(token0, token1, priorMonth);
        // console.log('uniswap data', response)

        // main derive code
        if (response.data.data) {
          const res = response.data.data.pairDayDatas;

          // assing the current reserver to the local variable to get 24hrs difference
          currentReserve = res[0].reserveUSD;
          // get current market price by giving below formula
          const totalVolume = res[0].reserveUSD / res[0].totalSupply;

          // set/update value for state varaible
          setLoading(false);
          // setSelection(Data)

          // setreserveUSD(parseInt(res[0].reserveUSD).toLocaleString())
          // setPriorMonthTV(parseFloat(totalVolume).toLocaleString())
          setPriorMonthTV(totalVolume);
          // props.setLoadingFlag(true)
        }
      } catch (err) {
        console.log('No record found for the paired token');
      }
    }
    getData();
  }, []);

  // TwoMonthsPrior total volume from the current month
  // This function is to get MarketCap  and FullyDiluted
  // this hook is used to get uniswap pool detail data from the graph for the sepecific pool token
  useEffect(() => {
    // function to fetch current pool data from graph
    async function getData() {
      // call below function to get epoc time stamp
      const epoch = getEpoch();
      const twoMonthPrior = epoch - 5443200; // take two month prior to the current date
      // call this util function to get uniswap graph data
      try {
        const response = await getUniswapGraphData(token0, token1, twoMonthPrior);
        // console.log('uniswap data', response)

        // main derive code
        if (response.data.data) {
          const res = response.data.data.pairDayDatas;

          // assing the current reserver to the local variable to get 24hrs difference
          currentReserve = res[0].reserveUSD;
          // get current market price by giving below formula
          const totalVolume = res[0].reserveUSD / res[0].totalSupply;

          // set/update value for state varaible
          setLoading(false);
          // setSelection(Data)

          // setreserveUSD(parseInt(res[0].reserveUSD).toLocaleString())
          // setTwoMonthPriorTV(parseFloat(totalVolume).toLocaleString())
          setTwoMonthPriorTV(totalVolume);
          // props.setLoadingFlag(true)
        }
      } catch (err) {
        console.log('No record found for the paired token');
      }
    }
    getData();
  }, []);

  // ThreeMonthPrior total volume from the current month
  // This function is to get MarketCap  and FullyDiluted
  // this hook is used to get uniswap pool detail data from the graph for the sepecific pool token
  useEffect(() => {
    // function to fetch current pool data from graph
    async function getData() {
      // call below function to get epoc time stamp
      const epoch = getEpoch();
      const threeMonthPrior = epoch - 8035200; // take three month prior to the current date
      // call this util function to get uniswap graph data
      // 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852 - weth/usdt
      // 0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
      try {
        const response = await getUniswapGraphData(token0, token1, threeMonthPrior);
        // console.log('uniswap data', response)

        // main derive code
        if (response.data.data) {
          const res = response.data.data.pairDayDatas;

          // assing the current reserver to the local variable to get 24hrs difference
          currentReserve = res[0].reserveUSD;
          // get current market price by giving below formula
          const totalVolume = res[0].reserveUSD / res[0].totalSupply;

          // set/update value for state varaible
          setLoading(false);
          // setSelection(Data)

          // setreserveUSD(parseInt(res[0].reserveUSD).toLocaleString())
          // setThreeMonthPriorTV(parseFloat(totalVolume).toLocaleString())
          setThreeMonthPriorTV(totalVolume);
          // props.setLoadingFlag(true)
        }
      } catch (err) {
        console.log('No record found for the paired token');
      }
    }
    getData();
  }, []);

  return (
    <div
      style={{
        width: '90%',
        margin: '15px',
        padding: '8rem 0',
      }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <center>{!Loading && <h4>Liquidity Pair Token Bar Chat</h4>}</center>
      <div style={{ maxWidth: '450px' }}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            // labels: ['Jun', 'July', 'Aug', 'Sep'],
            labels: [priorPriorPriorMonth, priorPirorMonth, priorMonth, currentMonth],
            datasets: [
              {
                // Label for bars
                label: 'Total Volume',
                // Data or value of your each variable
                data: [
                  threeMonthPriorTV,
                  twoMonthPriorTV,
                  priorMonthTotalVolume,
                  currentTotalVolume, // current month value
                ],
                // Color of each bar
                backgroundColor: ['aqua', 'green', 'red', 'yellow'],
                // Border color of each bar
                borderColor: [`aqua `, 'green', 'red', 'yellow'],
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false, // false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PoolDetailChart;
