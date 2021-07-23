import React, { Component } from 'react'
import Web3 from 'web3';
import axios from 'axios';
import { BrowserView, MobileView } from 'react-device-detect';
import { Link } from 'react-router-dom';

var contents = ''
var arr2 = []
export default class index extends Component {

    async componentWillMount(){
        // await this.loadWeb3();
        await this.loadBlockchainData();
        
    }

    // async loadWeb3() {
    //     if (window.ethereum) {
    //       window.web3 = new Web3(window.ethereum)
    //       await window.ethereum.enable()
    //     }
    //     else if (window.web3) {
    //       window.web3 = new Web3(window.web3.currentProvider)
    //     }
    //     else {
    //       window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    //     }
    // }

     componentDidUpdate(){
        if(this.state.account !== this.props.address){
            console.log("all assets mini should re render")
             this.loadBlockchainData();
        }
    }


    async loadBlockchainData(){
        // const web3 = window.web3;
        // const accounts = await web3.eth.getAccounts();
        // this.setState({account:accounts[0]})
        const web3 = new Web3();
        const address = this.props.address;
        this.setState({account:this.props.address})
        this.setState({contents:''})
        await axios.get(`https://api.ethplorer.io/getAddressInfo/${address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,{},{})
        // await axios.get(`https://api.ethplorer.io/getAddressInfo/${this.state.account}?apiKey=EK-qSPda-W9rX7yJ-UY93y`,{},{})
        .then(async(response) => {
            var arr1 = []
            var tokens = response.data.tokens
            // console.log(tokens)
            if(tokens!==undefined){
                for(var i = 0; i<tokens.length ; i++){
                    if(tokens[i].tokenInfo.price !== false){
                        tokens[i].totalInvestment = (web3.utils.fromWei(tokens[i].rawBalance, 'ether'))*(tokens[i].tokenInfo.price.rate)
                        arr1.push(tokens[i])
                    }
                }

                arr1.sort((a, b) => parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment));

            console.log(arr1)

            arr2 = []
            for(i=0; i<4; i++){
                if(arr1[i]){
                    var object = {};
                object.coingecko = arr1[i].tokenInfo.coingecko
                object.address = arr1[i].tokenInfo.address
                object.name = arr1[i].tokenInfo.name
                object.profit = arr1[i].tokenInfo.price.diff
                object.symbol = arr1[i].tokenInfo.symbol
                object.image = arr1[i].tokenInfo.image
                object.balance = parseFloat(web3.utils.fromWei(arr1[i].rawBalance, 'ether')).toFixed(2)
                object.rate = parseFloat(arr1[i].tokenInfo.price.rate).toFixed(2)
                object.totalInvestment = parseFloat(arr1[i].totalInvestment).toFixed(2)
                arr2.push(object)
                }
            }

            
            this.change(arr2)
            this.setState({contents})
            }    
            
    })
    }

    change = (arr) =>{
        contents = arr.map((object)=>
        
        <div>
    <BrowserView>
        <Link to={`/app/token/${object.coingecko}`}>
        <div 
            style={{
                height:'75px',
                // width:'678px',
                background:'transparent',
                cursor:'pointer'
            }}>
            <div style={{width:'7%', height:'75px',float:'left'}}>
                <img style={{marginLeft:'10px', height:'30px', width:'30px', marginTop:'15px'}} alt='' src={`https://ethplorer.io${object.image}`}/>
            </div>

            <div style={{width:'23%', height:'75px',float:'left'}}>
                <font color='white'> <br/>{object.name}</font>
            </div>

            <div style={{width:'15%', height:'75px',float:'left'}}>
                <font color='white'> <br/>{object.profit} %</font>
            </div>

            <div style={{width:'30%', height:'75px',float:'left'}}>
                <font color='white'> <br/> {object.balance} {object.symbol} | ${object.rate} </font>
            </div>

            <div style={{width:'25%', height:'75px',float:'left'}}>
                <font color='white'><br/> ${object.totalInvestment} </font>
            </div>

            <hr></hr>

        </div>
        </Link>
        </BrowserView>
        <MobileView>
        <Link to={`/app/token/${object.coingecko}`}>
        <div 
            style={{
                // height:'75px',
                // width:'678px',
                background:'transparent',
                cursor:'pointer'
            }}>
            <div style={{ height:'50px'}}>
                <img style={{marginLeft:'10px', height:'30px', width:'30px', marginTop:'15px', display:'inline-block'}} alt='' src={`https://ethplorer.io${object.image}`}/>
                &nbsp;&nbsp;<font color='white'>{object.name}</font>
            </div>

            <div style={{ height:'50px'}}>
                <font color='white'> <br/>{object.profit} %</font>
            </div>

            <div style={{height:'50px'}}>
                <font color='white'> <br/> {object.balance} {object.symbol} | ${object.rate} </font>
            </div>

            <div style={{height:'50px'}}>
                <font color='white'><br/> ${object.totalInvestment} </font>
            </div> 
            
            <br/>

            <hr></hr>

        </div>
        </Link>
        </MobileView>
        </div>
        
        )
        // console.log(contents)
    }

    constructor(){
        super()
        this.state={
            account:'',
            contents:''
        }
    }

    mouseOver = (e) => {
        e.target.style.background = '#BB86FC'
    }

    mouseOut = (e) => {
        e.target.style.background = 'transparent'
    }

    render() {
        this.change(arr2)
        return (
            <div style={{
                // width:'683px',
                // height:'300px',
                background:'transparent',
                border:'1px',
                borderStyle:'solid',
                borderColor:'#737373',
                borderRadius:'10px'
            }}>
                {console.log("all asset mini jsx is rendered")}
            <center>
            <div style={{marginTop:'30px', marginRight:'60%', fontSize:'20px', marginBottom:'10px'}}>
                <font color='white'> All Assets </font>
            </div>

            {this.state.contents}
            
            </center>      
            </div>
        )
    }
}
