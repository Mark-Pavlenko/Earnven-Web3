import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';


import { useNft } from "use-nft"
import spinner from '../../assets/icons/spinner.svg'
import block from '../../assets/icons/block.png'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NftImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------


export default function NftCard({ tokenId, contractAddress }) {
  const navigate = useNavigate();
  const {address} = useParams();

  const { loading, error, nft } = useNft(
    contractAddress,
    tokenId
  )
  
  const routeToDetailPage=()=>{
    navigate(`/${address}/nftdetails/${contractAddress}/${tokenId}`)
  }

  return (
    <Card onClick={routeToDetailPage} style={{cursor:'pointer'}}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <NftImgStyle alt=" " src={loading ? spinner : (nft !== undefined ? (nft.image !== "" ? nft.image : block) : block)} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap sx={{ color: '#737373' }}>
            {/* {nftObject==null ? "loading":nftObject.name} */}
            {loading ? "loading" : (nft !== undefined ? nft.name : 'N/A')}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
        </Stack>
      </Stack>
    </Card>
  );
}
