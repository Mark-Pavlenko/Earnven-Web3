import React, {useState} from 'react'
import SearchTokens from '../searchTokens'
import {Chart} from '../Chart/Chart'
import { useNavigate } from 'react-router'


export default function Index() {

    var navigate = useNavigate();

    const [Token, setToken] = useState('')

    function callbackFunction(childData){
        setToken(childData)
        navigate(`/app/token/${childData}`)
    }

    return (
        <div style={{margin:'auto'}}>
            
            {/* <span style={{visibility:'hidden'}}>{Token}
            <SearchTokens parentCallback = {callbackFunction}/> </span> */}
            {/* <br/><br/><br/><br/> */}
           {/*  <center><hr width='80%'/></center> */}
            <Chart/> 
        </div>
    )
}