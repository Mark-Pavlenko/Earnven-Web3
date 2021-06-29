import React, { Component } from 'react'
import Web3 from 'web3';
import Curve from '../../assets/icons/curveTotalValueBox.png'
import axios from 'axios'

export default class index extends Component {

    async componentWillMount(){
        await this.loadWeb3();
        await this.loadBlockchainData();
        
    }

    async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadBlockchainData(){
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        this.setState({account:accounts[0]})

        await axios.get(`https://api.ethplorer.io/getAddressInfo/${this.state.account}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,{},{})
        .then(async(response) => {
            var tokens = response.data.tokens;
            var total= parseFloat(response.data.ETH.price.rate)*parseInt(web3.utils.fromWei(response.data.ETH.rawBalance,'ether')) ;
            if(tokens!==undefined){
                for(var i = 0; i<tokens.length; i++){
                
                    if(tokens[i].tokenInfo.price!==false){
                        total = total + parseFloat(tokens[i].tokenInfo.price.rate)*parseInt(web3.utils.fromWei(tokens[i].rawBalance,'ether'));
                        console.log(tokens[i].tokenInfo.price.rate,parseInt(web3.utils.fromWei(tokens[i].rawBalance,'ether')))
                    } 
                }
            }
            
            this.setState({totalValue: total.toFixed(2)})
            console.log(total)
    })

    }

    constructor(){
        super()
        this.state={
            account:'',
            totalValue: '00.00'
        }
    }

    render() {
        return (
            <div style={{
                        // background:Curve,
                        backgroundImage:`url(${Curve})`,
                        backgroundRepeat:'no-repeat',
                        backgroundPositionY:'10px',
                        backgroundPositionX:'-110px',
                        width:'300px',
                        height:'100px',
                        border:'1px',
                        borderStyle:'solid',
                        borderColor:'white',
                        borderRadius:'10px',
                    }}>
            {/* <img src={Curve}/> */}
            <div style={{marginTop:'20px', marginRight:'180px'}}>
                <font color='white'>Total Value</font>
            </div>
            <br/>
            <div style={{ fontSize:'40px', marginTop:'-15px', marginRight:'180px', width:'250px'}}>
                <font color='#03DAC6'>$ {this.state.totalValue}</font>
            </div>
            </div>
        )
    }
}
