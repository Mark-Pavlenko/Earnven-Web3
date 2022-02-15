export const filteredTokensByName = (event, searchTokensData) => {
  console.log('searched tokens Data', searchTokensData);

  let lowerCase = event.target.value.toLowerCase();
  let filteredSearchTokensList = searchTokensData.tokensList.filter((el) => {
    if (lowerCase.input === '') {
      return el;
    }
    //return the item which contains the user input
    else if (el.name !== undefined) {
      return el.name.toLowerCase().includes(lowerCase);
    } else {
      // console.log('undef el', el);
    }
  });
  if (searchTokensData.searchSendTokensList === true) {
    return filteredSearchTokensList;
  } else if (searchTokensData.searchReceiveTokensList === true) {
    return filteredSearchTokensList;
  }
};
