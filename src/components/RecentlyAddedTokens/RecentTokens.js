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

      '& .MuiPaginationItem': {
        backgroundColor: '#E0E0E0',
        width: '20px',
        height: '20px',
      },

      '& .MuiPaginationItem-outlined': {
        color: 'black',
        border: 'none',
        borderRadius: 10,
      },

      '& .MuiPaginationItem-icon': {
        color: '#4453AD',
        width: '20px',
        height: '20px',
        backgroundColor: 'transparent !important',
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
      '&:hover': {
        // backgroundColor: 'red !important',
        // color: 'green !important',
      },

      '& .Mui-selected': {
        backgroundColor: '#FFFFFF',
        width: 20,
        height: 30,
        boxShadow: 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)',
        borderRadius: 10,
        color: '#4453AD',
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
  // console.log('light hemeType in recent tokens table', themeType);
  // const themeRecentTokens = useContext(ThemeContext);
  // console.log('themeRecentTokens', themeRecentTokens);

  // console.log(' set light theme', themeType);

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
  // console.log('isLightTheme', isLightTheme);

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
                  '&. MuiPaginationItem': {
                    width: '20px',
                    height: '20px',
                  },
                  '&. MuiPaginationItem-root:hover': {
                    //you want this to be the same as the backgroundColor above
                    backgroundColor: 'transparent !important',
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
