import React from 'react'
// import {BrowserRouter, Switch, Route} from 'react-router-dom'

// import Home from './screens/home'
// import TestingPage from './screens/testingPage';
// import Landing from './screens/landing/landing';

import Router from './routes';
import ThemeConfig from './theme';
import ScrollToTop from './components/ScrollToTop';
import { NftProvider } from "use-nft"
import { Contract, ethers } from "ethers"


const ethersConfig = {
  ethers: { Contract },
  provider: new ethers.providers.InfuraProvider("homestead", "8b2159b7b0944586b64f0280c927d0a8")
}

function App() {
  return (
    /*  <>
     <BrowserRouter>
           <Switch>
             <Route exact path="/"> <Home/> </Route>
             <Route exact path="/"><Landing/></Route>
             <Route exact path="/test"> <TestingPage/> </Route>
           </Switch>
     </BrowserRouter>
     </> */
    <ThemeConfig>
      <ScrollToTop/>
      <NftProvider fetcher={["ethers", ethersConfig]}>
      <Router />
      </NftProvider>
    </ThemeConfig>

    /* <Router /> */

  );
}

export default App;
