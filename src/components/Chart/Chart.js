// import { ResponsiveLine } from '@nivo/line'
// eslint-disable-next-line
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import parse from "html-react-parser";
import {useParams} from 'react-router-dom';
import ShowMoreText from "react-show-more-text";
import TransparentButton from '../TransparentButton/index'
import {ChartAllData} from './ChartDataFetch/ChartDataFetch'
import {BrowserView, MobileView} from 'react-device-detect';
import Apexchart from './Apexchart';
import {Grid, Stack, Typography} from '@material-ui/core';
// import { AiFillTwitterCircle } from "react-icons/ai";
// import { FaTelegram } from "react-icons/fa";
import ExchangeMini from '../exchengeMini/exchange';

export const Chart = () => {

    const {tokenid} = useParams();
    const {address} = useParams();
    const [Price, setPrice] = useState(null)
    const [Selection, setSelection] = useState(null)
    const [tokenAddress, setTokenAddress] = useState('')
    // eslint-disable-next-line
    const [View, setView] = useState('Month View')

    const [CurrentValue, setCurrentValue] = useState(0)
    const [AvgTotalPrice, setAvgTotalPrice] = useState(0)
    const [Profit, setProfit] = useState(0)
    const [ProfitPercent, setProfitPercent] = useState(0)
    const [AccumulatingCost, setAccumulatingCost] = useState(0)
    const [TotalTokens, setTotalTokens] = useState(0)
    // const [Token, setToken] = useState('aave')

    React.useEffect(() => {

        // console.log(tokenid)
        // console.log(tokenid)
        axios.get(`https://api.coingecko.com/api/v3/coins/${tokenid}`, {}, {})
            .then(async (response) => {
                await setTokenAddress(response.data.contract_address)
                await setSelection(response.data)

            })
        setView('Month View')
        // console.log("heelo1")
        if (tokenid !== '' && tokenid !== null && tokenid !== undefined) {
            // console.log("heelo2")

            console.log(1, tokenid)
            ChartAllData(tokenid).then((res) => {
                setPrice(res)
                // console.log(Price)
            })

        } else {
            alert('Data Not Available For This Coin!')
        }


    }, [tokenid]);


    useEffect(() => {
        let buyDetails = {tokens: 0, usd: 0}
        let sellDetails = {tokens: 0, usd: 0}
        let totalDetails = {tokens: 0, usd: 0}
        let res3 = 0

        axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${tokenAddress}&address=${address}&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`)
            .then(async (response) => {
                var res1 = response.data.result
                console.log('res1', res1)

                for (var i = 0; i < res1.length; i++) {

                    var d = new Date(0)
                    d.setUTCSeconds(res1[i].timeStamp);
                    var day = d.getUTCDate()
                    var month = d.getUTCMonth() + 1
                    var year = d.getUTCFullYear()
                    console.log('date', day, month, year)

                    await axios.get(`https://api.coingecko.com/api/v3/coins/${tokenid}/history?date=${day + '-' + month + '-' + year}&localization=false`)
                        .then(async (response) => {
                            if (response.data.market_data) {

                                var res2 = response.data.market_data.current_price.usd
                                console.log('res2', res2)

                                if (res1[i].to === address) {
                                    buyDetails.tokens += res1[i].value / (10 ** res1[i].tokenDecimal)
                                    buyDetails.usd += res1[i].value / (10 ** res1[i].tokenDecimal) * res2
                                } else {
                                    sellDetails.tokens += res1[i].value / (10 ** res1[i].tokenDecimal)
                                    sellDetails.usd += res1[i].value / (10 ** res1[i].tokenDecimal) * res2
                                }

                                totalDetails.tokens = buyDetails.tokens - sellDetails.tokens
                                totalDetails.usd = buyDetails.usd - sellDetails.usd
                            }
                        })

                    var avgBuyPrice = buyDetails.usd / buyDetails.tokens
                    var avgSellPrice = sellDetails.usd / sellDetails.tokens
                    var avgTotalPrice = totalDetails.usd / totalDetails.tokens
                }

                var today = new Date()
                var day2 = today.getUTCDate()
                var month2 = today.getUTCMonth() + 1
                var year2 = today.getUTCFullYear()

                await axios.get(`https://api.coingecko.com/api/v3/coins/${tokenid}/history?date=${day2 + '-' + month2 + '-' + year2}&localization=false`)
                    .then(async (response) => {
                        res3 = response.data.market_data.current_price.usd
                        console.log('res3', res3)
                    })

                var currentValue = res3 * totalDetails.tokens
                var unrealisedProfit = currentValue - totalDetails.usd
                var profitPercent = (unrealisedProfit / totalDetails.usd) * 100

                setCurrentValue(currentValue);
                setAvgTotalPrice(avgTotalPrice)
                setProfit(unrealisedProfit)
                setProfitPercent(profitPercent)
                setTotalTokens(totalDetails.tokens)
                setAccumulatingCost(totalDetails.usd)

                console.log('buy', buyDetails)
                console.log('sell', sellDetails)
                console.log('totalDetails', totalDetails)
                console.log('BuyPrice', avgBuyPrice)
                console.log('SellPrice', avgSellPrice)
                console.log('TotalPrice', avgTotalPrice)
                console.log('CurrentValue', currentValue)
                console.log('UnrealisedProfit', unrealisedProfit)
                console.log('ProfitPercentage', profitPercent)

            })

    }, [tokenAddress])

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
        <Grid container>
            <Grid item md={8}>
                <div>

                    {Selection ? (
                        <div style={{width: '100%', margin: 'auto', marginLeft: '27px'}}>

                            <div style={{textAlign: 'left', marginTop: '20px'}}>
                                <Stack direction='row'>
                                    <img alt='' style={{marginTop: '5px', height: '40px', width: '40px'}}
                                         src={Selection.image ? Selection.image.small : ''}/>
                                    <Typography variant='body2' sx={{
                                        mt: 2,
                                        ml: 1,
                                        color: '#737373'
                                    }}>{Selection.symbol ? Selection.symbol.toUpperCase() : ''}</Typography>
                                </Stack>
                                <div>

                                    <Typography variant='h3'
                                                sx={{mt: 1.5}}>{Selection.name ? Selection.name.toUpperCase() : ''}

                                    </Typography>

                                </div>
                                <Typography variant='body2' sx={{color: '#00FFE7'}}>
                                    <span
                                        style={{fontSize: '30px'}}>{Selection.market_data ? '$' + Selection.market_data.current_price.usd : ''}</span>

                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_24h).toFixed(2) + '%' : ''}
                                </Typography>

                            </div>

                            {Price && <Apexchart data={Price}></Apexchart>}
                            <br/>


                            <hr style={{marginTop: '8px', borderTop: '0px ', borderBottom: '1px solid #737373'}}/>
                            <div
                                style={{color: 'white', textAlign: 'left', marginTop: '15px', fontSize: '28px'}}>STATS
                            </div>
                            <br/>
                            <div>
                                <BrowserView>

                                    <div style={{border: '1px solid white', paddingLeft: '5%', borderRadius: '10px'}}>

                                        <br/>

                                        <div style={{
                                            marginLeft: '25%',
                                            width: '25%',
                                            height: '125px',
                                            display: 'inline-block',
                                            color: 'white',
                                            marginTop: '8px'
                                        }}>
                                            Tokens Holding
                                            <br/><br/>
                                            <font color='#00FFE7'>
                                                {TotalTokens ? parseFloat(TotalTokens).toFixed(2) + '  $' + (Selection.symbol ? Selection.symbol.toUpperCase() : '') : ''}
                                            </font>
                                            <br/><br/><br/><br/>
                                        </div>

                                        <div style={{
                                            width: '25%',
                                            height: '125px',
                                            display: 'inline-block',
                                            color: 'white'
                                        }}>
                                            Accumulation Cost
                                            <br/><br/>
                                            <font color='#00FFE7'>
                                                {AccumulatingCost ? '$ ' + parseFloat(AccumulatingCost).toFixed(2) : ''}
                                            </font>
                                            <br/><br/><br/><br/>
                                        </div>


                                        <br/>

                                        <div style={{
                                            width: '25%',
                                            height: '125px',
                                            display: 'inline-block',
                                            color: 'white',
                                            marginTop: '8px'
                                        }}>
                                            Total HODL Value
                                            <br/><br/>
                                            <font color='#00FFE7'>
                                                {CurrentValue ? '$ ' + parseFloat(CurrentValue).toFixed(2) : ''}
                                            </font>
                                            <br/><br/><br/><br/>
                                        </div>

                                        <div style={{
                                            width: '25%',
                                            height: '125px',
                                            display: 'inline-block',
                                            color: 'white'
                                        }}>
                                            Avg. Buying Cost
                                            <br/><br/>
                                            <font color='#00FFE7'>
                                                {AvgTotalPrice ? '$ ' + parseFloat(AvgTotalPrice).toFixed(2) : ''}
                                            </font>
                                            <br/><br/><br/><br/>
                                        </div>

                                        <div style={{
                                            width: '25%',
                                            height: '125px',
                                            display: 'inline-block',
                                            color: 'white'
                                        }}>
                                            Profit/Loss
                                            <br/><br/>
                                            <font color='#00FFE7'>
                                                {Profit ? '$ ' + parseFloat(Profit).toFixed(2) : ''}
                                            </font>
                                            <br/><br/><br/><br/>
                                        </div>

                                        <div style={{
                                            width: '25%',
                                            height: '125px',
                                            display: 'inline-block',
                                            color: 'white'
                                        }}>
                                            Profit/Loss Percent
                                            <br/><br/>
                                            <font color='#00FFE7'>
                                                {ProfitPercent ? parseFloat(ProfitPercent).toFixed(2) + '%' : ''}
                                            </font>
                                            <br/><br/><br/><br/>
                                        </div>

                                    </div>

                                    <br/>

                                    <div style={{
                                        width: '25%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: 'white',
                                        marginTop: '8px'
                                    }}>
                                        1 DAY
                                        <br/><br/>
                                        <font color='#00FFE7'>
                                            {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_24h).toFixed(2) + '%' : ''}
                                        </font>
                                        <br/><br/><br/><br/>
                                    </div>

                                    <div style={{
                                        width: '25%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: 'white'
                                    }}>
                                        1 MONTH
                                        <br/><br/>
                                        <font color='#00FFE7'>
                                            {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_30d).toFixed(2) + '%' : ''}
                                        </font>
                                        <br/><br/><br/><br/>
                                    </div>

                                    <div style={{
                                        width: '25%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: 'white'
                                    }}>
                                        2 MONTHS
                                        <br/><br/>
                                        <font color='#00FFE7'>
                                            {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_60d).toFixed(2) + '%' : ''}
                                        </font>
                                        <br/><br/><br/><br/>
                                    </div>

                                    <div style={{
                                        width: '25%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: 'white'
                                    }}>
                                        1 YEAR
                                        <br/><br/>
                                        <font color='#00FFE7'>
                                            {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_1y).toFixed(2) + '%' : ''}
                                        </font>
                                        <br/><br/><br/><br/>
                                    </div>

                                    <br/>

                                    <div style={{
                                        width: '25%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: 'white'
                                    }}>
                                        MARKET CAP
                                        <br/><br/>
                                        <font color='#00FFE7'>
                                            {Selection.market_data ? '$' + Selection.market_data.market_cap.usd : ''}
                                        </font>
                                        <br/><br/><br/><br/>
                                    </div>

                                    <div style={{
                                        width: '25%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: 'white'
                                    }}>
                                        24H HIGH
                                        <br/><br/>
                                        <font color='#00FFE7'>
                                            {Selection.market_data ? '$' + Selection.market_data.high_24h.usd : ''}
                                        </font>
                                        <br/><br/><br/><br/>
                                    </div>

                                    <div style={{
                                        width: '25%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: 'white'
                                    }}>
                                        24H LOW
                                        <br/><br/>
                                        <font color='#00FFE7'>
                                            {Selection.market_data ? '$' + Selection.market_data.low_24h.usd : ''}
                                        </font>
                                        <br/><br/><br/><br/>
                                    </div>

                                    <div style={{
                                        width: '25%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: 'white'
                                    }}>
                                        COINGECKO SCORE
                                        <br/><br/>
                                        <font color='#00FFE7'>
                                            {Selection.coingecko_score ? Selection.coingecko_score : ''}
                                        </font>
                                        <br/><br/><br/><br/>
                                    </div>
                                </BrowserView>
                                <MobileView>
                                    <div style={{
                                        width: '50%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: 'white'
                                    }}>
                                        1 DAY
                                        <br/><br/>
                                        <font color='#00FFE7'>
                                            {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_24h).toFixed(2) + '%' : ''}
                                        </font>
                                        <br/><br/><br/><br/>
                                    </div>

                                    <div style={{
                                        width: '50%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: 'white'
                                    }}>
                                        1 MONTH
                                        <br/><br/>
                                        <font color='#00FFE7'>
                                            {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_30d).toFixed(2) + '%' : ''}
                                        </font>
                                        <br/><br/><br/><br/>
                                    </div>
                                    <br/>

                                    <div style={{
                                        width: '50%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: 'white'
                                    }}>
                                        2 MONTHS
                                        <br/><br/>
                                        <font color='#00FFE7'>
                                            {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_60d).toFixed(2) + '%' : ''}
                                        </font>
                                        <br/><br/><br/><br/>
                                    </div>

                                    <div style={{
                                        width: '50%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: 'white'
                                    }}>
                                        1 YEAR
                                        <br/><br/>
                                        <font color='#00FFE7'>
                                            {Selection.market_data ? parseFloat(Selection.market_data.price_change_percentage_1y).toFixed(2) + '%' : ''}
                                        </font>
                                        <br/><br/><br/><br/>
                                    </div>

                                    <br/>

                                    <div style={{
                                        width: '50%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: 'white'
                                    }}>
                                        MARKET CAP
                                        <br/><br/>
                                        <font color='#00FFE7'>
                                            {Selection.market_data ? '$' + Selection.market_data.market_cap.usd : ''}
                                        </font>
                                        <br/><br/><br/><br/>
                                    </div>

                                    <div style={{
                                        width: '50%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: 'white'
                                    }}>
                                        24H HIGH
                                        <br/><br/>
                                        <font color='#00FFE7'>
                                            {Selection.market_data ? '$' + Selection.market_data.high_24h.usd : ''}
                                        </font>
                                        <br/><br/><br/><br/>
                                    </div>

                                    <br/>

                                    <div style={{
                                        width: '50%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: 'white'
                                    }}>
                                        24H LOW
                                        <br/><br/>
                                        <font color='#00FFE7'>
                                            {Selection.market_data ? '$' + Selection.market_data.low_24h.usd : ''}
                                        </font>
                                        <br/><br/><br/><br/>
                                    </div>

                                    <div style={{
                                        width: '50%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: 'white'
                                    }}>
                                        COINGECKO SCORE
                                        <br/><br/>
                                        <font color='#00FFE7'>
                                            {Selection.coingecko_score ? Selection.coingecko_score : ''}
                                        </font>
                                        <br/><br/><br/><br/>
                                    </div>

                                </MobileView>
                            </div>


                            <hr style={{marginTop: '8px', borderTop: '0px ', borderBottom: '1px solid #737373'}}/>
                            <br/>
                            <div style={{color: 'white', textAlign: 'left'}}>ABOUT</div>
                            <br/><br/>
                            <div style={{color: 'white', textAlign: 'left'}}>
                                <ShowMoreText
                                    /* Default options */
                                    lines={3}
                                    more={<div style={{textAlign: 'center'}}><TransparentButton value="Show More"/>
                                    </div>}
                                    less={<div style={{textAlign: 'center'}}><TransparentButton value="Less"/></div>}
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
                            <br/><br/>
                            <hr style={{marginTop: '8px', borderTop: '0px ', borderBottom: '1px solid #737373'}}/>
                            <br/>
                            <div>
                                <BrowserView>
                                    <div style={{
                                        width: '20%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: '#00FFE7'
                                    }}>
                                        <a href={Selection.links ? Selection.links.chat_url[0] : ''}
                                           style={{textDecoration: 'none', color: '#00FFE7'}} target='blank'>
                                            Discord &#8599;
                                        </a>
                                    </div>

                                    <div style={{
                                        width: '20%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: '#00FFE7'
                                    }}>
                                        <a href={Selection.links ? Selection.links.homepage[0] : ''}
                                           style={{textDecoration: 'none', color: '#00FFE7'}} target='blank'>
                                            Website &#8599;
                                        </a>
                                    </div>

                                    <div style={{
                                        width: '20%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: '#00FFE7'
                                    }}>
                                        <a href={Selection.links ? `https://twitter.com/${Selection.links.twitter_screen_name}` : ''}
                                           style={{textDecoration: 'none', color: '#00FFE7'}} target='blank'>
                                            Twitter &#8599;
                                        </a>
                                    </div>

                                    <div style={{
                                        width: '20%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: '#00FFE7'
                                    }}>
                                        <a href={Selection.links ? Selection.links.blockchain_site[0] : ''}
                                           style={{textDecoration: 'none', color: '#00FFE7'}} target='blank'>
                                            Etherscan &#8599;
                                        </a>
                                    </div>

                                    <div style={{
                                        width: '20%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: '#00FFE7'
                                    }}>
                                        <a href={Selection.links ? `https://www.coingecko.com/en/coins/${Selection.id}` : ''}
                                           style={{textDecoration: 'none', color: '#00FFE7'}} target='blank'>
                                            Coingecko &#8599;
                                        </a>
                                    </div>
                                </BrowserView>
                                <MobileView>
                                    <div style={{
                                        width: '33%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: '#00FFE7'
                                    }}>
                                        <a href={Selection.links ? Selection.links.chat_url[0] : ''}
                                           style={{textDecoration: 'none', color: '#00FFE7'}} target='blank'>
                                            Discord &#8599;
                                        </a>
                                    </div>

                                    <div style={{
                                        width: '33%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: '#00FFE7'
                                    }}>
                                        <a href={Selection.links ? Selection.links.homepage[0] : ''}
                                           style={{textDecoration: 'none', color: '#00FFE7'}} target='blank'>
                                            Website &#8599;
                                        </a>
                                    </div>

                                    <div style={{
                                        width: '33%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: '#00FFE7'
                                    }}>
                                        <a href={Selection.links ? `https://twitter.com/${Selection.links.twitter_screen_name}` : ''}
                                           style={{textDecoration: 'none', color: '#00FFE7'}} target='blank'>
                                            Twitter &#8599;
                                        </a>
                                    </div>

                                    <br/>

                                    <div style={{
                                        width: '50%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: '#00FFE7'
                                    }}>
                                        <a href={Selection.links ? Selection.links.blockchain_site[0] : ''}
                                           style={{textDecoration: 'none', color: '#00FFE7'}} target='blank'>
                                            Etherscan &#8599;
                                        </a>
                                    </div>

                                    <div style={{
                                        width: '50%',
                                        height: '125px',
                                        display: 'inline-block',
                                        color: '#00FFE7'
                                    }}>
                                        <a href={Selection.links ? `https://www.coingecko.com/en/coins/${Selection.id}` : ''}
                                           style={{textDecoration: 'none', color: '#00FFE7'}} target='blank'>
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
            </Grid>
            <Grid item md={4}>
                <ExchangeMini/>
            </Grid>
        </Grid>
    )
}
