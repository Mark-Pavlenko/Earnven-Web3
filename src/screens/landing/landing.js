import React from 'react';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  const route = () => {
    navigate('/app/dashboard', { replace: true });
  };

  return (
    <div>
      <h1>Welcome to zPYLON</h1>
      <Button variant="contained" color="primary" onClick={route}>
        {" Let's Go"}
      </Button>
    </div>
  );
}
