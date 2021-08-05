import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';


import { useNft } from "use-nft"
import spinner from '../../assets/icons/spinner.svg'
import block from '../../assets/icons/block.png'

const NftImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------


export default function NftCard({ tokenId, contractAddress }) {
  
  const { loading, error, nft } = useNft(
    contractAddress,
    tokenId
  )


  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <NftImgStyle alt=" " src={loading ? spinner : (nft.image!== undefined? nft.image:block)} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap sx={{ color: '#737373' }}>
            {/* {nftObject==null ? "loading":nftObject.name} */}
            {loading ? "loading" : nft.name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
        </Stack>
      </Stack>
    </Card>
  );
}
