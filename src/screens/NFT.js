import Page from "../components/Page";
import NftGroup from "../components/Nft/NftGroup";
import NftList from "../components/Nft/NftList";
import { Container, Stack, Typography,Button } from '@material-ui/core';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function NFT() {
    const { address } = useParams();
    const [Account, setAccount] = useState('0x0')
    const [data, setdata] = useState(null)
    const navigate = useNavigate();

    const routeToHistory = () => {
        navigate(`/${address}/history`);
    }
    const routeToDashboard = () =>{
        navigate(`/${address}/dashboard`)
    };

    useEffect(() => {
        async function getData() {
            var account = address
            setAccount(account)
            console.log(Account)

            // axios.get(`https://api.etherscan.io/api?module=account&action=tokennfttx&address=0x6975be450864c02b4613023c2152ee0743572325&startblock=0&endblock=999999999&sort=asc&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`,{},{})
            /*  await axios.get(`https://api.etherscan.io/api?module=account&action=tokennfttx&address=${account}&startblock=0&endblock=999999999&sort=asc&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`, {}, {})
                 .then(async (response) => {
                     var b = {}
                     
                     var res = response.data.result;
                     console.log(res)
                     for (let i in res) {
 
                         if (b[res[i].tokenName] === undefined) {
                             b[res[i].tokenName] = {}
                             b[res[i].tokenName]['tokens'] = []
                             if (res[i].from.toLowerCase() === account.toLowerCase()) {
                                 b[res[i].tokenName]['qtty'] = -1
                             }
                             else {
                                 b[res[i].tokenName]['qtty'] = 1
                                 b[res[i].tokenName]['tokens'].push(res[i].tokenID)
                             }
                             b[res[i].tokenName]['name'] = res[i].tokenName
                             b[res[i].tokenName]['address'] = res[i].contractAddress
                         }
                         else {
                             if (res[i].from.toLowerCase() === account.toLowerCase()) {
                                 b[res[i].tokenName]['qtty'] -= 1
                                 var index = b[res[i].tokenName]['tokens'].indexOf(res[i].tokenID);
                                 if (index > -1) {
                                     b[res[i].tokenName]['tokens'].splice(index, 1);
                                 }
                             }
                             else {
                                 b[res[i].tokenName]['qtty'] += 1
                                 b[res[i].tokenName]['tokens'].push(res[i].tokenID)
                             }
                         }
                     }
                     console.log("final data:::",Object.values(b).filter((object)=> object.tokens.length>0))
                     setdata(Object.values(b).filter((object)=> object.tokens.length>0));
 
                 }) */
            await axios.get(`https://api.etherscan.io/api?module=account&action=tokennfttx&address=${account}&startblock=0&endblock=999999999&sort=asc&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`, {}, {})
                .then(async (response) => {
                    var b = {}
                    var allTokens = [];
                    var res = response.data.result;
                    console.log(res)
                    for (let i in res) {


                        if (b[res[i].tokenName] === undefined) {
                            b[res[i].tokenName] = {}
                            b[res[i].tokenName]['tokens'] = []
                            b[res[i].tokenName]['txHash'] = []
                            if (res[i].from.toLowerCase() === account.toLowerCase()) {
                                b[res[i].tokenName]['qtty'] = -1
                            }
                            else {
                                b[res[i].tokenName]['qtty'] = 1
                                b[res[i].tokenName]['tokens'].push(res[i].tokenID)
                                b[res[i].tokenName]['txHash'].push(res[i].hash)
                            }
                            b[res[i].tokenName]['name'] = res[i].tokenName
                            b[res[i].tokenName]['address'] = res[i].contractAddress
                        }
                        else {
                            if (res[i].from.toLowerCase() === account.toLowerCase()) {
                                b[res[i].tokenName]['qtty'] -= 1
                                var index = b[res[i].tokenName]['tokens'].indexOf(res[i].tokenID);
                                if (index > -1) {
                                    b[res[i].tokenName]['tokens'].splice(index, 1);
                                    b[res[i].tokenName]['txHash'].splice(index, 1);
                                }
                            }
                            else {
                                b[res[i].tokenName]['qtty'] += 1
                                b[res[i].tokenName]['tokens'].push(res[i].tokenID)
                                b[res[i].tokenName]['txHash'].push(res[i].hash)
                            }
                        }
                    }
                    // console.log("final data:::", Object.values(b).filter((object) => object.tokens.length > 0))
                    // setdata(Object.values(b).filter((object) => object.tokens.length > 0));

                    let temp = Object.values(b)
                    console.log("value of all nfts",temp)
                    for (let i in temp) {
                        if (temp[i].tokens.length > 0) {
                            for (let j in temp[i].tokens) {
                                let tempTokenObject = {}
                                tempTokenObject.tokenID = temp[i].tokens[j]
                                tempTokenObject.contractAddress = temp[i].address
                                tempTokenObject.txHash = temp[i].txHash[j]
                                allTokens.push(tempTokenObject)
                            }
                        }
                    }

                    console.log("all nft tokens",allTokens)
                    setdata(allTokens);
                })
        }
        getData();



    }, [Account, address])

    /* return (
        <Page title="Nft">
            <Container>
                <Typography variant="h2" sx={{ mb: 2 }}>
                    NFT
                </Typography>

                {data === null ? <div>Loading</div> : <NftGroup nftData={data} />}
            </Container>
        </Page>
    ); */

    return (
        <Page title="Nft">
            <Container>
            <Stack direction='row' spacing={1} sx={{marginTop:"-4px"}}>
                    <Button variant='text'  sx={{fontSize:'20px',color:"#737373",pt:0}} onClick={routeToDashboard}>Dashboard</Button>
                    <Button variant='text' sx={{fontSize:'20px',color:"#737373",pt:0}} >NFT Collection</Button>
                    <Button variant='text' sx={{fontSize:'20px',color:"#737373",pt:0}} onClick={routeToHistory}>History</Button>
                </Stack>
                <Typography variant="h2" sx={{ mb: 2 }}>
                    NFT
                </Typography>

                {data === null ? <div>Loading</div> : <NftList nftData={data} />}
            </Container>
        </Page>
    );
}