import React, { useState } from 'react'
import Web3 from 'web3'
import TransparentButton from '../components/TransparentButton'
import ERC20Factory from '../abi/ERC20Factory.json'

export default function TokenCreator() {

    const [TokenName, setTokenName] = useState();
    const [TokenSymbol, setTokenSymbol] = useState();
    const [TotalSupply, setTotalSupply] = useState();
    const [RecieverAddress, setReceiverAddress] = useState();

    async function loadWeb3(){
        if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        } else {
        window.alert(
            'Non-Ethereum browser detected. You should consider trying MetaMask!',
        )
        }
    }

    async function onSubmit(){
        if(TokenName==='' || TokenSymbol==='' || TotalSupply==='' || RecieverAddress===''){
            alert('Please Fill All The Details!')
        }

        else{
            await loadWeb3()
            const web3 = window.web3
            const accounts = await web3.eth.getAccounts()

            let totalSupplyWei = web3.utils.toWei(TotalSupply, 'ether');
            let tokenContract = await new web3.eth.Contract(ERC20Factory, '0xc738e327F107115d7b1797005150b94165ed5A2a');

            await tokenContract.methods.realeaseToken(TokenName, TokenSymbol, RecieverAddress, totalSupplyWei).send({from:accounts[0]})

        }
        
    }

    return (
        <div>
            <center>
            <h1 style={{fontSize:'40px', color:'white'}}>ERC20 Token Creator</h1>
            
            <br/><br/>

            <div 
            style={{
                border:'1px white solid',
                borderRadius:'20px',
                width:'50%'
            }}
            >
                
            <br/><br/>
            <input
            type='text'
            onChange={(e)=>{setTokenName(e.target.value)}}
            style={{background:'transparent',
                    borderColor:'#737373',
                    borderStyle:'solid',
                    borderWidth:'1px',
                    height:'50px',
                    width:'300px',
                    borderRadius:'10px',
                    color:'white',
                    paddingLeft:'15px', 
                    paddingRight:'15px',
                }}
                placeholder='Token Name*'
            >
            </input>

            <br/><br/>

            <input
            type='text'
            onChange={(e)=>{setTokenSymbol(e.target.value)}}
            style={{background:'transparent',
                    borderColor:'#737373',
                    borderStyle:'solid',
                    borderWidth:'1px',
                    height:'50px',
                    width:'300px',
                    borderRadius:'10px',
                    color:'white',
                    paddingLeft:'15px', 
                    paddingRight:'15px',
                }}
                placeholder='Token Symbol*'
            >
            </input>

            <br/><br/>

            <input
            type='number'
            onChange={(e)=>{setTotalSupply(e.target.value)}}
            style={{background:'transparent',
                    borderColor:'#737373',
                    borderStyle:'solid',
                    borderWidth:'1px',
                    height:'50px',
                    width:'300px',
                    borderRadius:'10px',
                    color:'white',
                    paddingLeft:'15px', 
                    paddingRight:'15px',
                }}
                placeholder='Total Supply*'
            >
            </input>

            <br/><br/>

            <input
            type='text'
            onChange={(e)=>{setReceiverAddress(e.target.value)}}
            style={{background:'transparent',
                    borderColor:'#737373',
                    borderStyle:'solid',
                    borderWidth:'1px',
                    height:'50px',
                    width:'300px',
                    borderRadius:'10px',
                    color:'white',
                    paddingLeft:'15px', 
                    paddingRight:'15px',
                }}
                placeholder='Receiver Address*'
            >
            </input>

            <br/><br/>
            <br/><br/>

            <TransparentButton
                value="Create ERC-20 Token"
                onClick={onSubmit}
            />

            <br/><br/>
            <br/><br/>


                </div>
            </center>
            
        </div>
    )
}
