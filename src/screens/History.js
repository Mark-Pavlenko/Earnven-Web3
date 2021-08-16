// import React ,{Component} from 'react';
import TransactionHistory from '../components/transactionHistory';
import { useParams } from 'react-router-dom';
import { Stack,Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

// export default class History extends Component{
//     render(){
//         return(
//             <div style={{marginLeft:'70px'}}>
//                 {/* <h1 style={{color:'white', textAlign:'center'}}> History Page Work In Progress</h1> */}
//                 <TransactionHistory />
//             </div>
//         );
//     }
// }


export default function History() {
    const {address} = useParams();
    const navigate = useNavigate();

    /* const routeToNft = () => {
        navigate(`/${address}/nftdesign`);
    }
    const routeToDashboard = () =>{
        navigate(`/${address}/dashboard`)
    }; */

    return (
        <div style={{ marginLeft: '70px' }}>
            {/* <Stack direction='row' spacing={1} sx={{marginTop:"13px",marginLeft:'-48px'}}>
                    <Button variant='text'  sx={{fontSize:'20px',color:"#737373",pt:0}} onClick={routeToDashboard}>Dashboard</Button>
                    <Button variant='text' sx={{fontSize:'20px',color:"#737373",pt:0}} onClick={routeToNft}>NFT Collection</Button>
                    <Button variant='text' sx={{fontSize:'20px',color:"#737373",pt:0}} >History</Button>
                </Stack> */}
            {/* <h1 style={{color:'white', textAlign:'center'}}> History Page Work In Progress</h1> */}
            {/* {console.log("address inside history component::",address)} */}
            <TransactionHistory address={address}/>
        </div>
    );
}