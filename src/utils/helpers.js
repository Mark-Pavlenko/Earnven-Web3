export default function walletAddressCutter(addy, name) {
  if (addy === '') {
    return addy;
  }
  if (addy) {
    if (name === 'null') {
      const l = addy.length;
      return `${
        addy[0] + addy[1] + addy[2] + addy[3] + addy[4] + addy[5] + addy[6] + addy[7] + addy[8]
      }...${addy[l - 7]}${addy[l - 6]}${addy[l - 5]}${addy[l - 4]}${addy[l - 3]}${addy[l - 2]}${
        addy[l - 1]
      }`;
    } else {
      return name;
    }
  }
}
