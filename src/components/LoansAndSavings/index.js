import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Index() {

    const [SavingsContent, setSavingsContent] = useState([])
    const [LoansContent, setLoansContent] = useState([])
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

    useEffect(() => {
        async function getData(){
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
                        setSavingsData(savings)
                        SetLoansData(loans)
                    }

                    // console.log(response.data.data.userReserves)
            })
        }
        getData()
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
            </center>
        </div>
    )
}
