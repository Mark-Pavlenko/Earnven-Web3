import { useEffect, useState } from "react"
import Web3 from "web3"
import abi from "../abi/NftAbi.json";
import { useParams } from "react-router-dom";
import { Container, Stack, Typography, Grid } from '@material-ui/core';

export default function NftDetails() {

    const { address, contract, id } = useParams()
    const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8"))
    // const [tokenHistory, settokenHistory] = useState()

    useEffect(() => {
        async function getEvents() {
            const contractInstance = await new web3.eth.Contract(abi, contract);
            let historical_block = 0;
            const events = await contractInstance.getPastEvents(
                'Transfer',
                {
                    filter: { tokenId: id },
                    fromBlock: historical_block, toBlock: 'latest'
                }
            );
            console.log("nft history details:::", events);
        };
        getEvents();

    }, [contract, id])

    return (
        <Container>
            <Typography variant='h2' align='center'>NFT Details</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <img alt="nft-image" src="https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/553976.png"></img>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img alt="nft-image" src="https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/553976.png"></img>
                </Grid>
            </Grid>
        </Container>
    )
}