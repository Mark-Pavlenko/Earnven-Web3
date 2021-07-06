import React, { Component } from 'react'
import Input from '../components/amountInput/index'
import SearchInput from '../components/searchInput/index'
import GasDropDownMenu from '../components/gasDropDownMenu/index'
import LanguageDropDownMenu from '../components/languageDropDown/index'
import HelpDropDownMenu from '../components/helpDropDown/index'
import TransparentButton from '../components/TransparentButton'
import NetworkDropDown from '../components/networkDropDown'
import TotalValueBox from '../components/totalValueBox'
import AllAssetsMini from '../components/allAssetsMini'
import AllAssets from '../components/allAssets'
import TransactionHistory from '../components/transactionHistory'
// import SearchTokens from '../components/searchTokens'
import TokenDetails from '../components/tokenDetails'
import {data} from '../globalStore'

export default class testingPage extends Component {

    constructor(props){
        super(props)
        this.state={
            token : ''
        }
    }

    render() {
        return (
            <div>
                For Testing Purposes
                <br/><br/>
                Token : {this.state.token}
                <br/>
                <div style={{backgroundColor:'#141A1E', height:'auto', width:'1000px', paddingBottom:'50px'}}>
                    <center><br/><br/>
                    <Input/> 
                    
                    <br/><br/>
                    <SearchInput placeholder='Search Tokens...'/>

                    <br/><br/>
                    <GasDropDownMenu/>

                    <br/><br/>
                    <LanguageDropDownMenu/>

                    <br/><br/>
                    <HelpDropDownMenu/>

                    <br/><br/>
                    <TransparentButton value='Submit'/>

                    <br/><br/>
                    <NetworkDropDown/>

                    <br/><br/>
                    <TotalValueBox/>

                    <br/><br/>
                    <AllAssetsMini/>

                    <br/><br/>
                    <AllAssets/>

                    <br/><br/>
                    <TransactionHistory/>

                    <br/><br/>
                    <br/><br/>
                    <TokenDetails/>

                    <br/><br/><br/><br/><br/>
                    <button
                    onClick={(e)=>{console.log(data)}}>
                        Get Global Variables
                    </button>
                    </center>
                </div>
            </div>
        )
    }
}
