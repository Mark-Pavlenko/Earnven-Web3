import React , {useEffect, useState} from 'react'
import AmountInput from '../components/amountInput'
import TransparentButton from '../components/TransparentButton'
import AirDropper from '../abi/airDroppper.json'
import Web3 from 'web3' 
import ERC20 from '../abi/ERC20.json'

export default function AirDrop() {
    const [TokenAddress, setTokenAddress] = useState('')
    const [TokenAmount, setTokenAmount] = useState('')
    const [AddressArray, setAddressArray] = useState('')

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
        await loadWeb3()
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()

        let arr1 = AddressArray.split(',')
        for(var i =0; i<arr1.length ;i++){
            arr1[i] = arr1[i].trim()
            arr1[i] = arr1[i].trim('\n')
        }
        let totalTokensWei = web3.utils.toWei(TokenAmount, 'ether');
        let tokenContract = await new web3.eth.Contract(ERC20, TokenAddress)
        let airDropperContract = await new web3.eth.Contract(AirDropper, '0xE729654DB3117Eee851B8E50bC52869eC06Afb86' );

        await tokenContract.methods.approve('0xE729654DB3117Eee851B8E50bC52869eC06Afb86', totalTokensWei ).send({from:accounts[0]})
        await airDropperContract.methods.doAirdrop(TokenAddress, arr1, totalTokensWei).send({from:accounts[0]})
    }

    return (
        <div>
            
            <center>
            <h1 style={{fontSize:'40px', color:'white'}}>Air Dropper</h1>
            
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
            onChange={(e)=>{setTokenAddress(e.target.value)}}
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
                placeholder='Supply Token Address*'
            >
            </input>

            <br/><br/>

            <textarea
                    placeholder="Token Tokens to AirDrop*"
                    // value={this.state.totalTokens}
                    className="margin-px-32"
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
                    onChange={(e)=>{setAddressArray(e.target.value)}}
            />

            <br/><br/>
            Total Tokens to Airdrop : &nbsp;&nbsp;
            <AmountInput
            onChange={(e)=>{setTokenAmount(e.target.value)}}
            />

            <br/><br/>
            <hr style={{width:'80%'}}/>
            <br/><br/>

            <TransparentButton
                value="Initiate AirDrop"
                onClick={onSubmit}
            />

            <br/><br/><br/>
            
            </div>

        </center>
    </div>
    )
}
