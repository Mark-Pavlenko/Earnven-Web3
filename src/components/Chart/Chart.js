// import { ResponsiveLine } from '@nivo/line'
// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import parse from "html-react-parser";
import { useParams } from 'react-router-dom';
import ShowMoreText from "react-show-more-text";
import TransparentButton from '../TransparentButton/index'
import {
  // ChartDataTwentyFour,
  // ChartDataOneWeek,
  // ChartDataOneMonth,
  ChartAllData
} from './ChartDataFetch/ChartDataFetch'
import { MobileView, BrowserView } from 'react-device-detect';
import Apexchart from './Apexchart';
import { Typography, Stack } from '@material-ui/core';
// import { AiFillTwitterCircle } from "react-icons/ai";
// import { FaTelegram } from "react-icons/fa";

export const Chart = () => {

  const { tokenid } = useParams();
  const [Price, setPrice] = useState(null)
  const [Selection, setSelection] = useState(null)
  // eslint-disable-next-line
  const [View, setView] = useState('Month View')

  // const [Token, setToken] = useState('aave')

  React.useEffect(() => {

    // console.log(tokenid)
    // console.log(tokenid)
    axios.get(`https://api.coingecko.com/api/v3/coins/${tokenid}`, {}, {})
      .then(async (response) => {
        console.log(response.data)
        await setSelection(response.data)

      })
    setView('Month View')
    console.log("heelo1")
    if (tokenid !== '' && tokenid !== null && tokenid !== undefined) {
      console.log("heelo2")

      console.log(1, tokenid)
      ChartAllData(tokenid).then((res) => {
        setPrice(res)
        // console.log(Price)
      })

    } else {
      alert('Data Not Available For This Coin!')
    }


  }, [tokenid]);


  /* function loadWeekData(){

    console.log(tokenid)
    if(tokenid!=='' && tokenid!==null){

      axios.get(`https://api.coingecko.com/api/v3/coins/${tokenid}`,{},{})
        .then(async(response) => {
            console.log(response.data)
            setSelection(response.data)
    })
      setView('Week View')
      
      console.log(1, tokenid)
      ChartDataOneWeek(tokenid).then((res) => {
        setPrice(res)
        // console.log(Price)
      })

    }

  } */

  /* function loadMonthData(){

    console.log(tokenid)
    if(tokenid!=='' && tokenid!==null){

      axios.get(`https://api.coingecko.com/api/v3/coins/${tokenid}`,{},{})
        .then(async(response) => {
            console.log(response.data)
            setSelection(response.data)
    })
    setView('Month View')

      console.log(1, tokenid)
      ChartDataOneMonth(tokenid).then((res) => {
        setPrice(res)
        // console.log(Price)
      })

    }

  }
 */
  /* function loadDayData(){

    console.log(tokenid)
    if(tokenid!=='' && tokenid!==null){

      axios.get(`https://api.coingecko.com/api/v3/coins/${tokenid}`,{},{})
        .then(async(response) => {
            console.log(response.data)
            setSelection(response.data)
    })
    setView('Day View')

      console.log(1, tokenid)
      ChartDataTwentyFour(tokenid).then((res) => {
        setPrice(res)
        // console.log(Price)
      })

    }

  } */

  useEffect(() => {

  }, [])

  function executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

  let data
  //to set coin price we get from coingecko api
  Price
    ? (data = [
      {
        id: 'japan',
        color: 'hsl(214, 70%, 50%)',
        data: Price,
      },
    ])
    // eslint-disable-next-line
    : (data = [
      {
        id: 'japan',
        color: 'hsl(72, 70%, 50%)',
        data: [
          {
            x: 'plane',
            y: 97,
          },
          {
            x: 'helicopter',
            y: 230,
          },
          {
            x: 'boat',
            y: 45,
          },
          {
            x: 'train',
            y: 174,
          },
          {
            x: 'subway',
            y: 203,
          },
          {
            x: 'bus',
            y: 158,
          },
          {
            x: 'car',
            y: 152,
          },
          {
            x: 'moto',
            y: 227,
          },
          {
            x: 'bicycle',
            y: 120,
          },
          {
            x: 'horse',
            y: 51,
          },
          {
            x: 'skateboard',
            y: 176,
          },
          {
            x: 'others',
            y: 290,
          },
        ],
      },
    ])
  return (
    <div>

      {Selection ? (
        <div style={{ width: '80%', margin: 'auto' }}>

          <div style={{ textAlign: 'left', marginTop: '20px' }}>

            { /* <Typography color='white'>
            <img alt='' style={{marginTop:'5px'}}src={ Selection.image? Selection.image.small:'' }/>

          { Selection.symbol? Selection.symbol.toUpperCase():'' }
          </Typography>
          </div>

          <div>
          <div style={{textAlign:'left'}}>
          <font color='white'>
          <h2>{ Selection.name? Selection.name.toUpperCase():'' }</h2>
      </font> 
          </div>*/}

            {/* <div style={{ float:'right'}}>
          <font color='white'>
          <span><img src={TelegramLogo} style={{marginTop:'-50px'}}/></span>
          <img src={TwitterLogo} style={{marginTop:'-50px'}}/>
          </font>
          </div> */}


            <Stack direction='row'>
              <img alt='' style={{ marginTop: '5px', height: '40px', width: '40px' }} src={Selection.image ? Selection.image.small : ''} />
              <Typography variant='body2' sx={{ mt: 2, ml: 1, color: '#737373' }}>{Selection.symbol ? Selection.symbol.toUpperCase() : ''}</Typography>
            </Stack>
            <div>

              <Typography variant='h3' sx={{ mt: 1.5 }}>{Selection.name ? Selection.name.toUpperCase() : ''}
                {/* <span >
                  
                  <AiFillTwitterCircle />
                  <FaTelegram /></span> */}
              </Typography>
              {/* <AiFillTwitterCircle></AiFillTwitterCircle>
              <FaTelegram></FaTelegram> */}

            </div>
            <Typography variant='body2' sx={{ color: '#00FFE7' }}>
              <span style={{ fontSize: '30px' }} >{Selection.market_data ? '$' + Selection.market_data.current_price.usd : ''}</span>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_24h).toFixed(2) + '%' : ''}
            </Typography>

          </div>

          {/* <div style={{ textAlign: 'left', marginRight: '0px' }}>
            <font color='#00FFE7'>
              <span style={{ fontSize: '50px' }} >{Selection.market_data ? '$' + Selection.market_data.current_price.usd : ''}</span>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_24h).toFixed(2) + '%' : ''}
            </font>
          </div> */}



          {/*  <div style={{height: '350px', border:'1px', borderColor:'white',
         borderStyle:'solid',
         borderRadius:'20px',
         paddingBottom:'70px',
         }}>
          <div style={{marginTop:'30px', color:'white', textAlign:'center'}}>{View}</div>
          
         <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 20, bottom: 100, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Price (USD)',
              legendOffset: -40,
              legendPosition: 'middle',
            }}
            enablePoints={false}
            enableGridX={false}
            enableGridY={false}
            colors={{ scheme: 'dark2' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            enableArea={true}
            areaOpacity={0.85}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[]}
          /> 

          

          <br/><br/>
        </div>*/}
          {Price && <Apexchart data={Price}></Apexchart>}
          <br />
          {/*  <center>
          <TransparentButton value='Week View' style={{
                height:'45px',
                width:'15%',
                background:'transparent',
                borderWidth:'1px',
                borderStyle:'solid',
                borderColor:'#ac6afc',
                borderRadius:'5px',
                color:'white',
                cursor:'pointer'
            }}
            onClick = {loadWeekData}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TransparentButton value='Month View' style={{
                height:'45px',
                width:'15%',
                background:'transparent',
                borderWidth:'1px',
                borderStyle:'solid',
                borderColor:'#ac6afc',
                borderRadius:'5px',
                color:'white',
                cursor:'pointer'
            }}
            onClick = {loadMonthData}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TransparentButton value='24H View' style={{
                height:'45px',
                width:'15%',
                background:'transparent',
                borderWidth:'1px',
                borderStyle:'solid',
                borderColor:'#ac6afc',
                borderRadius:'5px',
                color:'white',
                cursor:'pointer'
            }}
            onClick = {loadDayData}
            /></center> */}


          <hr style={{ marginTop: '8px', borderTop: '0px ', borderBottom: '1px solid #737373' }} />
          <div style={{ color: 'white', textAlign: 'left', marginTop: '15px' }}>STATS</div>
          <div>
            <BrowserView>
              <div style={{ width: '25%', height: '125px', display: 'inline-block', color: 'white', marginTop: '8px' }}>
                1 DAY
                <br /><br />
                <font color='#00FFE7'>
                  {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_24h).toFixed(2) + '%' : ''}
                </font>
                <br /><br /><br /><br />
              </div>

              <div style={{ width: '25%', height: '125px', display: 'inline-block', color: 'white' }}>
                1 MONTH
                <br /><br />
                <font color='#00FFE7'>
                  {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_30d).toFixed(2) + '%' : ''}
                </font>
                <br /><br /><br /><br />
              </div>

              <div style={{ width: '25%', height: '125px', display: 'inline-block', color: 'white' }}>
                2 MONTHS
                <br /><br />
                <font color='#00FFE7'>
                  {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_60d).toFixed(2) + '%' : ''}
                </font>
                <br /><br /><br /><br />
              </div>

              <div style={{ width: '25%', height: '125px', display: 'inline-block', color: 'white' }}>
                1 YEAR
                <br /><br />
                <font color='#00FFE7'>
                  {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_1y).toFixed(2) + '%' : ''}
                </font>
                <br /><br /><br /><br />
              </div>

              <br />

              <div style={{ width: '25%', height: '125px', display: 'inline-block', color: 'white' }}>
                MARKET CAP
                <br /><br />
                <font color='#00FFE7'>
                  {Selection.market_data ? '$' + Selection.market_data.market_cap.usd : ''}
                </font>
                <br /><br /><br /><br />
              </div>

              <div style={{ width: '25%', height: '125px', display: 'inline-block', color: 'white' }}>
                24H HIGH
                <br /><br />
                <font color='#00FFE7'>
                  {Selection.market_data ? '$' + Selection.market_data.high_24h.usd : ''}
                </font>
                <br /><br /><br /><br />
              </div>

              <div style={{ width: '25%', height: '125px', display: 'inline-block', color: 'white' }}>
                24H LOW
                <br /><br />
                <font color='#00FFE7'>
                  {Selection.market_data ? '$' + Selection.market_data.low_24h.usd : ''}
                </font>
                <br /><br /><br /><br />
              </div>

              <div style={{ width: '25%', height: '125px', display: 'inline-block', color: 'white' }}>
                COINGECKO SCORE
                <br /><br />
                <font color='#00FFE7'>
                  {Selection.coingecko_score ? Selection.coingecko_score : ''}
                </font>
                <br /><br /><br /><br />
              </div>
            </BrowserView>
            <MobileView>
              <div style={{ width: '50%', height: '125px', display: 'inline-block', color: 'white' }}>
                1 DAY
                <br /><br />
                <font color='#00FFE7'>
                  {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_24h).toFixed(2) + '%' : ''}
                </font>
                <br /><br /><br /><br />
              </div>

              <div style={{ width: '50%', height: '125px', display: 'inline-block', color: 'white' }}>
                1 MONTH
                <br /><br />
                <font color='#00FFE7'>
                  {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_30d).toFixed(2) + '%' : ''}
                </font>
                <br /><br /><br /><br />
              </div>
              <br />

              <div style={{ width: '50%', height: '125px', display: 'inline-block', color: 'white' }}>
                2 MONTHS
                <br /><br />
                <font color='#00FFE7'>
                  {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_60d).toFixed(2) + '%' : ''}
                </font>
                <br /><br /><br /><br />
              </div>

              <div style={{ width: '50%', height: '125px', display: 'inline-block', color: 'white' }}>
                1 YEAR
                <br /><br />
                <font color='#00FFE7'>
                  {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_1y).toFixed(2) + '%' : ''}
                </font>
                <br /><br /><br /><br />
              </div>

              <br />

              <div style={{ width: '50%', height: '125px', display: 'inline-block', color: 'white' }}>
                MARKET CAP
                <br /><br />
                <font color='#00FFE7'>
                  {Selection.market_data ? '$' + Selection.market_data.market_cap.usd : ''}
                </font>
                <br /><br /><br /><br />
              </div>

              <div style={{ width: '50%', height: '125px', display: 'inline-block', color: 'white' }}>
                24H HIGH
                <br /><br />
                <font color='#00FFE7'>
                  {Selection.market_data ? '$' + Selection.market_data.high_24h.usd : ''}
                </font>
                <br /><br /><br /><br />
              </div>

              <br />

              <div style={{ width: '50%', height: '125px', display: 'inline-block', color: 'white' }}>
                24H LOW
                <br /><br />
                <font color='#00FFE7'>
                  {Selection.market_data ? '$' + Selection.market_data.low_24h.usd : ''}
                </font>
                <br /><br /><br /><br />
              </div>

              <div style={{ width: '50%', height: '125px', display: 'inline-block', color: 'white' }}>
                COINGECKO SCORE
                <br /><br />
                <font color='#00FFE7'>
                  {Selection.coingecko_score ? Selection.coingecko_score : ''}
                </font>
                <br /><br /><br /><br />
              </div>

            </MobileView>
          </div>


          <hr style={{ marginTop: '8px', borderTop: '0px ', borderBottom: '1px solid #737373' }} />
          <br />
          <div style={{ color: 'white', textAlign: 'left' }}>ABOUT</div><br /><br />
          <div style={{ color: 'white', textAlign: 'left' }}>
          <ShowMoreText
                /* Default options */
                lines={3}
                more={<div style={{textAlign:'center'}}><TransparentButton value="Show More"/></div>}
                less={<div style={{textAlign:'center'}}><TransparentButton value="Less"/></div>}
                className="content-css"
                anchorClass="my-anchor-css-class"
                onClick={executeOnClick}
                expanded={false}
                // width={280}
                truncatedEndingComponent={<><br/><br/></>}
            >
            
            {Selection.description ? parse(Selection.description.en) : ''}
            </ShowMoreText>
          </div>
          <br /><br />
          <hr style={{ marginTop: '8px', borderTop: '0px ', borderBottom: '1px solid #737373' }} />
          <br />
          <div>
            <BrowserView>
              <div style={{ width: '20%', height: '125px', display: 'inline-block', color: '#00FFE7' }}>
                <a href={Selection.links ? Selection.links.chat_url[0] : ''} style={{ textDecoration: 'none', color: '#00FFE7' }} target='blank'>
                  Discord &#8599;
                </a>
              </div>

              <div style={{ width: '20%', height: '125px', display: 'inline-block', color: '#00FFE7' }}>
                <a href={Selection.links ? Selection.links.homepage[0] : ''} style={{ textDecoration: 'none', color: '#00FFE7' }} target='blank'>
                  Website &#8599;
                </a>
              </div>

              <div style={{ width: '20%', height: '125px', display: 'inline-block', color: '#00FFE7' }}>
                <a href={Selection.links ? `https://twitter.com/${Selection.links.twitter_screen_name}` : ''} style={{ textDecoration: 'none', color: '#00FFE7' }} target='blank'>
                  Twitter &#8599;
                </a>
              </div>

              <div style={{ width: '20%', height: '125px', display: 'inline-block', color: '#00FFE7' }}>
                <a href={Selection.links ? Selection.links.blockchain_site[0] : ''} style={{ textDecoration: 'none', color: '#00FFE7' }} target='blank'>
                  Etherscan &#8599;
                </a>
              </div>

              <div style={{ width: '20%', height: '125px', display: 'inline-block', color: '#00FFE7' }}>
                <a href={Selection.links ? `https://www.coingecko.com/en/coins/${Selection.id}` : ''} style={{ textDecoration: 'none', color: '#00FFE7' }} target='blank'>
                  Coingecko &#8599;
                </a>
              </div>
            </BrowserView>
            <MobileView>
              <div style={{ width: '33%', height: '125px', display: 'inline-block', color: '#00FFE7' }}>
                <a href={Selection.links ? Selection.links.chat_url[0] : ''} style={{ textDecoration: 'none', color: '#00FFE7' }} target='blank'>
                  Discord &#8599;
                </a>
              </div>

              <div style={{ width: '33%', height: '125px', display: 'inline-block', color: '#00FFE7' }}>
                <a href={Selection.links ? Selection.links.homepage[0] : ''} style={{ textDecoration: 'none', color: '#00FFE7' }} target='blank'>
                  Website &#8599;
                </a>
              </div>

              <div style={{ width: '33%', height: '125px', display: 'inline-block', color: '#00FFE7' }}>
                <a href={Selection.links ? `https://twitter.com/${Selection.links.twitter_screen_name}` : ''} style={{ textDecoration: 'none', color: '#00FFE7' }} target='blank'>
                  Twitter &#8599;
                </a>
              </div>

              <br />

              <div style={{ width: '50%', height: '125px', display: 'inline-block', color: '#00FFE7' }}>
                <a href={Selection.links ? Selection.links.blockchain_site[0] : ''} style={{ textDecoration: 'none', color: '#00FFE7' }} target='blank'>
                  Etherscan &#8599;
                </a>
              </div>

              <div style={{ width: '50%', height: '125px', display: 'inline-block', color: '#00FFE7' }}>
                <a href={Selection.links ? `https://www.coingecko.com/en/coins/${Selection.id}` : ''} style={{ textDecoration: 'none', color: '#00FFE7' }} target='blank'>
                  Coingecko &#8599;
                </a>
              </div>
            </MobileView>
          </div>

        </div>
      ) : (
        ''
      )}
    </div>
  )
}
