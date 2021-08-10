import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack,Grid } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';


import { useNft } from "use-nft"
import spinner from '../../assets/icons/spinner.svg'
import block from '../../assets/icons/block.png'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Web3 from "web3";
import axios from 'axios';


const NftImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------


export default function NftCard({ tokenId, contractAddress, txHash }) {
  const navigate = useNavigate();
  const { address } = useParams();
  const [price, setprice] = useState(0)

  const { loading, error, nft } = useNft(
    contractAddress,
    tokenId
  )

  const getTransactionValue = async (hash) => {
    const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8"))
    const tx = await web3.eth.getTransaction(hash)
    if(tx.value>0){
      const valueInWei = parseInt(tx.value)
      setprice(parseFloat(web3.utils.fromWei(valueInWei.toString(), 'ether')).toFixed(3))
    }
    
  }

  useEffect(async () => {
    await getTransactionValue(txHash);

  }, [txHash])

  const routeToDetailPage = () => {
    navigate(`/${address}/nftdetails/${contractAddress}/${tokenId}`)
  }

  // const callingOpensea = async (address,id) => {
     
  // }

  return (
    <>
    {nft !== undefined? (nft.image !==""?
    <Grid key={nft.tokenID} item xs={12} sm={6} md={3}>
    <Card onClick={routeToDetailPage} style={{ cursor: 'pointer' }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {console.log("nft returning from useNft:::",nft)}
        <NftImgStyle alt=" " src={loading ? spinner : (nft !== undefined ? (nft.image !== "" ? nft.image : block) : block)} />
        {/* {nft !== undefined?<NftImgStyle alt=" " src={loading ? spinner : nft.image} />: callingOpensea(contractAddress,tokenId)} */}
        
      </Box>

      <Stack spacing={2} direction='row' sx={{ p: 3 }}>
        {/* <Link to="#" color="inherit" underline="hover" component={RouterLink}> */}
        <Typography variant="subtitle2" noWrap sx={{ color: '#737373' }}>
          {/* {nftObject==null ? "loading":nftObject.name} */}
          {loading ? "loading" : (nft !== undefined ? nft.name : 'N/A')}
        </Typography>
        {console.log("price value:::", price)}
        {price !== 0 ? <Typography variant="subtitle2" align='right' sx={{ color: '#737373' }}>{price}ETH</Typography> : <div></div>}
        {/* </Link> */}

        <Stack direction="row" alignItems="center" justifyContent="space-between">
        </Stack>
      </Stack> 
    </Card>
    </Grid>:<></>):<></>}
    
   </>
  );
}
