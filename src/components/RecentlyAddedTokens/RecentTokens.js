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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Container,
  Typography,
  Grid,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import RecentAddedTokens from './RecentAddedTokens';
import Pagination from '@material-ui/lab/Pagination';
import { MobileView, BrowserView } from 'react-device-detect';
import './RecentlyAddedToken.css';

const useStyles = makeStyles(() =>
  createStyles({
    tableCell: {
      color: '#1E1E20',
      fontfamily: 'saira',
      fontstyle: 'normal',
      fontweight: '600',
      fontsize: '10px',
      lineheight: '16px',
      alignitems: 'center',
      opacity: '0.5',
    },

    tableCellValue: {
      fontfamily: 'Saira',
      fontstyle: 'normal',
      fontweight: 'normal',
      fontsize: '14px',
      lineheight: '22px',
      alignitems: 'center',
      color: '#1E1E20',
    },
    cellBlockChain: {
      width: '136px',
      height: '50px',
      background: '#FFFFFF',
      boxShadow: '7px 21px 22px 15px rgba(51, 78, 131, 0.17)',
      borderRadius: '10px',
      boxSizing: 'border-box',
      fontfamily: 'Saira',
      fontstyle: 'normal',
      fontweight: 'normal',
      fontsize: '14px',
      alignitems: 'center',
      lineHeight: '50px',
    },

    headerRecentAddedToken: {
      fontFamily: 'Saira',
      fontstyle: 'normal',
      fontWeight: '500',
      fontSize: '20px',
      lineHeight: '31px',
      color: '#1E1E20',
    },

    root: {
      '& .MuiPaginationItem-outlined': {
        backgroundColor: 'transparent',
        color: 'black',
      },
    },
  })
);
export default function RecentTokens() {
  const [recentTokenData, setRecentTokenData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const classes = useStyles();

  //pagination process
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [pageContent, setPageContent] = useState();

  //This function is used to get new cypto token data by callying the respective function
  useEffect(() => {
    let recentTokens = [];
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
  let message;
  try {
    currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    listOfPages = Math.ceil(recentTokenData.length / postsPerPage);
  } catch (err) {
    console.log('Error Message', err.message);
    message = <p1>Opps something went wrong, please retry</p1>;
    return true;
  }

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <React.Fragment>
      <div>
        {Loading && (
          <center>
            {' '}
            <p> Loading...</p>{' '}
          </center>
        )}
      </div>
      {!Loading && (
        <Box className="boxSize">
          <TableContainer
            style={{
              background: 'radial-gradient(lightblue, white)',
              border: '0px',
            }}>
            <h3 className={classes.headerRecentAddedToken}>Recently added tokens</h3>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}>No</TableCell>
                  <TableCell className={classes.tableCell}>Name</TableCell>
                  <TableCell className={classes.tableCell}>Price</TableCell>
                  <TableCell className={classes.tableCell}>1H</TableCell>
                  <TableCell className={classes.tableCell}>24H</TableCell>
                  <TableCell className={classes.tableCell}>Fully Diluted Market Cap</TableCell>
                  <TableCell className={classes.tableCell}>Volume</TableCell>
                  <TableCell className={classes.tableCell}>Blockchain</TableCell>
                  <TableCell className={classes.tableCell}>Added</TableCell>
                </TableRow>
              </TableHead>

              {/* Table body section to show values in respective table cell */}

              {!Loading && (
                <TableBody>
                  {recentTokenData.length > 0
                    ? currentPosts.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell
                            style={{ color: 'black' }}
                            align="center"
                            component="th"
                            scope="row">
                            {row.no}
                          </TableCell>

                          <TableCell className={classes.tableCellValue}>
                            <img
                              src={row.logoUrl}
                              style={{
                                width: '20px',
                                height: '20px',
                                display: 'inline',
                                verticalAlign: 'top',
                                left: '200px',
                              }}
                              alt=""
                            />
                            &nbsp;
                            {row.name}
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{row.symbol}
                          </TableCell>
                          <TableCell className={classes.tableCellValue} style={{ left: '5px' }}>
                            ${row.price}
                          </TableCell>
                          <TableCell className={classes.tableCellValue}>
                            {' '}
                            <font color={parseInt(row.change_1hr) >= 0 ? '00DFD1' : '#EC3D3D'}>
                              {' '}
                              {parseFloat(row.change_1hr).toFixed(2)}%{' '}
                            </font>
                          </TableCell>
                          <TableCell className={classes.tableCellValue}>
                            <font color={parseInt(row.change_24hr) >= 0 ? '00DFD1' : '#EC3D3D'}>
                              {' '}
                              {parseFloat(row.change_24hr).toFixed(2)}%{' '}
                            </font>
                          </TableCell>
                          <TableCell className={classes.tableCellValue}>
                            ${parseInt(row.fully_diluted_market_cap).toLocaleString()}
                          </TableCell>
                          <TableCell className={classes.tableCellValue}>
                            ${parseInt(row.volume).toLocaleString()}
                          </TableCell>

                          <TableCell className={classes.tableCellValue}>
                            <div className={classes.cellBlockChain}>
                              &nbsp;
                              {row.blockchainLogoUrl.length > 0 ? (
                                <img
                                  style={{
                                    width: '20px',
                                    height: '20px',
                                    display: 'inline',
                                    verticalAlign: 'middle',
                                    lineHeight: '50px',
                                  }}
                                  src={row.blockchainLogoUrl}
                                  alt=""
                                />
                              ) : (
                                ''
                              )}
                              &nbsp;
                              {row.platform}
                            </div>
                          </TableCell>

                          <TableCell className={classes.tableCellValue}>
                            {row.added} hrs ago
                          </TableCell>
                        </TableRow>
                      ))
                    : ''}
                </TableBody>
              )}
            </Table>
            <div>
              <Pagination
                className={classes.root}
                onChange={paginate}
                count={listOfPages}
                variant="outlined"
                shape="rounded"
                color="secondary"
                style={{ marginLeft: '80%' }}
              />
            </div>
          </TableContainer>
        </Box>
      )}
      {message}
    </React.Fragment>
  );
}