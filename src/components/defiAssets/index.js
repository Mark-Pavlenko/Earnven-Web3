import React from 'react';
import * as BiIcons from 'react-icons/bi';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const AssetList = [
  {
    asset: 'Wallet',
    value: '$5687',
  },
  {
    asset: 'Deposits',
    value: '$7834',
  },
  {
    asset: 'NFTs',
    value: '$1245',
  },
  {
    asset: 'Liquidity pools',
    value: '$9876',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  color: '#fff',
  border: '1px solid #737373',
  borderRadius: '7px',
}));

function AssetItem({ asset, value }) {
  return (
    <div style={{ height: '28px', marginTop: '17px' }}>
      <BiIcons.BiWallet className="icons" style={{ float: 'left', paddingTop: '0px' }} />
      <p style={{ float: 'left', position: 'relative', margin: '0px', marginLeft: '11px' }}>
        {asset}
      </p>
      <hr
        style={{
          borderTop: '1px dashed',
          borderBottom: '0px',
          width: '30%',
          margin: 'revert',
          marginLeft: '11px',
          float: 'left',
          marginRight: '10px',
        }}
      />
      <p style={{ display: 'contents' }}>{value}</p>
    </div>
  );
}

export default function DefiAssets() {
  return (
    /* <div style={{ border: '1px solid #737373', borderRadius: '7px', width: '260px', height: '253px' }}>
                <div style={{ margin: '30px', color: '#f5f5f5', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '300', letterSpacing: '0.025em',fontSize:'12px' }}>
                    <h4 style={{ margin: '5px',color:'#737373' ,fontSize:'14px'}}>Defi generalAssets</h4>
                    <div style={{  height: '28px', marginTop: '17px' }}>
                        <BiIcons.BiWallet className='icons' style={{ float: 'left', paddingTop: '0px' }} />
                        <p style={{ float: 'left', position: 'relative', margin: '0px', marginLeft: '11px' }}>Wallet</p>
                        <hr style={{ borderTop: '1px dashed', borderBottom: '0px', width: '30%',margin: 'revert', marginLeft: '11px', float: 'left',marginRight:'10px' }}></hr>
                        <p style={{ display: 'contents' }}>$52173.20</p>
                    </div>
                    <div style={{ height: '28px', marginTop: '17px' }}>
                        <BiIcons.BiWallet className='icons' style={{ float: 'left', paddingTop: '0px' }} />
                        <p style={{ float: 'left', position: 'relative', margin: '0px', marginLeft: '12px' }}>Deposits</p>
                        <hr style={{ borderTop: '1px dashed ', borderBottom: '0px', width: '24%',  margin: 'revert', marginLeft: '10px', float: 'left',marginRight:'10px' }}></hr>
                        <p style={{ display: 'contents' }}>$12173.20</p>
                    </div>
                    <div style={{ height: '28px', marginTop: '17px' }}>
                        <BiIcons.BiWallet className='icons' style={{ float: 'left', paddingTop: '0px' }} />
                        <p style={{ float: 'left', position: 'relative', margin: '0px', marginLeft: '12px' }}>NFTs</p>
                        <hr style={{ borderTop: '1px dashed ', borderBottom: '0px', width: '34%',  margin: 'revert', marginLeft: '10px', float: 'left',marginRight:'10px' }}></hr>
                        <p style={{ display: 'contents' }}>$2126.20</p>
                    </div>
                    <div style={{  height: '28px', marginTop: '17px' }}>
                        <BiIcons.BiWallet className='icons' style={{ float: 'left', paddingTop: '0px' }} />
                        <p style={{ float: 'left', position: 'relative', margin: '0px', marginLeft: '12px' }}>Liquidity pools</p>
                        <hr style={{ borderTop: '1px dashed', borderBottom: '0px', width: '10%',margin: 'revert', marginLeft: '8px', float: 'left',marginRight:'10px' }}></hr>
                        <p style={{ display: 'contents' }}>$193.20</p>
                    </div>
                </div>
            </div> */
    <RootStyle>
      <div style={{ margin: '9px' }}>
        <Typography>Defi assets</Typography>
        {AssetList.map((item) => (
          <AssetItem asset={item.asset} value={item.value} />
        ))}
      </div>
    </RootStyle>
  );
}
