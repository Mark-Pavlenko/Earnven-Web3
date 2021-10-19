import { Box, Card, Typography, Stack } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import spinner from '../../assets/icons/spinner.svg'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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
  const [nftDetails, setnftDetails] = useState()

  // const { loading, error, nft } = useNft(
  //   contractAddress,
  //   tokenId
  // )

  // useEffect(() => {
  //   const getNft = async () =>{
  //     const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8"))
  //     const nftContract = new web3.eth.Contract(
  //       nftAbi,
  //       contractAddress,
  //       { gasLimit: "1000000" });
  //       const result = await nftContract.methods.tokenURI(tokenId).call();

  //       getMetaData(result);
  //   }

  //    getNft();


  // }, [contractAddress,tokenId])

  // const getMetaData = async (tokenUri)=>{
  //   const response = await axios.get(tokenUri);
  //   const result = response.data;
  //   console.log("value of metadata of each nft::",result);
  // }

  useEffect(() => {
    const nftDetail = async () =>{
      try{
         const response = await axios.get(`https://api.opensea.io/api/v1/assets?token_ids=${tokenId}&asset_contract_addresses=${contractAddress}`);
         const tempObject={}
         tempObject.name= response.data.assets[0].name;
         tempObject.img=response.data.assets[0].image_url;
         setnftDetails(tempObject)
        }
        catch{
          // do smth.
        }
    }

    nftDetail();
 }, [contractAddress, tokenId])

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
    {/* {nft !== undefined? (nft.image !==""? */}
    {/* <Grid key={nft.tokenID} item xs={12} sm={6} md={3}> */}
    <Card onClick={routeToDetailPage} style={{ cursor: 'pointer' }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* {console.log("nft returning from useNft:::",nft.image)} */}
        {/* <NftImgStyle alt=" " src={loading ? spinner : (nft !== undefined ? (nft.image !== "" ? nft.image : block) : block)} /> */}
        {nftDetails!==undefined?<NftImgStyle alt=" " src={nftDetails.img} />:<NftImgStyle alt=" " src={spinner} />}
        {/* <NftImgStyle alt=" " src={nft.image} /> */}
        {/* {nft !== undefined?<NftImgStyle alt=" " src={loading ? spinner : nft.image} />: callingOpensea(contractAddress,tokenId)} */}

      </Box>

      <Stack spacing={2} direction='row' sx={{ p: 3 }}>
        {/* <Link to="#" color="inherit" underline="hover" component={RouterLink}> */}
        <Typography variant="subtitle2" noWrap sx={{ color: '#737373' }}>
          {/* {nftObject==null ? "loading":nftObject.name} */}
          {/* {loading ? "loading" : (nft !== undefined ? nft.name : 'N/A')} */}
          {nftDetails!==undefined?nftDetails.name:'loading'}
        </Typography>
        {price !== 0 ? <Typography variant="subtitle2" align='right' sx={{ color: '#737373' }}>{price}ETH</Typography> : <div></div>}
        {/* </Link> */}

        <Stack direction="row" alignItems="center" justifyContent="space-between">
        </Stack>
      </Stack>
    </Card>
    {/* </Grid>:<></>):<> </>} */}

   </>
  );
}
