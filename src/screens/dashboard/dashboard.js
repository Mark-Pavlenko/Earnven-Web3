
// material
import { Container } from '@material-ui/core';
// components
import Page from '../../components/Page';
// import AllAssetsMini from '../../components/allAssetsMini';
import AllAssets from '../../components/allAssets'
// import TotalValueBox from '../../components/totalValueBox';
// import DefiAssets from '../../components/defiAssets';
import PortfolioPerf from '../../components/portfolioperf/portfolioperf';
import Balance from '../../components/Balance';
// import { Link } from 'react-router-dom';
import './dashboard.css';
import { Grid ,Button,Stack,Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoansAndSavings from '../../components/LoansAndSavings'
// import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    let {address} = useParams();
    const navigate = useNavigate();
    // const navigate = useNavigate();

    const routeToNft = () => {
        navigate(`/${address}/nftdesign`);
    }
    const routeToHistory = () =>{
        navigate(`/${address}/history`)
    };

    return (
        <Page title="Dashboard">
            <Container maxWidth="xl">
                <Stack direction='row' spacing={1} sx={{marginTop:"-16px"}}>
                    <Button variant='text'  sx={{fontSize:'20px',color:"#737373",pt:0}}>Dashboard</Button>
                    <Button variant='text' sx={{fontSize:'20px',color:"#737373",pt:0}} onClick={routeToNft}>NFT Collection</Button>
                    <Button variant='text' sx={{fontSize:'20px',color:"#737373",pt:0}} onClick={routeToHistory}>History</Button>
                </Stack>

                <Balance address={address}/>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <PortfolioPerf address={address}/>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <AllAssets address={address}/><br />
                                {/* <Link to={`/${address}/assets`} ><div style={{ float: 'right', color: 'white' }}>See More</div></Link> */}
                            </Grid>
                        </Grid>

                    </Grid>
                    {/* <Grid item xs={12} md={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} >
                                <TotalValueBox />
                            </Grid>
                            <Grid item xs={12} md={12} >
                                <DefiAssets />
                            </Grid>
                        </Grid>
                    </Grid> */}
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={1}>
                            {/* <Grid item xs={12} md={6} >
                              <Button onClick={() => (navigate(`/${address}/nft`))} variant='contained'>View nft</Button>  
                            </Grid>
                            <Grid item xs={12} md={6} >
                            <Button onClick={() => (navigate(`/${address}/approvals`))} variant='contained'>View Approvals</Button> 
                            </Grid> */}
                            <LoansAndSavings accountAddress={address}/>
                        </Grid>
                    </Grid> 
                </Grid>
            </Container>
        </Page>
    );
}

