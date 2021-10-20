import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import TransparentButton from '../TransparentButton';

let contents = '';

export default function Index({ contractAddress, tokenIDs }) {
  const [Content, setContent] = useState('');

  function shorten(id) {
    if (id.length > 10) {
      const len = id.length;
      id = `${id[0] + id[1] + id[2] + id[3]}.....${id[len - 1]}${id[len - 2]}${id[len - 3]}${
        id[len - 4]
      }`;
    }
    return id;
  }

  const change = useCallback(
    (arr) => {
      contents = arr.map((object) => (
        <div
          style={{
            color: 'white',
            display: 'inline-block',
            marginLeft: '20px',
            marginTop: '10px',
          }}>
          <Link to={{ pathname: `/app/nft-token/${contractAddress}/${object}` }}>
            <TransparentButton
              style={{
                height: '45px',
                width: '200px',
                borderWidth: '1px',
                background: 'transparent',
                borderStyle: 'solid',
                borderColor: '#ac6afc',
                borderRadius: '5px',
                color: 'white',
                cursor: 'pointer',
              }}
              value={shorten(object)}
            />
          </Link>
        </div>
      ));
      // console.log(contents)
    },
    [contractAddress]
  );

  useEffect(() => {
    // console.log(contractAddress)
    change(tokenIDs);
    setContent(contents);
  }, [tokenIDs, change]);

  return <div>{Content}</div>;
}
