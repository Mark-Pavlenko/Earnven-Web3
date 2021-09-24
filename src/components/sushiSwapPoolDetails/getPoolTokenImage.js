/*
Created by Prabhakaran on 19/Sep/2021
This component is used to get the image for given token id for this here using ethplorer API to get 
token info including the image url

*/
const axios = require('axios')
const getPoolTokenImage = async (token0, token1) => {
  let image = {}
  let tokenAImage
  let tokenBImage
  await axios
    .get(
      `https://api.ethplorer.io/getTokenInfo/${token0}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
      {},
      {},
    )
    .then((result) => {
      if (result.data.image) {
        // console.log(response.data.image)
        tokenAImage = result.data.image
        //console.log('token0 Image', tokenAImage)
      }
    })

  await axios
    .get(
      `https://api.ethplorer.io/getTokenInfo/${token1}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,
      {},
      {},
    )
    .then((response) => {
      if (response.data.image) {
        tokenBImage = response.data.image
        //console.log('token1 image', tokenBImage)
      }
    })
  image = {
    token0Image: tokenAImage,
    token1Image: tokenBImage,
  }

  //   console.log('Image A', image.token0Image)
  //   console.log('Image B', image.token1Image)
  return image
}
// getPoolTokenImage(
//   '0x6b175474e89094c44da98b954eedeac495271d0f',
//   '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
// )
export default getPoolTokenImage
