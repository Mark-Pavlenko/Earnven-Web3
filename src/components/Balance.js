import { Box, Typography } from '@material-ui/core';
// import AccountBalance from "./AccountBalance";
import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import axios from 'axios';

function Balance({ address }) {
  const [totalValue, settotalValue] = useState('00.00');
  console.log('ball', totalValue);
  function CommaFormatted(amount) {
    const delimiter = ','; // replace comma if desired
    const ab = amount.split('.', 2);
    const d = ab[1];
    let i = parseInt(ab[0]);
    if (isNaN(i)) {
      return '';
    }
    let minus = '';
    if (i < 0) {
      minus = '-';
    }
    i = Math.abs(i);
    let n = i.toString();
    const a = [];
    while (n.length > 3) {
      const nn = n.substr(n.length - 3);
      a.unshift(nn);
      n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) {
      a.unshift(n);
    }
    n = a.join(delimiter);
    if (d.length < 1) {
      amount = n;
    } else {
      amount = `${n}.${d}`;
    }
    amount = minus + amount;
    return amount;
  }

  useEffect(() => {
    const accountAddress = address;

    async function getBalance() {
      try {
        await axios
          .get(
            `https://api2.ethplorer.io/getAddressChartHistory/${accountAddress}?apiKey=ethplorer.widget`,
            {},
            {}
          )
          .then(async (response) => {
            // console.log(response.data.history.data)
            const res = response.data.history.data;
            // console.log(res[res.length-1].balance)
            settotalValue(CommaFormatted(parseFloat(res[res.length - 1].balance).toFixed(2)));
          });
      } catch {
        // do smth.
      }
    }
    getBalance();
  }, [totalValue, address]);
  return (
    <Box sx={{ pb: 2 }}>
      <Typography variant="h3" sx={{ color: 'primary.main' }}>
        ${totalValue}
      </Typography>
      {/* <Typography variant="subtitle1" sx={{color:'common.white'}}>+ 10.4%($207.65)</Typography> */}
    </Box>
  );
}

Balance.propTypes = {
  address: string,
};

export default Balance;
