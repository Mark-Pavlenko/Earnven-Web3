import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCurveLpTokenImags } from '../../store/curveLpToken/actions';

export default function CurveLpImage(Token) {
  const [CurveLpTokenImageUrl, setCurveLpTokenImageUrl] = useState([]);
  const [CurveLpTokenImage, setCurveLpTokenImage] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      let tokenNames = Token.lpToken.split('/');
      await axios
        .get(`https://tokens.coingecko.com/uniswap/all.json`, {}, {})
        .then(async (response) => {
          let data = response.data.tokens;
          let tokens = tokenNames.map((token) => ({
            logoURI: data.find((x) => x.symbol.toUpperCase() === token.toUpperCase())
              ? data.find((x) => x.symbol.toUpperCase() === token.toUpperCase()).logoURI
              : 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', //get ether symbol
          }));
          setCurveLpTokenImageUrl(tokens);
          // dispatch(setCurveLpTokenImags(tokens));
        });
    }
    getData();
  }, [Token]);

  //to get tokenImage
  useEffect(() => {
    let imageContent = [];
    let objectUrl = CurveLpTokenImageUrl.map((object, index) => (
      <React.Fragment>
        <img
          style={{
            display: 'flex',
            marginLeft: index !== 0 ? '-10px' : '0',
            maxWidth: '21px',
            maxHeight: '21px',
            borderRadius: '50%',
            border: '2px solid orange',
          }}
          src={object.logoURI}
          alt=""
        />
      </React.Fragment>
    ));
    imageContent.push(objectUrl);
    setCurveLpTokenImage(imageContent);
  }, [CurveLpTokenImageUrl]);

  return <div style={{ display: 'flex', marginRight: '5px' }}>{CurveLpTokenImage}</div>;
}
