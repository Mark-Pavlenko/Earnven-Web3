/** ****************************************************************************************************
 Purpose : This component is used to display newly added tokens in the home page
 Developed by : Prabhakaran.R
 Version log:
 -------------------------------------------------------------------------------------------------------
 Version           Date                         Description                    Developed by
 --------------------------------------------------------------------------------------------------
 1.0               8/Nov/2021                   Initial Development            Prabhakaran.R

 ******************************************************************************************************/
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { createStyles } from '@material-ui/styles';
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import RecentAddedTokens from './RecentAddedTokens';
import Pagination from '@material-ui/lab/Pagination';
import { BlockChainName, MainTable, TokensTableCell, TokensTableHeader } from './styles';
import {
  TestBlock,
  LoadingBlock,
  MainBlock,
  TokenTableLightContainer,
  TableTokenTitle,
  TokenImg,
  BlockChainImg,
  TokenInfoNameBlock,
  TokenTableCellBlockChain,
  TokenNameSymbol,
  TokenTableCellValue,
} from './styles';
import './recentlyAddedToken.css';

// import { ThemeContext } from '../../../src/layout/app/index';

const useStyles = makeStyles(() =>
  createStyles({
    tableRow: {
      // height: '613px',
      // backgroundColor: 'red';
    },
    root: {
      float: 'right',
      marginTop: '35px',
      marginRight: '40px',
      marginBottom: '20px',

      '& .MuiPaginationItem-outlined': {
        backgroundColor: 'transparent',
        color: 'black',
        border: 'none',
        width: '20px',
        height: '20px',
      },

      '& .MuiPaginationItem-hover': {
        backgroundColor: '#ff0000 !important',
      },

      '& .MuiPaginationItem-icon': {
        color: '#4453AD',
        width: '20px',
        right: '20px',
      },

      '@media(max-width: 1200px)': {
        display: 'flex',
        float: 'none',
        justifyContent: 'center',
        alignItems: 'center',
      },

      '@media(max-width: 450px)': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: ' start',
        marginLeft: '25vw',
      },
    },
    selected: {
      '& .Mui-selected': {
        backgroundColor: '#FFFFFF',
        color: '#4453AD',
      },
      '& .Mui-hover': {
        backgroundColor: '#ff0000',
      },
      li: {
        width: '20px',
        height: '20px',
      },
    },
  })
);

import ThemeContext from '../../ThemeContext';
import { useSelector } from 'react-redux';

