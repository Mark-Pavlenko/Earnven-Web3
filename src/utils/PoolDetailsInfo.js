import React from 'react'
import './PoolDetailsInfo.css'
import {IconButton, ListItem,} from '@material-ui/core'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {MdContentCopy} from 'react-icons/md'
import {string} from "prop-types";

// call this component to get pool details information in main page at footer.
function PoolDetailsInfo(props) {
    let tokenASymbol = props.tokenASymbol
    let tokenBSymbol = props.tokenBSymbol
    let tokenAId = props.tokenAId
    let tokenBId = props.tokenBId
    let tokenPair = props.tokenPair
    let tokeIdPairAddress
    let tokenAAddress
    let tokenBAddress
    // let url = `https://etherscan.io/address/${tokenPair}}`
    // below code to get pairAddress and substring since address size is larger
    // showing first few digits and last few digits
    // ex :0xb4e1...c9dc
    try {
        const setTokenAddress = (token) => {
            let tokenId = token
            // get the length of the pair address
            let tokenLength = tokenId.length
            // get first 6 digit of the address
            let tokenPairAddress1 = tokenId.substring(0, 6)
            // get last 4 digit of address
            let tokenPairAddress2 = tokenId.substring(tokenLength - 4, tokenLength)
            return tokenPairAddress1 + '...' + tokenPairAddress2
        }
        // call the function to get token Address for paird token and tokens of the each pair
        tokeIdPairAddress = setTokenAddress(tokenPair)
        tokenAAddress = setTokenAddress(tokenAId)
        tokenBAddress = setTokenAddress(tokenBId)
    } catch (err) {
        console.log('No token found!!')
    }

    return (
        <div style={{marginTop: '100px'}}>
            <h2>&nbsp;Pair Information </h2>
            <div className="pairInfo-item">
                <div className="pairInfo__description">
                    <h4 style={{padding: '0.7rem'}}>Pair Name</h4>
                    &nbsp;&nbsp;{tokenASymbol}-{tokenBSymbol}
                </div>
                <div className="pairInfo__description">
                    <h4 style={{padding: '0.5rem'}}>Pair address</h4>
                    &nbsp;&nbsp;{tokeIdPairAddress}
                    <ListItem secondaryAction={
                        <IconButton edge="end" aria-label="copy">
                            <CopyToClipboard text={tokenPair}>
                                <MdContentCopy className="pairInfo__iconCopy"/>
                            </CopyToClipboard>
                        </IconButton>
                    }/>
                </div>
                <div className="pairInfo__description">
                    <h5 style={{padding: '0.5rem'}}>{tokenASymbol} Address</h5>
                    &nbsp;&nbsp;{tokenAAddress}
                    <ListItem secondaryAction={
                        <IconButton edge="end" aria-label="copy">
                            <CopyToClipboard text={tokenAId}>
                                <MdContentCopy className="pairInfo__iconCopy"/>
                            </CopyToClipboard>
                        </IconButton>
                    }/>
                </div>
                <div className="pairInfo__description">
                    <h5 style={{padding: '0.5rem'}}>{tokenBSymbol} Address</h5>
                    &nbsp;&nbsp;{tokenBAddress}
                    <ListItem secondaryAction={
                        <IconButton edge="end" aria-label="copy">
                            <CopyToClipboard text={tokenBId}>
                                <MdContentCopy className="pairInfo__iconCopy"/>
                            </CopyToClipboard>
                        </IconButton>
                    }/>
                </div>
                <div style={{display: 'inline-block'}}>
                    <a href={`https://etherscan.io/address/${tokenPair}`}
                       style={{textDecoration: 'none', color: '#00FFE7',}}
                       target="blank">
                        Etherscan &#8599;
                    </a>
                </div>
            </div>
        </div>
    )
}

PoolDetailsInfo.propTypes = {
    tokenASymbol: string,
    tokenBSymbol: string,
    tokenAId: string,
    tokenBId: string,
    tokenPair: string
}

export default PoolDetailsInfo
