import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Index() {

    const [SavingsContent, setSavingsContent] = useState([])
    const [LoansContent, setLoansContent] = useState([])
    const [PoolsContent, setPoolsContent] = useState([])
    const [PoolsData, setPoolsData] = useState([])
    const [SavingsData, setSavingsData] = useState([])
    const [LoansData, SetLoansData] = useState([])

    useEffect(()=>{
        var content = SavingsData.map((object)=>
        <div style={{width:'80%'}}>
            <div style={{display:'inline-block', width:'10%'}}>
                <img src={object.image}/>
            </div>

            <div style={{display:'inline-block', width:'30%', textAlign:'left'}}>
                {object.name} 
            </div>

            <div style={{display:'inline-block', width:'30%'}}>
                {object.value} ${object.symbol}
            </div>

            <div style={{display:'inline-block', width:'30%'}}>
                {object.totalInvestment} USD 
            </div>
        
        </div>
        )

        setSavingsContent(content)

    },[SavingsData])

    useEffect(()=>{
        var content = LoansData.map((object)=>
        <div style={{width:'80%'}}>
            <div style={{display:'inline-block', width:'10%'}}>
                <img src={object.image}/>
            </div>

            <div style={{display:'inline-block', width:'30%', textAlign:'left'}}>
                {object.name} 
            </div>

            <div style={{display:'inline-block', width:'30%'}}>
                {object.value} ${object.symbol}
            </div>

            <div style={{display:'inline-block', width:'30%'}}>
                {object.totalInvestment} USD 
            </div>
        
        </div> 
        )

        setLoansContent(content)

    },[LoansData])

    useEffect(()=>{
        var content = PoolsData.map((object)=>
        <div style={{width:'80%'}}>
            <div style={{display:'inline-block', width:'25%', overflow:'hidden'}}>
                ${object.token0Symbol}
            </div>

            <div style={{display:'inline-block', width:'20%', textAlign:'left', overflow:'hidden'}}>
                ${object.token1Symbol} 
            </div>
            <div style={{display:'inline-block', width:'5%', textAlign:'left', overflow:'hidden'}}>
                
            </div>
            <div style={{display:'inline-block', width:'10%', overflow:'hidden'}}>
                {((object.tokenBalance/object.tokenSupply)*100).toFixed(2)}  %
            </div>

            <div style={{display:'inline-block', width:'20%', overflow:'hidden'}}>
                {parseFloat(object.tokenBalance).toFixed(2)} $LP
            </div>

            <div style={{display:'inline-block', width:'20%', overflow:'hidden'}}>
                {object.totalInvestment} USD 
            </div>
        
        </div> 
        )

        setPoolsContent(content)

    },[PoolsData])

    useEffect(() => {
        setSavingsData([])
        SetLoansData([])
        async function getAaveV2Data(){
            await axios.post(`https://api.thegraph.com/subgraphs/name/aave/protocol-v2`,
            {
                query:`{
                    userReserves(
                      where:{
                        user:"0x0003fca368838e813fb6d80e6ade47104980158a"
                      }
                    )
                    {
                      reserve{
                        symbol
                        name
                        aToken{
                          underlyingAssetAddress
                          underlyingAssetDecimals
                        }
                      }
                      currentATokenBalance
                      currentVariableDebt
                    }
                  }`})
                .then(async(response) => {
                    if(response.data.data){
                        var savings = []
                        var loans = []
                        var res = response.data.data.userReserves

                        for(var i =0 ; i<res.length; i++){

                            await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${res[i].reserve.aToken.underlyingAssetAddress}`,{},{})
                            .then(async(priceData)=>{
                                // console.log(priceData.data);
                                res[i].image = priceData.data.image.thumb
                                res[i].price = priceData.data.market_data.current_price.usd
                            })
                            
                            if(res[i].currentATokenBalance>0){
                                var object = {}
                                object.name = res[i].reserve.name;
                                object.symbol = res[i].reserve.symbol;
                                object.tokenAddress = res[i].reserve.aToken.underlyingAssetAddress;
                                object.value = (parseFloat(res[i].currentATokenBalance)/(10**parseInt(res[i].reserve.aToken.underlyingAssetDecimals))).toFixed(2)
                                object.image = res[i].image
                                object.price = res[i].price
                                object.totalInvestment = (object.value * object.price).toFixed(2)
                                savings.push(object)
                            }

                            if(res[i].currentVariableDebt>0){
                                var object = {}
                                object.name = res[i].reserve.name;
                                object.symbol = res[i].reserve.symbol;
                                object.tokenAddress = res[i].reserve.aToken.underlyingAssetAddress;
                                object.value = (parseFloat(res[i].currentVariableDebt)/(10**parseInt(res[i].reserve.aToken.underlyingAssetDecimals))).toFixed(2)
                                object.image = res[i].image
                                object.price = res[i].price
                                object.totalInvestment = (object.value * object.price).toFixed(2)
                                loans.push(object)
                            }
                        }
                        savings.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
                        loans.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
                        // savings = SavingsData.concat(savings)
                        // loans = LoansData.concat(loans)
                        setSavingsData(savings)
                        SetLoansData(loans)
                    }

                    // console.log(response.data.data.userReserves)
            })
        }
        async function getUniV2Data(){
            await axios.post(`https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2`,
            {
                query:`{
                    liquidityPositionSnapshots(
                      first:1000
                      where:{
                        user:"0x37d50885b44500a2eacab7c93dd349590600f05f"
                          liquidityTokenBalance_gt:0
                      }
                      
                      orderBy:timestamp
                      orderDirection:desc
                    )
                    
                    {
                      pair{
                        id
                        reserveUSD
                        token0{
                          name
                          symbol
                        }
                        token1{
                          name
                          symbol
                        }
                      }
                      timestamp
                      liquidityTokenBalance
                      liquidityTokenTotalSupply
                      reserveUSD
                    }
                  }
                  `})
                .then(async(response) => {
                    if(response.data.data){
                        var buffer =[]
                        var pools = []
                        console.log(response.data.data)
                        var res = response.data.data.liquidityPositionSnapshots
                        for(var i =0; i<res.length; i++){
                            var index = buffer.indexOf(res[i].pair.id)
                            if(index===-1){
                                var object = {}
                                object.tokenBalance = res[i].liquidityTokenBalance;
                                object.tokenSupply = res[i].liquidityTokenTotalSupply;
                                object.token0Symbol = res[i].pair.token0.symbol
                                object.token1Symbol = res[i].pair.token1.symbol
                                object.liquidity2 = res[i].pair.reserveUSD
                                object.liquidity = res[i].reserveUSD
                                object.totalInvestment = ((res[i].liquidityTokenBalance/res[i].liquidityTokenTotalSupply)*res[i].pair.reserveUSD).toFixed(2)
                                object.timeStamp = res[i].timestamp
                                buffer.push(res[i].pair.id)
                                pools.push(object)
                            }
                            
                        }
                        pools.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
                        console.log(pools)
                        setPoolsData(pools)
                    }
                })
        }
        getAaveV2Data()
        getUniV2Data()
    }, [])

    return (
        <div>
            <center>
            <h1>AAVE V2</h1> <br/><br/>
            <h2>SAVINGS</h2> <br/>
            {SavingsContent}

            <br/>

            <h2>LOANS</h2> <br/>
            {LoansContent}
            
            <br/>
            <br/>
            
            <h2>POOLS</h2> <br/>
            <div style={{width:'80%'}}>
            <div style={{display:'inline-block', width:'25%', overflow:'hidden'}}>
                Token1
            </div>

            <div style={{display:'inline-block', width:'20%', textAlign:'left', overflow:'hidden'}}>
                Token2
            </div>

            <div style={{display:'inline-block', width:'5%', textAlign:'left', overflow:'hidden'}}>
               
            </div>

            <div style={{display:'inline-block', width:'10%', overflow:'hidden'}}>
                Pool%
            </div>

            <div style={{display:'inline-block', width:'20%', overflow:'hidden'}}>
                LP Token Balance
            </div>

            <div style={{display:'inline-block', width:'20%', overflow:'hidden'}}>
                Investment
            </div>
        
        </div> 
        <hr style={{width:'80%'}}/>
        <br/>
            {PoolsContent}
            </center>
        </div>
    )
}
