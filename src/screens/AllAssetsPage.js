import React from 'react';
import { useParams } from 'react-router-dom';
import AllAssets from '../components/allAssets';

export default function AllAssetsPage() {
  const { address } = useParams();
  return (
    <center>
      <div style={{ width: '80%', marginTop: '50px' }}>
        <AllAssets address={address} />
      </div>
    </center>
  );
}
