import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TransparentButton from '../TransparentButton';

export default function Index() {
  const { contract, id } = useParams();
  const [Name, setName] = useState('Name');
  const [ContractName, setContractName] = useState('Contract Name');
  const [Desc, setDesc] = useState('Description');
  const [OpenSeaURL, setOpenSeaURL] = useState('URL');
  const [ObjectURL, setObjectURL] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png'
  );

  useEffect(() => {
    async function getData() {
      await axios
        .get(
          `https://api.opensea.io/api/v1/assets?token_ids=${id}&asset_contract_addresses=${contract}`,
          {},
          {}
        )
        .then(async (response) => {
          if (response.data.assets[0]) {
            setName(response.data.assets[0].name);
            setObjectURL(response.data.assets[0].image_url);
            setContractName(response.data.assets[0].asset_contract.name);
            setDesc(response.data.assets[0].description);
            setOpenSeaURL(response.data.assets[0].permalink);
          } else {
            alert('NFT Details Not Available! Go Back!');
          }
        });
    }
    getData();
  }, [contract, id, ObjectURL]);

  return (
    <div>
      <center>
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px',
            borderColor: 'white',
            borderStyle: 'solid',
            width: '90%',
            borderRadius: '50px',
          }}>
          <br />
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.1)',
              border: '1px',
              borderColor: 'white',
              borderStyle: 'solid',
              width: '95%',
              borderRadius: '10px',
              padding: '15px',
            }}>
            <img
              src={ObjectURL}
              style={{ maxHeight: '400px', maxWidth: '300px' }}
              aria-label="image"
            />
          </div>

          <br />

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.1)',
              color: 'white',
              border: '1px',
              borderColor: 'white',
              textAlign: 'left',
              borderStyle: 'solid',
              width: '95%',
              borderRadius: '20px',
              padding: '15px',
            }}>
            <center>
              <h2 style={{ color: 'white' }}>{Name}</h2> <br />
              <h4 style={{ color: 'white' }}>{ContractName}</h4>
              <br />
              <div style={{ wordBreak: 'break-word' }}>{Desc}</div>
              <br /> <br />
              <a href={OpenSeaURL} target="_blank" rel="noreferrer">
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
                  value="View on OpenSea &#8599;"
                />
              </a>
            </center>
          </div>
          <br />
        </div>
      </center>
    </div>
  );
}
