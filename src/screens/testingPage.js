import React, { Component } from 'react';

export default class TestingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  render() {
    return (
      <div>
        For Testing Purposes
        <br />
        <br />
        Token : {this.state.token}
        <br />
        <div
          style={{
            backgroundColor: '#141A1E',
            height: 'auto',
            width: '1000px',
            paddingBottom: '50px',
          }}>
          {/* <center><br /><br />
                        <Input />

                        <br /><br />
                        <SearchInput placeholder='Search Tokens...' />

                        <br /><br />
                        <GasDropDownMenu />

                        <br /><br />
                        <LanguageDropDownMenu />

                        <br /><br />
                        <HelpDropDownMenu />

                        <br /><br />
                        <TransparentButton value='Submit' />

                        <br /><br />
                        <NetworkDropDown />

                        <br /><br />
                        <TotalValueBox />

                        <br /><br />
                        <AllAssetsMini />

                        <br /><br />
                        <AllAssets />

                        <br /><br />
                        <TransactionHistory />

                        <br /><br />
                        <br /><br />
                        {/* <TokenDetails/> 

                        <br /><br /><br /><br /><br />
                        <button
                            onClick={(e) => { console.log(data) }}>
                            Get Global Variables
                        </button>

                        <br /><br />

                    </center> */}
          {/* <DefiAssets />
                    <br /><br />
                    <Exchange />
                    <br /><br />
                    <LoansAndSavings /> */}
        </div>
      </div>
    );
  }
}
