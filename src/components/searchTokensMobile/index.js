import React, { useRef, useState, useEffect } from 'react';
import MenuPopover from './MenuPopover';
import SearchTokensButtonMobileLight from '../../assets/icons/searchTokensButtonMobileLight.svg';
import SearchTokensButtonMobileDark from '../../assets/icons/searchTokensButtonMobileDark.svg';
import { SearchTokensMobileButton } from './styles';
import SearchTokens from '../searchTokens';
import { useNavigate, useParams } from 'react-router-dom';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import Popover from '@mui/material/Popover';
import { useMediaQuery } from '@material-ui/core';

export default function SearchTokensMobile({ isLightTheme }) {
  const navigate = useNavigate();
  const { address } = useParams();
  const smallScreenSize = useMediaQuery('(max-width:779px)');
  // console.log('smallScreenSize', smallScreenSize);

  function callbackFunction(childData) {
    navigate(`/${address}/token/${childData}`);
  }

  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <div>
            <SearchTokensMobileButton isLightTheme={isLightTheme} {...bindTrigger(popupState)}>
              <span>
                <img
                  src={isLightTheme ? SearchTokensButtonMobileLight : SearchTokensButtonMobileDark}
                  alt="dark_search_icon"
                />
              </span>
            </SearchTokensMobileButton>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              PaperProps={{
                sx: {
                  backgroundColor: isLightTheme ? '#ffffff29' : '#10142D',
                  boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(35px)',
                  mixBlendMode: 'normal',
                  borderRadius: '10px',
                },
              }}>
              <SearchTokens
                parentCallback={callbackFunction}
                isLightTheme={isLightTheme}
                smallScreenSize={smallScreenSize}
              />
            </Popover>
          </div>
        )}
      </PopupState>
    </>

    // <>
    //   {/*Actual solution*/}
    //   <SearchTokensMobileButton isLightTheme={isLightTheme} onClick={handleOpen}>
    //     {isLightTheme ? (
    //       <span>
    //         <img src={SearchTokensButtonMobileLight} alt="dark_search_icon" />
    //       </span>
    //     ) : (
    //       <span>
    //         <img src={SearchTokensButtonMobileDark} alt="dark_search_icon" />
    //       </span>
    //     )}
    //   </SearchTokensMobileButton>
    //   <MenuPopover
    //     isLightTheme={isLightTheme}
    //     open={open}
    //     onClose={handleClose}
    //     anchorEl={anchorRef.current}>
    //     <SearchTokens parentCallback={callbackFunction} isLightTheme={isLightTheme} />
    //   </MenuPopover>
    // </>
  );
}