export default function RecentTokens({ themeType }) {
  console.log('light hemeType in recent tokens table', themeType);
  // const themeRecentTokens = useContext(ThemeContext);
  // console.log('themeRecentTokens', themeRecentTokens);

  console.log(' set light theme', themeType);

  const [recentTokenData, setRecentTokenData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {}, []);

  //pagination process
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  //This function is used to get new cypto token data by callying the respective function
  useEffect(() => {
    async function getData() {
      setLoading(true);
      console.log('Calling RecentAddedTokens process');
      let recentTokens = await RecentAddedTokens();
      console.log('Recent tokens-', recentTokens);
      setRecentTokenData(recentTokens);
      setPosts(recentTokens);
      setLoading(false);
    }
    getData();
  }, []);

  //get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts;
  let listOfPages;
  try {
    currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    listOfPages = Math.ceil(recentTokenData.length / postsPerPage);
  } catch (err) {
    console.log('Error Message', err.message);
    return true;
  }

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  const isLightTheme = themeType;
  console.log('isLightTheme', isLightTheme);

  return (
    <>
      <LoadingBlock>{Loading && <p> Loading...</p>}</LoadingBlock>
      {!Loading && (
        <MainBlock className="boxSize">
          <TokenTableLightContainer isLightTheme={isLightTheme}>
            <TableTokenTitle isLightTheme={isLightTheme}>Recently added tokens</TableTokenTitle>
            <MainTable className={classes.tableRow}>
              <TableHead>
                <TableRow>
                  <TokensTableHeader isLightTheme={isLightTheme}>№</TokensTableHeader>
                  <TokensTableHeader isLightTheme={isLightTheme}>Name</TokensTableHeader>
                  <TokensTableHeader isLightTheme={isLightTheme} className="price-title">
                    Price
                  </TokensTableHeader>
                  <TokensTableHeader isLightTheme={isLightTheme}>1H</TokensTableHeader>
                  <TokensTableHeader isLightTheme={isLightTheme}>24H</TokensTableHeader>
                  <TokensTableHeader isLightTheme={isLightTheme}>
                    Fully Diluted Market Cap
                  </TokensTableHeader>
                  <TokensTableHeader isLightTheme={isLightTheme}>Volume</TokensTableHeader>
                  <TokensTableHeader isLightTheme={isLightTheme}>Blockchain</TokensTableHeader>
                  <TokensTableHeader isLightTheme={isLightTheme}>Added</TokensTableHeader>
                </TableRow>
              </TableHead>

              {/* Table body section to show values in respective table cell */}

              {!Loading && (
                <TableBody>
                  {recentTokenData.length > 0
                    ? currentPosts.map((row) => (
                        <TableRow key={row.name}>
                          <TokensTableCell
                            align="center"
                            component="th"
                            scope="row"
                            isLightTheme={isLightTheme}>
                            {row.no}
                          </TokensTableCell>
                          <TokenTableCellValue isLightTheme={isLightTheme}>
                            <TokenInfoNameBlock>
                              <TokenImg src={row.logoUrl} alt="" />
                              <TokenNameSymbol isLightTheme={isLightTheme}>
                                <p>{row.name}</p>
                                <p>{row.symbol}</p>
                              </TokenNameSymbol>
                            </TokenInfoNameBlock>
                          </TokenTableCellValue>
                          <TokenTableCellValue isLightTheme={isLightTheme} className="price">
                            ${row.price}
                          </TokenTableCellValue>
                          <TokenTableCellValue>
                            <font color={parseInt(row.change_1hr) >= 0 ? '00DFD1' : '#EC3D3D'}>
                              {parseFloat(row.change_1hr).toFixed(2)}%{' '}
                            </font>
                          </TokenTableCellValue>
                          <TokenTableCellValue>
                            <font color={parseInt(row.change_24hr) >= 0 ? '00DFD1' : '#EC3D3D'}>
                              {parseFloat(row.change_24hr).toFixed(2)}%{' '}
                            </font>
                          </TokenTableCellValue>
                          <TokenTableCellValue isLightTheme={isLightTheme}>
                            ${parseInt(row.fully_diluted_market_cap).toLocaleString()}
                          </TokenTableCellValue>
                          <TokenTableCellValue isLightTheme={isLightTheme}>
                            ${parseInt(row.volume).toLocaleString()}
                          </TokenTableCellValue>

                          <TokenTableCellValue
                            isLightTheme={isLightTheme}
                            style={{ borderBottom: 'none !important' }}>
                            <TokenTableCellBlockChain
                              isLightTheme={isLightTheme}
                              style={{ borderBottom: 'none !important' }}>
                              {row.blockchainLogoUrl.length > 0 && (
                                <BlockChainImg src={row.blockchainLogoUrl} alt="" />
                              )}
                              <BlockChainName isLightTheme={isLightTheme}>
                                {/*<span style={{ borderBottom: 'none !important' }}>*/}
                                {row.platform}
                                {/*</span>*/}
                              </BlockChainName>
                            </TokenTableCellBlockChain>
                          </TokenTableCellValue>
                          <TokenTableCellValue isLightTheme={isLightTheme}>
                            {row.added} hrs ago
                          </TokenTableCellValue>
                        </TableRow>
                      ))
                    : ''}
                </TableBody>
              )}
            </MainTable>
            <div>
              <Pagination
                className="paginationItemStyle"
                sx={{
                  '&. MuiPaginationItem-root': {
                    width: '20px',
                    height: '20px',
                  },
                }}
                classes={{
                  root: classes.root,
                  ul: classes.selected,
                }}
                count={listOfPages}
                variant="outlined"
                shape="rounded"
                onChange={paginate}
              />
            </div>
          </TokenTableLightContainer>
        </MainBlock>
      )}
    </>
  );
}
