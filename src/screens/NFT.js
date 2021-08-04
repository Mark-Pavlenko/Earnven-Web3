import Page from "../components/Page";
import PRODUCTS from "../_mocks_/nfts"; 
import NftList from "../components/Nft/NftList";
import { Container, Stack, Typography } from '@material-ui/core';
export default function NFT() {
    return (
        <Page title="Nft">
            <Container>
                <Typography variant="h2" sx={{ mb: 5 }}>
                    NFT
                </Typography>


                <NftList products={PRODUCTS} />
            </Container>
        </Page>
    );
}