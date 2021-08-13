/* eslint-disable */
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import TransparentButton from '../components/TransparentButton'
// import AmountInput from '../components/amountInput'

export default function LiquidityPools() {

    const [Data, setData] = useState([])
    const [Content, setContent] = useState('')

    useEffect(() => {
        var content = Data.map((object)=>
        <>  

        <br/>
        <Accordion style={{background:'transparent', marginLeft:'40px', color:'white', width:'90%', border:'1px', borderColor:'white', borderStyle:'solid'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <div style={{height:'60px', width:'100%'}}>
            <div style={{display:'inline-block', width:'5%'}}>
                
            </div>

            <div style={{display:'inline-block', width:'25%'}}>
                <br/>
                {object.token0.symbol} {object.token1.symbol}
            </div> 

            <div style={{display:'inline-block', width:'30%'}}>
                <br/>
                {parseFloat(object.reserveUSD).toFixed(2)} USD
            </div>

            <div style={{display:'inline-block', width:'30%', marginTop:'10px'}}>
                
                {((parseInt(object.dailyVolumeUSD)*0.003)/parseInt(object.reserveUSD)*100*365).toFixed(2)} % (Yearly)<br/>
                {((parseInt(object.dailyVolumeUSD)*0.003)/parseInt(object.reserveUSD)*100*7).toFixed(2)} % (Weekly)
            </div>
            <div style={{display:'inline-block', width:'10%',}}>
            
                <img style={{ height:'30px', width:'30px',display:'inline-block'}} alt='' src={`https://ethplorer.io${object.token0.image}`}/>
                &nbsp;&nbsp;&nbsp;
                <img style={{ height:'30px', width:'30px',display:'inline-block'}} alt='' src={`https://ethplorer.io${object.token1.image}`}/>
            
            </div>

        </div>
        </AccordionSummary>
        <AccordionDetails>
        
        </AccordionDetails>
        </Accordion>
        
        </>
        )
        setContent(content)
    }, [Data])

    useEffect(() => {
        // console.log('lol')
        var d = new Date()
        var day = d.getUTCDate()
        var month = d.getUTCMonth()
        var year = d.getUTCFullYear()
        var offset = new Date(year, month, day).getTimezoneOffset() * 60
        var epoch = new Date(year, month, day).getTime()/1000 - offset;
        
        // console.log(epoch)
        async function getData(){
            await axios.post(`https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2`,
            {
                query:`
                {
                    pairDayDatas(first: 20,
                       where:{
                        date:${epoch}
                      }
                        orderBy:dailyVolumeUSD,
                        orderDirection: desc)
                    {
                      id
                      token0 {
                        id
                        symbol
                            name
                      }
                      token1 {
                        id
                        symbol
                        name
                      }
                      date
                      reserveUSD
                      dailyVolumeUSD
                    }
                }`})
                .then(async(response) => {
                    if(response.data.data){
                        var res = response.data.data.pairDayDatas
                        for(var i =0; i<res.length; i++){
                            await axios.get(`https://api.ethplorer.io/getTokenInfo/${res[i].token0.id}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,{},{})
                            .then((response) => {
                                if(response.data.image){
                                    // console.log(response.data.image)
                                    res[i].token0.image = response.data.image
                                }
                            })
                            await axios.get(`https://api.ethplorer.io/getTokenInfo/${res[i].token1.id}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,{},{})
                            .then((response) => {
                                if(response.data.image){
                                    res[i].token1.image = response.data.image

                                }
                            })
                        }
                        setData(res)
                    console.log(res)

                    }
            })
        }   
        getData()     
    }, [])

    return (
        <div>
            <center>
            <h1 style={{fontSize:'40px', color:'white'}}>Liquidity Pools</h1>
            </center>
            
            {Content}
        </div>
    )
}
