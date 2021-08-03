import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Tooltip from '@material-ui/core/Tooltip';

export default function Index({accountAddress}) {

    const [SavingsContent, setSavingsContent] = useState([]) //aave v2
    const [LoansContent, setLoansContent] = useState([]) // aave v2
    const [SavingsData, setSavingsData] = useState([]) // aave v2
    const [LoansData, SetLoansData] = useState([]) // aave v2

    const [PoolsContent, setPoolsContent] = useState([]) //UNI v2
    const [PoolsData, setPoolsData] = useState([]) //UNI v2

    const [CompoundSavingsContent, setCompoundSavingsContent] = useState([]) //compound v2
    const [CompoundLoansContent, setCompoundLoansContent] = useState([]) //compound v2
    const [CompoundSavingsData, setCompoundSavingsData] = useState([]) //compound v2
    const [CompoundLoansData, SetCompoundLoansData] = useState([]) //compound v2

    const [BalancerPoolsData, setBalancerPoolsData] = useState([]) //Balancer
    const [BalancerPoolsContent, setBalancerPoolsContent] = useState([]) //Balancer

    const [BancorPoolsData, setBancorPoolsData] = useState([]) //bancor
    const [BancorPoolsContent, setBancorPoolsContent] = useState([]) //bancor

    const [SynthetixData, setSynthetixData] = useState([])
    const [SynthetixContent, setSynthetixContent] = useState([])

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
                <img src={object.image} style={{height:'30px', marginTop:''}} alt=""/>
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
    <img src={object.image} style={{height:'30px', marginTop:''}} alt=""/>
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

            <div style={{display:'inline-block', width:'45%', textAlign:'left'}}>
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

        // <div style={{width:'80%'}}>
        //     <div style={{display:'inline-block', width:'25%', overflow:'hidden'}}>
        //         ${object.token0Symbol}
        //     </div>

        //     <div style={{display:'inline-block', width:'20%', textAlign:'left', overflow:'hidden'}}>
        //         ${object.token1Symbol} 
        //     </div>
        //     <div style={{display:'inline-block', width:'5%', textAlign:'left', overflow:'hidden'}}>
                
        //     </div>
        //     <div style={{display:'inline-block', width:'10%', overflow:'hidden'}}>
        //         {((object.tokenBalance/object.tokenSupply)*100).toFixed(2)}  %
        //     </div>

        //     <div style={{display:'inline-block', width:'20%', overflow:'hidden'}}>
        //         {parseFloat(object.tokenBalance).toFixed(2)} $LP
        //     </div>

        //     <div style={{display:'inline-block', width:'20%', overflow:'hidden'}}>
        //         {object.totalInvestment} USD 
        //     </div>
        
        // </div> 
        )

        setPoolsContent(content)

    },[PoolsData])

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
                <img src={object.image} style={{height:'30px', marginTop:''}} alt=""/>
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
                <img src={object.image} style={{height:'30px', marginTop:''}} alt=""/>
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
                <img src={object.image} style={{height:'30px', marginTop:''}} alt=""/>
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
        // <div style={{width:'80%'}}>

        //     <div style={{display:'inline-block', width:'10%', textAlign:'left'}}>
        //         <img src={object.image} alt=""/>
        //     </div>

        //     <div style={{display:'inline-block', width:'45%', textAlign:'left'}}>
        //         {object.name}
        //     </div>

        //     <div style={{display:'inline-block', width:'45%'}}>
        //         {object.value} ${object.symbol} 
        //     </div>
        
        // </div> 
        )

        setBancorPoolsContent(content)

    },[BancorPoolsData])

    useEffect(()=>{
        var content = SynthetixData.map((object)=>
        <div style={{width:'90%', marginTop:'12px', marginLeft:'30px'}}>
            <div style={{display:'inline-block', width:'15%'}}>
                <img src={object.image} style={{height:'30px', marginTop:''}} alt=""/>
            </div>

            <div style={{display:'inline-block', width:'40%', textAlign:'left'}}>
                Synthetix
            </div>

            <div style={{display:'inline-block', width:'10%'}}>
            </div>

            <div style={{display:'inline-block', width:'30%', fontSize:'13px'}}>
                {object.balance} $SNX
            </div>

        </div>
       
        // <div style={{width:'30%'}}>

        //     <div style={{display:'inline-block', width:'10%'}}>
        //         <img src={object.image} alt=""/>
        //     </div>

        //     <div style={{display:'inline-block', width:'45%'}}>
        //         Synthetix
        //     </div>

        //     <div style={{display:'inline-block', width:'45%'}}>
        //         {object.balance} $SNX
        //     </div>
        
        // </div> 
        )

        setSynthetixContent(content)

    },[SynthetixData])

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
                if(response.data.data){
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
                if(response.data.data[0]){
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
                if(response.data.data){
                    var res = response.data.data.snxholders[0];
                    var assets = []
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
                    setSynthetixData(assets)
                }
                // console.log(response)
            })
        }

        getCompoundV2Data()
        getAaveV2Data()
        getUniV2Data()
        getBalancerData()
        getBancorData()
        getSynthetixData()
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
                borderRadius: '10px'
            }}>
            <br/>
            <center>
                <div style={{fontSize:'25px'}}>
                    Savings
                </div>
            </center>
            
            
            <div style={{fontSize:'12px', marginLeft:'15px'}}>
            Aave V2
            </div>
            {SavingsContent}
            <br/>

            <div style={{fontSize:'12px', marginLeft:'15px'}}>
            Compound V2
            </div>
            {CompoundSavingsContent}
            <br/>
            </div>

            <br/>

            <div style={{
                // marginLeft:'25px',
                width:'100%',
                border:'1px solid rgb(115, 115, 115)',
                height : 'auto',
                minHeight: '200px',
                borderRadius: '10px'
            }}>
            <br/>
            <center>
                <div style={{fontSize:'25px'}}>
                    Loans
                </div>
            </center>
            
            
            <div style={{fontSize:'12px', marginLeft:'15px'}}>
            Aave V2
            </div>
            {LoansContent}
            <br/>

            <div style={{fontSize:'12px', marginLeft:'15px'}}>
            Compound V2
            </div>
            {CompoundLoansContent}
            <br/>
            </div>

            <br/>

            <div style={{
                // marginLeft:'25px',
                width:'100%',
                border:'1px solid rgb(115, 115, 115)',
                height : 'auto',
                minHeight: '200px',
                borderRadius: '10px'
            }}>
            <br/>
            <center>
                <div style={{fontSize:'25px'}}>
                    Pools
                </div>
            </center>
            
            
            <div style={{fontSize:'12px', marginLeft:'15px'}}>
            Uniswap V2
            </div>
            {PoolsContent}
            <br/>

            <div style={{fontSize:'12px', marginLeft:'15px'}}>
            Balancer
            </div>
            {BalancerPoolsContent}
            <br/>

            <div style={{fontSize:'12px', marginLeft:'15px'}}>
            Bancor
            </div>
            {BancorPoolsContent}
            <br/>
            </div>

            <br/>

            <div style={{
                // marginLeft:'25px',
                width:'100%',
                border:'1px solid rgb(115, 115, 115)',
                height : 'auto',
                minHeight: '200px',
                borderRadius: '10px'
            }}>
            <br/>
            <center>
                <div style={{fontSize:'25px'}}>
                    Other Assets
                </div>
            </center>
                <div style={{fontSize:'12px', marginLeft:'15px'}}>
                <br/> Synthetix
                </div> <br/>
                {SynthetixContent}
                <br/>
                </div>
            <center>

        </center>
        </div>
    )
}
