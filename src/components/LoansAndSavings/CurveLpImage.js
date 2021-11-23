import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CurveLpImage(token) {
  const [CurveLpTokenImageUrl, setCurveLpTokenImageUrl] = useState([]);
  const [CurveLpTokenImage, setCurveLpTokenImage] = useState([]);

  useEffect(() => {
    async function getData() {
      let fetchedTokens = token.lpToken.split('/');

      await axios
        .get(`https://tokens.coingecko.com/uniswap/all.json`, {}, {})
        .then(async (response) => {
          let data = response.data.tokens;
          let tokens = fetchedTokens.map((token) => ({
            logoURI: data.find((x) => x.symbol.toUpperCase() === token.toUpperCase())
              ? data.find((x) => x.symbol.toUpperCase() === token.toUpperCase()).logoURI
              : '',
          }));
          setCurveLpTokenImageUrl(tokens);
        });
    }
    getData();
  }, [token]);

  //to get tokenImage
  useEffect(() => {
    let imageContent = [];
    let objectUrl = CurveLpTokenImageUrl.map((object) => (
      <React.Fragment>
        <img
          style={{
            height: '20px',
            width: '20px',
            display: 'inline-block',
          }}
          src={object.logoURI}
          alt=""
        />
      </React.Fragment>
    ));
    imageContent.push(objectUrl);
    setCurveLpTokenImage(imageContent);
  }, [CurveLpTokenImageUrl]);

  return <div>{CurveLpTokenImage}</div>;
}
