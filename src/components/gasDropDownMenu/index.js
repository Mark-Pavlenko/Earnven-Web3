/* import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import axios from 'axios'
import {data} from '../../globalStore';
import gas from '../../assets/icons/gas.svg'

export default class MenuListComposition extends React.Component {

  async componentWillMount(){
    await this.loadGasPrices();
  }

  loadGasPrices = async() => {
    
    await axios.get('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W',{},{})
        .then(async(response) => {
            // console.log(response)
            this.state.gasData = response.data.result;
            data.gasSelected = response.data.result.ProposeGasPrice;
            this.setState({gasData: response.data.result})
            
    })

  }
  constructor(){
    super()
    this.state = {
      open: false,
      gasData:{},
    };
  }
  

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return ;
    }

    this.setState({ open: false });
  };

  handleGasDataChange = (val) =>{
    data.gasSelected = val;
    return
  }

  render() {
    
    const { open } = this.state;

    return (
        <div>
          
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
          <img src={gas} alt='gasIcon'></img> <font color='white'>&nbsp; {data.gasSelected} &#8681; </font> 
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={(e)=>this.handleClose(e)}>
                    <MenuList>
                      <MenuItem onClick={(e)=>{this.handleClose(e); this.handleGasDataChange(this.state.gasData.SafeGasPrice)}} >Safe &nbsp; {this.state.gasData.SafeGasPrice}&nbsp;Gwei</MenuItem>
                      <MenuItem onClick={(e)=>{this.handleClose(e); this.handleGasDataChange(this.state.gasData.ProposeGasPrice)}}>Med &nbsp; {this.state.gasData.ProposeGasPrice}&nbsp;Gwei</MenuItem>
                      <MenuItem onClick={(e)=>{this.handleClose(e); this.handleGasDataChange(this.state.gasData.FastGasPrice)}}>Fast &nbsp; {this.state.gasData.FastGasPrice}&nbsp;Gwei</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
    );
  }
}
 */
import { useRef, useState, useEffect } from 'react';
import gas from '../../assets/icons/gas.svg'
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuPopover from "../../components/MenuPopover";
import { alpha } from '@material-ui/core/styles';
import languageImg from '../../assets/icons/language.png';
import axios from 'axios';
import {data} from '../../globalStore';


let gasType = [{
    value: '',
    label: 'Fast',
  },
  {
    value: '',
    label: 'Average',
  },
  {
    value: '',
    label: 'Slow',
  }]

export default function GasDropDownMenu() {
  const anchorRef = useRef(null);
  const [open, setopen] = useState(false)
  const [selected, setselected] = useState("Average")

  const handleOpen = () => {
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  }

  useEffect(async () => {
    try {
      const response = await axios.get('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W');
      console.log("api response::", response);
      const result = response.data.result;
      gasType[0].value= result.FastGasPrice;
      gasType[1].value = result.ProposeGasPrice;
      gasType[2].value = result.SafeGasPrice;
      data.gasSelected=result.ProposeGasPrice;
      console.log("gasType::",gasType);


    }
    catch (error) {
      console.log(error);
    }

  }, [])

  const updateGasValue = (val,label) => {
    data.gasSelected= val;
    setselected(label);
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={() => {handleOpen();}}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <img src={gas} alt="" /><ExpandMoreIcon style={{ color: '#fff' }} />

        {/* <IoIosHelpCircleOutline style={{color:'#fff'}}/><ExpandMoreIcon style={{color:'#fff'}}/> */}
      </IconButton>
      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {gasType.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.label === selected}
              onClick={() => {
                handleClose();
                updateGasValue(option.value,option.label);
              }}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <Box component="img" alt={option.label} src={languageImg} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2', color: '#fff' }}>
                {option.label + "-" + option.value+" Gwei"}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>

    </>
  )
}
