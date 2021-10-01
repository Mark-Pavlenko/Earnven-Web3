import React, {useState} from 'react'
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Bancor from '../components/liquidityPoolContents/Bancor'
import Curve from '../components/liquidityPoolContents/Curve'
import UniV2 from '../components/liquidityPoolContents/UniV2'
import SushiV2 from '../components/liquidityPoolContents/SushiV2'
import Balancer from '../components/liquidityPoolContents/Balancer'
import UniV3 from '../components/liquidityPoolContents/UniV3'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function LiquidityPools() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ width: '100%' }}>
            <br/>
            <center>
            <h1 style={{fontSize:'40px', color:'white'}}>Liquidity Pools</h1>
            </center>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Uniswap V2" {...a11yProps(0)} />
            <Tab label="Sushiswap V2" {...a11yProps(1)} />
            <Tab label="Balancer" {...a11yProps(2)} />
            <Tab label="Uniswap V3" {...a11yProps(3)} />
            <Tab label="Bancor" {...a11yProps(4)} />
            <Tab label="Curve" {...a11yProps(5)} />

            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <UniV2/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <SushiV2/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Balancer/>
        </TabPanel>
        <TabPanel value={value} index={3}>
            <UniV3/>
        </TabPanel>
        <TabPanel value={value} index={4}>
            <Bancor/>
        </TabPanel>
        <TabPanel value={value} index={5}>
            <Curve/>
        </TabPanel>
        </Box>
    )
}
