import PropTypes from 'prop-types';
// material
import { Grid } from '@material-ui/core';
import NftCard from './NftCard'

// ----------------------------------------------------------------------

NftList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function NftList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <NftCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}