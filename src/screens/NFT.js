import Page from "../components/Page";
import NftGroup from "../components/Nft/NftGroup";
import { Container, Stack, Typography } from '@material-ui/core';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios'

export default function NFT() {
    const { address } = useParams();
    const [Account, setAccount] = useState('0x0')
    const [data, setdata] = useState(null)

    useEffect(() => {
        async function getData() {
            var account = address
            setAccount(account)
            console.log(Account)

            // axios.get(`https://api.etherscan.io/api?module=account&action=tokennfttx&address=0x6975be450864c02b4613023c2152ee0743572325&startblock=0&endblock=999999999&sort=asc&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`,{},{})
            await axios.get(`https://api.etherscan.io/api?module=account&action=tokennfttx&address=${account}&startblock=0&endblock=999999999&sort=asc&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`, {}, {})
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
                    setdata(Object.values(b).filter((object)=> object.tokens.length>0));

                })
        }
        getData();



    }, [Account, address])

    return (
        <Page title="Nft">
            <Container>
                <Typography variant="h2" sx={{ mb: 2 }}>
                    NFT
                </Typography>

                {data===null?<div>Loading</div>:<NftGroup nftData={data} />}
            </Container>
        </Page>
    );
}