
import { Box,Typography } from "@material-ui/core";
// import AccountBalance from "./AccountBalance";

import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import Web3 from "web3";


export default function Balance({address}) {
    const [totalValue, settotalValue] = useState('00.00')

    function CommaFormatted(amount) {
        var delimiter = ","; // replace comma if desired
        var ab = amount.split('.',2)
        var d = ab[1];
        var i = parseInt(ab[0]);
        if(isNaN(i)) { return ''; }
        var minus = '';
        if(i < 0) { minus = '-'; }
        i = Math.abs(i);
        var n = i.toString();
        var a = [];
        while(n.length > 3) {
            var nn = n.substr(n.length-3);
            a.unshift(nn);
            n = n.substr(0,n.length-3);
        }
        if(n.length > 0) { a.unshift(n); }
        n = a.join(delimiter);
        if(d.length < 1) { amount = n; }
        else { amount = n + '.' + d; }
        amount = minus + amount;
        return amount;
    }

    useEffect(()=>{
        let total = 0;
        const web3 = new Web3();
        // const accountAddress = localStorage.getItem('selected-account')
        const accountAddress = address;

        async function getBalance(){
            try{
                await axios.get(`https://api2.ethplorer.io/getAddressChartHistory/${accountAddress}?apiKey=ethplorer.widget`,{},{})
                .then(async(response)=>{
                    // console.log(response.data.history.data)
                    var res = response.data.history.data
                    // console.log(res[res.length-1].balance)
                    settotalValue(CommaFormatted(parseFloat(res[res.length-1].balance).toFixed(2)))
                })
            }
            catch{}
        }
        getBalance()
        // const totalAccountValue = async () =>{
        //     try{
        //         const path = 'https://api.ethplorer.io/getAddressInfo/'+accountAddress+'?apiKey=EK-qSPda-W9rX7yJ-UY93y'
        //         const response = await axios.get(path);
        //         let tokens = response.data.tokens;
        //         total= (response.data.ETH.price.rate)*(web3.utils.fromWei(response.data.ETH.rawBalance,'ether'));
        //         if(tokens!==undefined){
        //             for(var i = 0; i<tokens.length; i++){       
        //                 if(tokens[i].tokenInfo.price!==false){
        //                     total = total + (tokens[i].tokenInfo.price.rate)*(web3.utils.fromWei(tokens[i].rawBalance,'ether'));
                            
        //                 } 
        //             }
        //         }
        //         settotalValue(CommaFormatted(total.toFixed(2)))
        //     }
        //     catch(error){
        //         console.log(error);
        //     }
        // }
        //  totalAccountValue();
    },[totalValue,address])
    return (
        <Box sx={{ pb: 5 }}>
            <Typography variant="h3" sx={{color:'primary.main'}}>${totalValue}</Typography>
            {/* <Typography variant="subtitle1" sx={{color:'common.white'}}>+ 10.4%($207.65)</Typography> */}
        </Box>
    );
}