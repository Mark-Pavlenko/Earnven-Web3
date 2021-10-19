import React, {Component} from 'react'
import Swap from '../../abi/Swap.json'
import IUniswapV2Router02 from '../../abi/IUniswapV2Router02.json'
import Web3 from 'web3'
// import Header from './Header'
import ERC20 from '../../abi/ERC20.json'
import "react-toastify/dist/ReactToastify.css";

class Swapping extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Tokenamount: '',
            account: '',
            balance: '',
            swapping: null,
            erc20: null,
            unsiswap: null,
            loading: false,
            targetToken: "",
            contractaddress: "",
            options: [
                {value: '', label: 'Select the token to approve'},
                {value: '0xad6d458402f60fd3bd25163575031acdce07538d', label: 'DAI'},
                {value: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', label: 'UNI'},
                {value: '0xc778417e063141139fce010982780140aa0cd5ab', label: 'WETH'}
            ],
            tokenBlock: [{
                isApprove: false,
                tokenAddress: "",
                tokenAmount: ""
            }]
        }
    }

    // eslint-disable-next-line react/no-deprecated
    async componentWillMount() {
        //detect metamask
        const metamaskInstalled = typeof window.web3 !== 'undefined'
        this.setState({metamaskInstalled})
        if (metamaskInstalled) {
            await this.loadWeb3()
            await this.loadBlockchainData()
        }
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert("Please Install Metamask...")
        }
    }

    async loadBlockchainData() {

        const web3 = window.web3

        const accounts = await web3.eth.getAccounts()
        this.setState({account: accounts[0]})

        console.log("logged in account address::", accounts[0]);

        const balances = await web3.eth.getBalance(this.state.account)
        console.log("balance of this account:::", balances);
        this.setState({balance: balances})

        const networkId = await web3.eth.net.getId()

        if (networkId === 4) {
            const swap = new web3.eth.Contract(Swap, "0x868501a0c7743624b3C7Cb33C36A1E929Ab8472E")
            this.setState({swapping: swap})

            const uniswap = new web3.eth.Contract(IUniswapV2Router02, "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")
            this.setState({uniswap: uniswap})

        } else {
            alert("Smart contract not deployed to this network..")
        }
    }

    async symbol() {
        const web3 = window.web3
        const tokenBlock = this.state.contractaddress
        const ercContract = await new web3.eth.Contract(ERC20, tokenBlock)
        this.setState({erc20: ercContract})
        this.state.erc20.methods.symbol().call({from: this.state.account}).then((res) => {
            const obj = {value: tokenBlock, label: res};
            const newArray = this.state.options.slice(); // Create a copy
            newArray.push(obj); // Push the object
            this.setState({options: newArray});
            // this.setState({
            //   options: [...this.state.options, obj]
            // });

        }).catch(console.log)
    }

    async onApprove(i) {
        const web3 = window.web3
        const tokenBlock = this.state.tokenBlock[i]
        const ercContract = await new web3.eth.Contract(ERC20, tokenBlock.tokenAddress)
        this.setState({erc20: ercContract})

        await this.state.erc20.methods.balanceOf(this.state.account).call({from: this.state.account}).then((balance) => {
            let amount = 1000000000;
            console.log("value of balance::", balance);
            console.log("value you have shared for swap::", tokenBlock.tokenAmount);
            if (parseInt(balance) > parseInt(tokenBlock.tokenAmount) && amount <= tokenBlock.tokenAmount) {
                this.state.erc20.methods.symbol().call({from: this.state.account}).then(() => {
                }).catch(console.log)
                this.state.erc20.methods.approve("0x868501a0c7743624b3C7Cb33C36A1E929Ab8472E", tokenBlock.tokenAmount).send({from: this.state.account})
                    .then(() => {
                        tokenBlock.isApprove = true
                        this.setState({...this.state})
                    })
                    .catch(() => {
                        alert("Transaction failed")
                    })
            } else {
                alert("Amount greater then balance or enter sufficient amount so transaction not fail")
            }

        })
            .catch(console.log)

    }

    swapToken() {
        const tokenBlock = this.state.tokenBlock
        const isValid = tokenBlock.every((token) => token.isApprove)
        if (isValid) {
            const tokenInputAddress = tokenBlock.map((token) => token.tokenAddress)
            const tokenInputAmount = tokenBlock.map((token) => token.tokenAmount)
            const tokenPath = tokenBlock.map(() => 1)
            const isEth = tokenBlock.map(() => false)
            const targetTokenAddress = this.state.targetToken
            //   await this.state.swapping.methods.swap(tokenInputAmount, tokenInputAddress, targetTokenAddress).send({ from: this.state.account })
            //     .then((res) => {
            //       alert("Transaction Done Successfully")
            //     })
            //     .catch((error) => {
            //       alert("Transaction failed!")
            // })
            console.log("value of tokenBlock:::", tokenBlock);
            this.state.swapping.methods.swap(tokenInputAmount, tokenInputAddress, tokenPath, isEth, targetTokenAddress)
                .send({from: this.state.account})
        } else {
            alert("First Approve the transaction")
        }
    }

    addInput() {
        this.state.tokenBlock.push({
            isApprove: false,
            tokenAddress: "",
            tokenAmount: ""
        })
        this.setState({...this.state})
    }

    handleChange(event, i) {
        this.state.tokenBlock[i][event.target.name] = event.target.value

        this.setState({...this.state})
    }

    handleTargetChange(event) {
        this.state.targetToken = event.target.value
        this.setState({...this.state})
    }

    handlecontractChange(event) {
        this.state.contractaddress = event.target.value
        this.setState({...this.state})
    }

    handleDelete(i) {
        const tokenList = this.state.tokenBlock
        tokenList.splice(i, 1)
        this.setState({...this.state})
    }

    render() {
        return (
            <div className="container mb-3">
                <div className="container">
                    <div>
                        <h5>Your Account Address: {this.state.account}</h5>
                        {/* <h5>Balance:{web3.utils.fromWei(this.state.balance,'ether')}
             ETH</h5> */}
                    </div>
                </div>
                <br/>
                {this.state.tokenBlock.map((token, i) => {
                    return (
                        <>
                            <form key={i}>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Token Address</label>
                                    <div className="col-sm-10">
                                        <select
                                            name="tokenAddress"
                                            required
                                            onChange={(event) => this.handleChange(event, i)}
                                            type="text"
                                            className="form-control">
                                            {this.state.options.map((value, label) => {
                                                return <option
                                                    value={this.state.options[label].value}>{this.state.options[label].label}</option>
                                            })

                                            }
                                        </select>
                                        <input
                                            name="tokenadd"
                                            placeholder="Enter token Address to add token or search"
                                            required
                                            onChange={(event) => this.handlecontractChange(event)}
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <br/>

                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Token Amount</label>
                                    <div className="col-sm-10">
                                        <input
                                            name="tokenAmount"
                                            required
                                            className="form-control"
                                            placeholder="Enter amount of tokens eg.1000"
                                            onChange={(event) => this.handleChange(event, i)}
                                        />
                                    </div>
                                </div>
                                <br/>
                            </form>
                            <br/>
                            <div>{token.isApprove ? <p className="text-success">Approved</p> :
                                <p className="text-danger">Not Approved</p>}</div>
                            <button className="btn btn-primary" style={{marginRight: '16px'}} onClick={(event) => {
                                event.preventDefault()
                                this.onApprove(i)
                            }}>Approve
                            </button>

                            <button className="btn btn-outline-success" onClick={() => {
                                this.symbol()
                            }}>Add Token
                            </button>
                            <button className="btn btn-danger" onClick={() => {
                                this.handleDelete(i)
                            }}>Delete
                            </button>
                            <hr/>
                        </>
                    )
                })
                }
                <div>
                    <button className="btn btn-warning" onClick={() => {
                        this.addInput()
                    }}>Add
                    </button>
                </div>
                <br/>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Target Token Address</label>
                    <div className="col-sm-10">
                        <input
                            name="targetToken"
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter target token address"
                            onChange={(event) => this.handleTargetChange(event)}
                        />
                    </div>
                </div>
                <br/>
                <div>
                    <button className="btn btn-outline-success" onClick={() => {
                        this.swapToken()
                    }}>Swap
                    </button>
                </div>
            </div>
        )
    }
}

export default Swapping