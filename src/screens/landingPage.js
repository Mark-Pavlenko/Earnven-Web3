import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Index from '../components/WalletConnectionPage';

export default function LandingPage() {
  const navigate = useNavigate();
  const [shoWalletComponent, setShoWalletComponent] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('selected-account')) {
      const address = localStorage.getItem('selected-account');
      navigate(`/${address}/dashboard`);
    } else {
      setShoWalletComponent(true);
    }
  }, [navigate]);

  return <div>{shoWalletComponent && <Index />}</div>;
}
