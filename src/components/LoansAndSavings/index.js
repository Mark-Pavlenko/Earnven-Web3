import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Tooltip from '@material-ui/core/Tooltip';
import YearnLogo from '../../assets/icons/yearnLogo.png'

export default function Index({accountAddress}) {

    const [SavingsContent, setSavingsContent] = useState([]) //aave v2
    const [LoansContent, setLoansContent] = useState([]) // aave v2
    const [SavingsData, setSavingsData] = useState([]) // aave v2
    const [LoansData, SetLoansData] = useState([]) // aave v2

    const [PoolsContent, setPoolsContent] = useState([]) //UNI v2
    const [PoolsData, setPoolsData] = useState([]) //UNI v2

    const [SushiPoolsContent, setSushiPoolsContent] = useState([]) //Sushi v2
    const [SushiPoolsData, setSushiPoolsData] = useState([]) //Sushi v2

    const [CompoundSavingsContent, setCompoundSavingsContent] = useState([]) //compound v2
    const [CompoundLoansContent, setCompoundLoansContent] = useState([]) //compound v2
    const [CompoundSavingsData, setCompoundSavingsData] = useState([]) //compound v2
    const [CompoundLoansData, SetCompoundLoansData] = useState([]) //compound v2

    const [BalancerPoolsData, setBalancerPoolsData] = useState([]) //Balancer
    const [BalancerPoolsContent, setBalancerPoolsContent] = useState([]) //Balancer

    const [BancorPoolsData, setBancorPoolsData] = useState([]) //bancor
    const [BancorPoolsContent, setBancorPoolsContent] = useState([]) //bancor

    const [YearnData, setYearnData] = useState([]) //Yearn
    const [YearnContent, setYearnContent] = useState([]) //Yearn

    const [SynthetixData, setSynthetixData] = useState([]) //Synthetix
    const [SynthetixContent, setSynthetixContent] = useState([]) //Synethetix

    const [PolygonTokenData, setPolygonTokenData] = useState([])
    const [PolygonTokenContent, setPolygonTokenContent] = useState([])

    useEffect(()=>{
        var content = SavingsData.map((object)=>
        <Tooltip
        title={
            <React.Fragment>
                {object.name} <br/>
              Token Price : {parseFloat(object.price).toFixed(4)} USD <br/>
              Total Tokens : {object.value} ${object.symbol} <br/>
              Total Investment : {object.totalInvestment} USD
            </React.Fragment>
          }>
        <div style={{width:'90%', marginTop:'12px', marginLeft:'30px'}}>

            <div style={{display:'inline-block', width:'15%'}}>
                <div style={{ height:'40px', padding:'5px' , borderRadius:'10px', backgroundImage:'linear-gradient(to right,  rgba(20,24,30,.1), rgba(173,204,151,.5), rgba(20,24,30,.1))'}} >
                  <center>
                <img src={object.image} style={{height:'30px', marginTop:''}} alt=""/>
                  </center>
                </div>
            </div>

            <div style={{display:'inline-block', width:'10%'}}>
            </div>

            <div style={{display:'inline-block', width:'30%', textAlign:'left'}}>
                ${object.symbol}
            </div>

            {/* <div style={{display:'inline-block', width:'30%'}}>
                {object.value} ${object.symbol}
            </div> */}

            <div style={{display:'inline-block', width:'40%', fontSize:'13px'}}>
                {object.totalInvestment} USD
            </div>

            <br/>
        </div>
        </Tooltip>
        )

        setSavingsContent(content)

    },[SavingsData])

    useEffect(()=>{
        var content = LoansData.map((object)=>
        <Tooltip
        title={
            <React.Fragment>
                {object.name} <br/>
              Token Price : {parseFloat(object.price).toFixed(4)} USD <br/>
              Total Tokens : {object.value} ${object.symbol} <br/>
              Total Investment : {object.totalInvestment} USD
            </React.Fragment>
          }>
        <div style={{width:'90%', marginTop:'12px', marginLeft:'30px'}}>

<div style={{display:'inline-block', width:'15%'}}>
<div style={{ height:'40px', padding:'5px' , borderRadius:'10px', backgroundImage:'linear-gradient(to right,  rgba(20,24,30,.1), rgba(173,204,151,.5), rgba(20,24,30,.1))'}} >
    <center>
    <img src={object.image} style={{height:'30px', marginTop:''}} alt=""/>
    </center>
    </div>
</div>

<div style={{display:'inline-block', width:'10%'}}>
</div>

<div style={{display:'inline-block', width:'30%', textAlign:'left'}}>
    ${object.symbol}
</div>

{/* <div style={{display:'inline-block', width:'30%'}}>
    {object.value} ${object.symbol}
</div> */}

<div style={{display:'inline-block', width:'40%', fontSize:'13px'}}>
    {object.totalInvestment} USD
</div>

<br/>
</div>
        </Tooltip>
        )

        setLoansContent(content)

    },[LoansData])

    useEffect(()=>{
        var content = PoolsData.map((object)=>

        <Tooltip
        title={
            <React.Fragment>
              Token 0 : {object.token0name} <br/>
              Token 1 : {object.token1name} <br/>
              Pool Share : {parseFloat(object.tokenBalance/object.tokenSupply*100).toFixed(2)} % <br/>
              Pool Liquidity : {parseFloat(object.liquidity).toFixed(2)} <br/>
              Total Investment : {object.totalInvestment} USD
            </React.Fragment>
          }>
        <div style={{width:'90%', marginTop:'12px', marginLeft:'30px'}}>

            <div style={{display:'inline-block', width:'45%', textAlign:'left', wordBreak:'break-all'}}>
                ${object.token0Symbol}-${object.token1Symbol}
            </div>

            <div style={{display:'inline-block', width:'15%'}}>
                
            </div>

            <div style={{display:'inline-block', width:'40%', fontSize:'13px'}}>
                {object.totalInvestment} USD 
            </div>

            <br/>
        </div>
        </Tooltip>
        )

        setPoolsContent(content)

    },[PoolsData])

    useEffect(()=>{
        var content = SushiPoolsData.map((object)=>

        <Tooltip
        title={
            <React.Fragment>
              Token 0 : {object.token0name} <br/>
              Token 1 : {object.token1name} <br/>
              Pool Share : {parseFloat(object.tokenBalance/object.tokenSupply*100).toFixed(2)} % <br/>
              Pool Liquidity : {parseFloat(object.liquidity).toFixed(2)} <br/>
              Total Investment : {object.totalInvestment} USD
            </React.Fragment>
          }>
        <div style={{width:'90%', marginTop:'12px', marginLeft:'30px'}}>

            <div style={{display:'inline-block', width:'45%', textAlign:'left', wordBreak:'break-all'}}>
                ${object.token0Symbol}-${object.token1Symbol}
            </div>

            <div style={{display:'inline-block', width:'15%'}}>
                
            </div>

            <div style={{display:'inline-block', width:'40%', fontSize:'13px'}}>
                {object.totalInvestment} USD 
            </div>

            <br/>
        </div>
        </Tooltip>
        )

        setSushiPoolsContent(content)

    },[SushiPoolsData])

    useEffect(()=>{
        var content = CompoundLoansData.map((object)=>
        <Tooltip
        title={
            <React.Fragment>
                {object.name} <br/>
              Token Price : {parseFloat(object.price).toFixed(4)} USD <br/>
              Total Tokens : {object.value} ${object.symbol} <br/>
              Total Investment : {object.totalInvestment} USD
            </React.Fragment>
          }>
        <div style={{width:'90%', marginTop:'12px', marginLeft:'30px'}}>

            <div style={{display:'inline-block', width:'15%'}}>
            <div style={{ height:'40px', padding:'5px' , borderRadius:'10px', backgroundImage:'linear-gradient(to right,  rgba(20,24,30,.1), rgba(173,204,151,.5), rgba(20,24,30,.1))'}} >
                <center>
                <img src={object.image} style={{height:'30px', marginTop:''}} alt=""/>
                </center>
            </div>
            </div>

            <div style={{display:'inline-block', width:'10%'}}>
            </div>

            <div style={{display:'inline-block', width:'30%', textAlign:'left'}}>
                ${object.symbol}
            </div>

            {/* <div style={{display:'inline-block', width:'30%'}}>
                {object.value} ${object.symbol}
            </div> */}

            <div style={{display:'inline-block', width:'40%', fontSize:'13px'}}>
                {object.totalInvestment} USD 
            </div>

            <br/>
        </div>
        </Tooltip>
        )

        setCompoundLoansContent(content)

    },[CompoundLoansData])

    useEffect(()=>{
        var content = CompoundSavingsData.map((object)=>
        <Tooltip
        title={
            <React.Fragment>
                {object.name} <br/>
              Token Price : {parseFloat(object.price).toFixed(4)} USD <br/>
              Total Tokens : {object.value} ${object.symbol} <br/>
              Total Investment : {object.totalInvestment} USD
            </React.Fragment>
          }>
        <div style={{width:'90%', marginTop:'12px', marginLeft:'30px'}}>

            <div style={{display:'inline-block', width:'15%'}}>
            <div style={{ height:'40px', padding:'5px' , borderRadius:'10px', backgroundImage:'linear-gradient(to right,  rgba(20,24,30,.1), rgba(173,204,151,.5), rgba(20,24,30,.1))'}} >
                <center>
                <img src={object.image} style={{height:'30px', marginTop:''}} alt=""/>
                </center>
            </div>
            </div>

            <div style={{display:'inline-block', width:'10%'}}>
            </div>

            <div style={{display:'inline-block', width:'30%', textAlign:'left'}}>
                ${object.symbol}
            </div>

            {/* <div style={{display:'inline-block', width:'30%'}}>
                {object.value} ${object.symbol}
            </div> */}

            <div style={{display:'inline-block', width:'40%', fontSize:'13px'}}>
                {object.totalInvestment} USD 
            </div>

            <br/>
        </div>
        </Tooltip>
        )

        setCompoundSavingsContent(content)

    },[CompoundSavingsData])

    useEffect(()=>{
        var content = BalancerPoolsData.map((object)=>
        <Tooltip
        title={
            <React.Fragment>
                
                <div style={{display:'inline-block', textAlign:'left', wordBreak:'break-word'}}>
                Tokens in Pool: <br/>
                {object.tokens.map((obj)=>
                <>
                    ${obj.symbol}<br/>
                </>
                )} 
                </div>
            <br/>
            <br/>
              Pool Percentage : {parseFloat(object.poolPercentage).toFixed(2)} % <br/>
              Pool Liquidity : {parseFloat(object.liquidity).toFixed(2)} USD <br/>
              Total Investment : {object.totalInvestment} USD
            </React.Fragment>
          }>
              
        <div style={{width:'90%', marginTop:'12px', marginLeft:'30px'}}>
          <br/>
            <div style={{display:'inline-block', width:'60%', textAlign:'left', wordBreak:'break-word'}}>
                {object.tokens.map((obj)=>
                <>
                    ${obj.symbol}-
                </>
                )} 
            </div>

            <div style={{display:'inline-block', width:'10%'}}>
                {/* {object.value} ${object.symbol} */}
            </div>

            <div style={{display:'inline-block', width:'30%', fontSize:'13px'}}>
                {object.totalInvestment} USD 
            </div>
            <hr style={{width:'30%'}}/>
            
        </div>
        </Tooltip>
        )

        setBalancerPoolsContent(content)

    },[BalancerPoolsData])

    useEffect(()=>{
        var content = BancorPoolsData.map((object)=>
        <Tooltip
        title={
            <React.Fragment>
                {object.name} <br/>
              {/* Token Price : {parseFloat(object.price).toFixed(4)} USD <br/>
              Total Tokens : {object.value} ${object.symbol} <br/>
              Total Investment : {object.totalInvestment} USD */}
            </React.Fragment>
          }>
        <div style={{width:'90%', marginTop:'12px', marginLeft:'30px'}}>

            <div style={{display:'inline-block', width:'15%'}}>
            <div style={{ height:'40px', padding:'5px' , borderRadius:'10px', backgroundImage:'linear-gradient(to right,  rgba(20,24,30,.1), rgba(173,204,151,.5), rgba(20,24,30,.1))'}} >
                <center>
                <img src={object.image} style={{height:'30px', marginTop:''}} alt=""/>
                </center>
            </div>
            </div>

            <div style={{display:'inline-block', width:'10%'}}>
            </div>

            <div style={{display:'inline-block', width:'40%', textAlign:'left'}}>
                ${object.symbol}
            </div>

            {/* <div style={{display:'inline-block', width:'30%'}}>
                {object.value} ${object.symbol}
            </div> */}

            <div style={{display:'inline-block', width:'30%', fontSize:'13px'}}>
                {object.value} Tokens
            </div>

            <br/>
        </div>
        </Tooltip> 
        )

        setBancorPoolsContent(content)

    },[BancorPoolsData])

    useEffect(()=>{
        var content = SynthetixData.map((object)=>
        <div style={{width:'90%', marginTop:'12px', marginLeft:'30px'}}>
            <div style={{display:'inline-block', width:'15%'}}>
            <div style={{ height:'40px', padding:'5px' , borderRadius:'10px', backgroundImage:'linear-gradient(to right,  rgba(20,24,30,.1), rgba(173,204,151,.5), rgba(20,24,30,.1))'}} >
                <center>
                <img src={object.image} style={{height:'30px', marginTop:''}} alt=""/>
                </center>
            </div>
            </div>

            <div style={{display:'inline-block', width:'10%', textAlign:'left'}}>
                
            </div>

            <div style={{display:'inline-block', width:'30%', textAlign:'left'}}>
                Synthetix
            </div>

            <div style={{display:'inline-block', width:'10%'}}>
            </div>

            <div style={{display:'inline-block', width:'30%', fontSize:'13px'}}>
                {object.balance} $SNX
            </div>

        </div>
        )

        setSynthetixContent(content)

    },[SynthetixData])

    useEffect(()=>{
        var content = YearnData.map((object)=>
        <Tooltip
        title={
            <React.Fragment>
                {object.shareTokenName} <br/>
              Share Price : {parseFloat(object.sharePrice/(10**object.shareTokenDecimals)).toFixed(4)} USD <br/>
              Total Shares : {parseFloat(object.balanceShares/(10**object.shareTokenDecimals)).toFixed(2)} ${object.symbol} <br/>
              Total Investment : {parseFloat(object.totalInvestment).toFixed(2)} USD <br/>
              Underlying Token Name : {object.mainTokenName} <br/>
            </React.Fragment>
          }>
        <div style={{width:'90%', marginTop:'12px', marginLeft:'30px'}}>

            <div style={{display:'inline-block', width:'15%'}}>
            <div style={{ height:'40px', padding:'5px' , borderRadius:'10px', backgroundImage:'linear-gradient(to right,  rgba(20,24,30,.1), rgba(173,204,151,.5), rgba(20,24,30,.1))'}} >
                <center>
                <img src={object.image? object.image:YearnLogo} style={{height:'30px', marginTop:''}} alt=""/>
                </center>
              </div>
            </div>

            <div style={{display:'inline-block', width:'10%'}}>
            </div>

            <div style={{display:'inline-block', fontSize:'12px', width:'40%', textAlign:'left'}}>
                ${object.shareTokenSymbol}
            </div>

            {/* <div style={{display:'inline-block', width:'30%'}}>
                {object.value} ${object.symbol}
            </div> */}

            <div style={{display:'inline-block', width:'30%', fontSize:'13px'}}>
                {parseFloat(object.totalInvestment).toFixed(2)} USD
            </div>

            <br/>
        </div>
        </Tooltip>
        )

        setYearnContent(content)

    },[YearnData])

    useEffect(() => {
        console.log('addy:', accountAddress)
        // setSavingsData([])
        // SetLoansData([])
        async function getAaveV2Data(){
            await axios.post(`https://api.thegraph.com/subgraphs/name/aave/protocol-v2`,
            {
                query:`{
                    userReserves(
                      where:{
                        user:"${accountAddress}"
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
                    console.log(response)
                    if(response.data.data){
            // console.log('addy2', accountAddress)

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
                            .catch((err)=>{})
                            
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
                    liquidityPositions(
                      first:1000
                      where:{
                        user:"${accountAddress}"
                        liquidityTokenBalance_gt:0
                      }
                      orderDirection:desc
                    )
                  
                    {
                      pair{
                        totalSupply
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
                      liquidityTokenBalance
                    }
                    }`})
                .then(async(response) => {
                    if(response.data.data){
                        // console.log(response.data.data.liquidityPositions)
                        var pools = []
                        var res = response.data.data.liquidityPositions
                        for(var i =0; i<res.length; i++){
                            var object = {}
                            object.id = res[i].pair.id
                            object.tokenBalance = res[i].liquidityTokenBalance;
                            object.tokenSupply = res[i].pair.totalSupply;
                            object.token0name = res[i].pair.token0.name
                            object.token1name = res[i].pair.token1.name
                            object.token0Symbol = res[i].pair.token0.symbol
                            object.token1Symbol = res[i].pair.token1.symbol
                            object.liquidity = res[i].pair.reserveUSD
                            object.totalInvestment = ((res[i].liquidityTokenBalance/res[i].pair.totalSupply)*res[i].pair.reserveUSD).toFixed(2)
                            pools.push(object)
                        }
                        pools.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
                        console.log(pools)
                        setPoolsData(pools)
                    }
                })
        }
        async function getCompoundV2Data(){
            await axios.post(`https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2`,{
                query:`{
                    accountCTokens(
                      where:{
                        account:"${accountAddress}"
                      }
                    ){
                      id
                      market{
                        underlyingAddress
                        underlyingPriceUSD
                        underlyingSymbol
                        underlyingName
                        name
                        symbol
                        supplyRate
                        borrowRate
                      }
                      borrowBalanceUnderlying
                      supplyBalanceUnderlying
                    }
                  }
                  `})
            .then(async(response)=>{
                if(response.data.data){
                    var savings = []
                    var loans = []
                    // console.log(response.data.data.accountCTokens)
                    var res = response.data.data.accountCTokens
                    for( var i=0; i<res.length; i++){

                        await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${res[i].market.underlyingAddress}`,{},{})
                        .then(async(priceData)=>{
                                // console.log(priceData.data);
                                res[i].image = priceData.data.image.thumb
                                // console.log(res[i].image)
                                // res[i].price = priceData.data.market_data.current_price.usd
                        })
                        .catch((err)=>{})

                        if(res[i].borrowBalanceUnderlying>0){
                            var object={}
                            object.value = res[i].borrowBalanceUnderlying;
                            object.borrowRate = res[i].market.borrowRate
                            object.name = res[i].market.underlyingName
                            object.symbol = res[i].market.underlyingSymbol
                            object.tokenAddress = res[i].market.underlyingAddress;
                            object.price = res[i].market.underlyingPriceUSD
                            object.image = res[i].image
                            object.totalInvestment = parseFloat(res[i].market.underlyingPriceUSD*res[i].supplyBalanceUnderlying).toFixed(2)
                            loans.push(object)
                        }
                        if(res[i].supplyBalanceUnderlying>0){
                            var object={}
                            object.value = parseFloat(res[i].supplyBalanceUnderlying).toFixed(2);
                            object.borrowRate = parseFloat(res[i].market.supplyRate).toFixed(2);
                            object.name = res[i].market.underlyingName
                            object.symbol = res[i].market.underlyingSymbol
                            object.tokenAddress = res[i].market.underlyingAddress;
                            object.price = res[i].market.underlyingPriceUSD
                            object.image = res[i].image
                            object.totalInvestment = parseFloat(res[i].market.underlyingPriceUSD*res[i].supplyBalanceUnderlying).toFixed(2)
                            savings.push(object)
                        }
                    }
                    savings.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
                    loans.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment)); 
                    // console.log(loans, savings)
                    SetCompoundLoansData(loans)
                    setCompoundSavingsData(savings)
                }
            })

        }
        async function getBalancerData(){
            await axios.post(`https://api.thegraph.com/subgraphs/name/balancer-labs/balancer`,{
                query:`{
                    users
                    (
                      where:{
                        id:"${accountAddress}"
                      }
                    )
                    {
                      id
                      sharesOwned {
                        id
                        balance
                        poolId{
                          symbol
                          tokensList
                          tokens{
                            symbol
                            balance
                          }
                          totalShares
                          liquidity
                        }
                      }
                      
                    }
                  }`
            })
            .then(async(response)=>{
                if(response.data.data.users[0]){
                    // console.log(response.data.data.users[0].sharesOwned)
                var res = response.data.data.users[0].sharesOwned
                var pools = []
                for( var i=0; i<res.length; i++){
                    var object = {}
                    object.balance = res[i].balance
                    object.liquidity = res[i].poolId.liquidity
                    object.tokens = res[i].poolId.tokens
                    object.totalShares = res[i].poolId.totalShares
                    object.poolPercentage = (res[i].balance/res[i].poolId.totalShares)*100
                    object.totalInvestment = parseFloat((res[i].balance/res[i].poolId.totalShares)*res[i].poolId.liquidity).toFixed(2)
                    pools.push(object)
                }
                pools.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
                setBalancerPoolsData(pools)
                // console.log(pools)

                }
                
            })
        }
        async function getBancorData(){
            await axios.post(`https://api.thegraph.com/subgraphs/name/blocklytics/bancor`,{
                query:`{
                    users
                    (
                      where:{
                        id:"${accountAddress}"
                      }
                    )
                    {
                      id
                      smartTokenBalances{
                        smartToken{
                          id
                          name
                          symbol
                          decimals
                        }
                        balance
                      }
                    }
                  }`
            })
            .then(async(response)=>{
                if(response.data.data.users[0]){
                    // console.log(response.data.data.users)
                    var res = response.data.data.users[0].smartTokenBalances
                    // console.log(res)
                    var pools = []
                    for(var i = 0; i<res.length; i++){

                        await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${res[i].smartToken.id}`,{},{})
                        .then(async(priceData)=>{
                                // console.log(priceData.data);
                                res[i].image = priceData.data.image.thumb
                                // console.log(res[i].image)
                                // res[i].price = priceData.data.market_data.current_price.usd
                        })
                        .catch((err)=>{})

                        var object = {}
                        object.name = res[i].smartToken.name
                        object.value = parseFloat(res[i].balance/(10**res[i].smartToken.decimals)).toFixed(2)
                        object.symbol = res[i].smartToken.symbol;
                        object.image = res[i].image
                        pools.push(object)
                    }
                    // console.log(pools)
                    setBancorPoolsData(pools)
                }
                // console.log(response.data.data)
            })
        }

        async function getSynthetixData(){
            await axios.post(`https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix`, {
                query:`{
                    snxholders
                    (
                      where:{
                          id:"${accountAddress}"
                      }
                    )
                    {
                      id
                      collateral
                      balanceOf
                    }
                  }
                  `
            })
            .then(async(response)=>{
                var assets = []
                if(response.data.data.snxholders[0]){
                    var res = response.data.data.snxholders[0];
                    
                    console.log(res)
                    var object = {}
                    await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f`,{},{})
                    .then(async(priceData)=>{
                            // console.log(priceData.data);
                            res.image = priceData.data.image.thumb
                            // console.log(res[i].image)
                            // res[i].price = priceData.data.market_data.current_price.usd
                    })
                    .catch((err)=>{}) 

                    object.image = res.image;
                    object.balance = parseFloat(res.balanceOf/(10**18)).toFixed(2);
                    assets.push(object)
                    
                }
                setSynthetixData(assets)
                // console.log(response)
            })
        }

        async function getSushiV2Data(){
            await axios.post(`https://gateway.thegraph.com/api/c9596ce7bc47f7544cc808c3881427ed/subgraphs/id/0x4bb4c1b0745ef7b4642feeccd0740dec417ca0a0-0`,
            {
                query:`{
                    users(
                     where:{
                       id:"0x84fb6f0a5969a5ce2cde8606235b40b39baedd4f"
                     }
                   ){
                     liquidityPositions(first:1000
                         where:{
                         liquidityTokenBalance_gt:0
                         }
                     ){
                       liquidityTokenBalance
                       pair{
                         id
                         totalSupply
                         reserveUSD
                         token0{
                           id
                           name
                           symbol
                         }
                         token1{
                           id
                           name
                           symbol
                         }
                       }
                     }
                   } 
                   }`})
                .then(async(response) => {
                    // console.log(response)
                    if(response.data.data){
                        if(response.data.data.users[0]){
                        // console.log(response.data.data.users[0].liquidityPositions)
                        var pools = []
                        var res = response.data.data.users[0].liquidityPositions
                        for(var i =0; i<res.length; i++){
                            var object = {}
                            object.id = res[i].pair.id
                            object.tokenBalance = res[i].liquidityTokenBalance;
                            object.tokenSupply = res[i].pair.totalSupply;
                            object.token0name = res[i].pair.token0.name
                            object.token1name = res[i].pair.token1.name
                            object.token0Symbol = res[i].pair.token0.symbol
                            object.token1Symbol = res[i].pair.token1.symbol
                            object.liquidity = res[i].pair.reserveUSD
                            object.totalInvestment = ((res[i].liquidityTokenBalance/res[i].pair.totalSupply)*res[i].pair.reserveUSD).toFixed(2)
                            pools.push(object)
                        }
                        pools.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
                        // console.log(pools)
                        setSushiPoolsData(pools)
                    }}
                })
        }
        // c9596ce7bc47f7544cc808c3881427ed
        async function getYearnData(){
            await axios.post(`https://gateway.thegraph.com/api/c9596ce7bc47f7544cc808c3881427ed/subgraphs/id/0xf50b705e4eaba269dfe954f10c65bd34e6351e0c-0`,
            {
                query:`{
                    accountVaultPositions(
                      first:1000
                      where:{
                        account:"0x4beaa82fdda3543523d68bdf525d471ca20cd73c"
                        balanceShares_gt:0
                      }
                    )
                    {
                      id
                      balanceTokens
                      balancePosition
                      balanceShares
                      balanceProfit
                      vault{
                        token{
                          symbol
                          name
                          id
                          decimals
                        }
                        shareToken{
                          id
                          name
                          symbol
                          decimals
                        }
                        latestUpdate{
                          pricePerShare
                        }
                      }
                    }
                  }`})
                .then(async(response) => {
                    console.log(response)
                    if(response.data.data){
                        var res = response.data.data.accountVaultPositions
                        console.log(res)
                        var positions = []
                        for(var i =0; i<res.length; i++){
                            var object = {}

                            await axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${res[i].vault.token.id}`,{},{})
                            .then(async(priceData)=>{
                                    // console.log(priceData);
                                    res[i].image = priceData.data.image.thumb
                                    // console.log(res[i].image)
                                    // res[i].price = priceData.data.market_data.current_price.usd
                            })
                            .catch((err)=>{})
                            
                            object.balanceShares = res[i].balanceShares
                            object.sharePrice = res[i].vault.latestUpdate.pricePerShare
                            object.shareTokenAddress = res[i].vault.shareToken.id
                            object.shareTokenSymbol = res[i].vault.shareToken.symbol
                            object.shareTokenDecimals = res[i].vault.shareToken.decimals 
                            object.shareTokenName = res[i].vault.shareToken.name
                            object.mainTokenSymbol = res[i].vault.token.symbol
                            object.mainTokenName = res[i].vault.token.name
                            object.mainTokenDecimals = res[i].vault.token.decimals
                            object.mainTokenAddress = res[i].vault.token.id
                            object.image = res[i].image
                            object.totalInvestment = object.balanceShares/(10**object.shareTokenDecimals) * object.sharePrice/(10**object.shareTokenDecimals)

                            console.log(object)
                            positions.push(object)
                        }

                        positions.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));
                        setYearnData(positions)
                    }
                })
        }


        getCompoundV2Data()
        getAaveV2Data()
        getUniV2Data()
        getBalancerData()
        getBancorData()
        getSynthetixData()
        getSushiV2Data()
        getYearnData()
    }, [accountAddress])

    return (
        <div>

            <div style={{
                // marginLeft:'25px',
                width:'100%',
                minWidth:'300px',
                border:'1px solid rgb(115, 115, 115)',
                height : 'auto',
                minHeight: '200px',
                borderRadius: '10px',
                display: (SavingsData.length>0 || CompoundSavingsData>0)? '':'none'
            }}>
            <br/>
            <center>
                <div style={{fontSize:'25px'}}>
                    Savings
                </div>
            </center>
            
            
            <div style={{fontSize:'12px',
             marginLeft:'15px',
             display: SavingsData.length>0? '':'none'
             }}>
            Aave V2
            </div>
            {SavingsContent}
            <br/>

            <div style={{fontSize:'12px', 
            marginLeft:'15px',
            display: CompoundSavingsData.length>0? '':'none'}}>
            Compound V2
            </div>
            {CompoundSavingsContent}
            <br/>
            </div>

            <div style={{
                // marginLeft:'25px',
                width:'100%',
                minWidth:'300px',
                border:'1px solid rgb(115, 115, 115)',
                height : 'auto',
                marginTop:'20px',
                minHeight: '200px',
                borderRadius: '10px',
                display : (LoansData.length>0 || CompoundLoansData.length>0)? '':'none'
            }}>
            <br/>
            <center>
                <div style={{fontSize:'25px'}}>
                    Loans
                </div>
            </center>
            
            
            <div style={{fontSize:'12px',
             marginLeft:'15px',
             display: LoansData.length>0? '':'none'
             }}>
            Aave V2
            </div>
            {LoansContent}
            <br/>

            <div style={{fontSize:'12px',
             marginLeft:'15px',
             display: CompoundLoansData.length>0? '':'none'
             }}>
            Compound V2
            </div>
            {CompoundLoansContent}
            <br/>
            </div>


            <div style={{
                // marginLeft:'25px',
                width:'100%',
                minWidth:'300px',
                marginTop:'20px',
                border:'1px solid rgb(115, 115, 115)',
                height : 'auto',
                minHeight: '200px',
                borderRadius: '10px',
                display: (PoolsData.length>0 || BalancerPoolsData.length>0 || SushiPoolsData.length>0 || BancorPoolsData.length>0)? '':'none'
            }}>
            <br/>
            <center>
                <div style={{fontSize:'25px'}}>
                    Pools
                </div>
            </center>
            
            
            <div style={{fontSize:'12px',
             marginLeft:'15px',
             display: PoolsData.length>0? '':'none'
             }}>
            Uniswap V2
            </div>
            {PoolsContent}
            <br/>

            <div style={{fontSize:'12px',
             marginLeft:'15px',
             display: SushiPoolsData.length>0? '':'none'
             }}>
            SushiSwap V2
            </div>
            {SushiPoolsContent}
            <br/>

            <div style={{fontSize:'12px',
             marginLeft:'15px',
             display: BalancerPoolsData.length>0? '':'none'
             }}>
            Balancer
            </div>
            {BalancerPoolsContent}
            <br/>

            <div style={{fontSize:'12px',
             marginLeft:'15px',
             display: BancorPoolsData.length>0? '':'none'
             }}>
            Bancor
            </div>
            {BancorPoolsContent}
            <br/>
            </div>

            <div style={{
                // marginLeft:'25px',
                width:'100%',
                marginTop:'20px',
                minWidth:'300px',
                border:'1px solid rgb(115, 115, 115)',
                height : 'auto',
                minHeight: '170px',
                borderRadius: '10px',
                display: (SynthetixData.length>0 || YearnData.length>0)? '':'none'
            }}>
            <br/>
            <center>
                <div style={{fontSize:'25px'}}>
                    Other Assets
                </div>
            </center>
                <div style={{fontSize:'12px',
                 marginLeft:'15px',
                 display: SynthetixData.length>0? '':'none'
                 }}>
                <br/> Synthetix
                <br/>
                </div> 
                {SynthetixContent}
                <br/>

                <div style={{fontSize:'12px',
                    marginLeft:'15px',
                    display: YearnData.length>0? '':'none'
                    }}>
                Yearn Finance
                </div>
                {YearnContent}
                <br/>

                </div>
            <center>

        </center>
        </div>
    )
}
