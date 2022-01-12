import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import { Waves as ActionHome } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import MenuPopover from './MenuPopover';
import gasIcon from '../../assets/icons/gasIcon.svg';
import { data } from '../../globalStore';
import SlowGweiGasIcon from '../../assets/icons/slowGweiGasIcon.png';
import MiddleGweiGasIcon from '../../assets/icons/middleGweiGasIcon.png';
import FastGweiGasIcon from '../../assets/icons/fastGweiGasIcon.png';
import SearchIcon from '../../assets/icons/oldSearchIconDark.svg';
import SearchTokensButtonMobileLight from '../../assets/icons/searchTokensButtonMobileLight.svg';
import SearchTokensButtonMobileDark from '../../assets/icons/searchTokensButtonMobileDark.svg';
import {
  SearchTokensMobileBtn,
  GasMenuItem,
  MenuPopoverBox,
  MenuPopoverBoxTitle,
  MenuPopoverBoxNote,
  SearchTokensMobileButton,
} from './styles';
import { Waves } from '@material-ui/icons';

const gasType = [
  {
    value: '',
    label: 'Fast',
    icon: FastGweiGasIcon,
  },
  {
    value: '',
    label: 'Average',
    icon: MiddleGweiGasIcon,
  },
  {
    value: '',
    label: 'Slow',
    icon: SlowGweiGasIcon,
  },
];

const MINUTE_MS = 10000;

const useStyles = makeStyles((theme) => ({
  myClassName: {
    // position: 'relative',
    // '&:hover': {
    //   backgroundColor: 'green !important',
    //   borderRadius: '10px',
    // },
  },
}));

export default function SearchTokensMobile({ isLightTheme }) {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [open, setopen] = useState(false);
  const [selected, setselected] = useState('Average');
  const [GasPrices, setGasPrices] = useState([]);
  const [GasPricesContent, setGasPricesContent] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W'
        );
        // console.log('gas item response', response);
        const { result } = response.data;
        gasType[0].value = result.FastGasPrice;
        gasType[1].value = result.ProposeGasPrice;
        gasType[2].value = result.SafeGasPrice;
        data.gasSelected = result.ProposeGasPrice;
        // setGasPrices([])
        setGasPrices([...gasType]);
        // console.log('gasType', gasType);
      } catch (error) {
        console.log(error);
      }
    }

    getData();

    const interval = setInterval(() => {
      // console.log('Logs every 10 secs');
      getData();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateGasValue = (val, label) => {
      data.gasSelected = val;
      setselected(label);
    };

    // console.log('Updating Layout....')
    const content = GasPrices.map((option) => (
      <div
        // key={option.value}
        selected={option.label === selected}
        onClick={() => {
          handleClose();
          updateGasValue(option.value, option.label);
        }}
        sx={{ py: 1, px: 2.5 }}>
        {/*<ListItemIcon>*/}
        {/*  <Box component="img" alt={option.label} src={languageImg} />*/}
        {/*</ListItemIcon>*/}
        <GasMenuItem isLightTheme={isLightTheme}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img src={option.icon} alt="" />
            <span>{`${option.label} `}</span>
          </div>
          <div>
            <span>{`${option.value} Gwei`}</span>
          </div>
        </GasMenuItem>
      </div>
    ));

    setGasPricesContent(content);
  }, [GasPrices]);

  const handleOpen = () => {
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };

  function addColor() {
    this.style.backgroundColor = 'magenta';
  }

  function removeColor() {
    this.style.backgroundColor = 'white';
  }

  return (
    <>
      {/*/!* first solution*!/*/}
      {/*<SearchTokensMobileBtn*/}
      {/*  isLightTheme={isLightTheme}*/}
      {/*  startIcon={<img src={SearchIcon} alt="" />}*/}
      {/*  ref={anchorRef}*/}
      {/*  onClick={() => {*/}
      {/*    console.log('gas click');*/}
      {/*    handleOpen();*/}
      {/*  }}*/}
      {/*  // sx={{*/}
      {/*  //   ...(open && {*/}
      {/*  //     backgroundColor: (theme) => 'red',*/}
      {/*  //   }),*/}
      {/*  // }}*/}
      {/*  style={{*/}
      {/*    maxWidth: '40px',*/}
      {/*    maxHeight: '40px',*/}
      {/*    minWidth: '40px',*/}
      {/*    minHeight: '40px',*/}
      {/*    // backgroundColor: 'red',*/}
      {/*  }}*/}
      {/*/>*/}

      {/*Actual solution*/}
      <SearchTokensMobileButton
        isLightTheme={isLightTheme}
        onClick={handleOpen}
        className={classes.myClassName}>
        {isLightTheme ? (
          // <ActionHome hoverColor={'red'} alt="light_search_icon" />
          <span>
            <img src={SearchTokensButtonMobileLight} alt="dark_search_icon" />
          </span>
        ) : (
          <span>
            <img src={SearchTokensButtonMobileDark} alt="dark_search_icon" />
          </span>
        )}
      </SearchTokensMobileButton>
      <MenuPopover
        isLightTheme={isLightTheme}
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}>
        <div>Here will be search tokens widget for mobile devices</div>
        <MenuPopoverBox isLightTheme={isLightTheme} sx={{ py: 1 }}>
          <MenuPopoverBoxTitle isLightTheme={isLightTheme}>Realtime Gas Prices</MenuPopoverBoxTitle>
          {GasPricesContent}
          <MenuPopoverBoxNote>
            Provided by
            <a href={'https://etherscan.io/'} target="_blank">
              {' '}
              etherscan.io
            </a>
          </MenuPopoverBoxNote>
        </MenuPopoverBox>
      </MenuPopover>
    </>
  );
}
