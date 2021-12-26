import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/styles';
// import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import searchIcon from '../../assets/icons/searchIcon.png';
import { Box, Typography } from '@material-ui/core';
import { getAllTokens, getSearchedTokens } from '../../store/searchedTokens/actions';

import { MainLayout, SearchIcon, CoinItem } from './styles';

const styles = () => ({
  root: (props) => ({
    '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
      // Default transform is "translate(14px, 20px) scale(1)""
      // This lines up the label with the initial cursor position in the input
      // after changing its padding-left.
      transform: 'translate(34px, 20px) scale(1);',
    },
  }),
  inputRoot: (props) => ({
    color: 'white',
    // borderRadius: 10,
    // padding: 10,
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      // paddingLeft: 26,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#737373',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#737373',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#737373',
    },
  }),
  labelRoot: {
    fontSize: 14,
    fontWeight: 400,
    // marginTop: -5,
  },
  option: {
    color: '#000',
    //   backgroundColor: '#737373'
  },
});

export class SearchTokens extends Component {
  sendData = () => {
    this.props.parentCallback(this.state.token);
  };

  searchTokens = async (event) => {
    // console.log('change input value');
    event.preventDefault();
    this.props.getSearchedTokens(event.target.value);
    await this.setState({ results: this.props.chosenTokensList });
    console.log('chosenTokenList', this.props.chosenTokensList);
    this.setState({ searchContent: event.target.value.id });
  };

  submitSearch = async (event, value) => {
    event.preventDefault();
    // console.log(value)
    if (value) {
      await this.setState({ token: value.id });
      this.sendData();
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      searchContent: '',
      results: [],
      redirect: false,
      token: '',
    };
  }

  render() {
    const isLightTheme = this.props.isLightTheme;
    console.log('search field light theme', isLightTheme);

    const { classes } = this.props;
    // let styleProps;
    //
    // if (isLightTheme) {
    //   styleProps = { color: 'black' };
    // } else {
    //   styleProps = { color: 'white' };
    // }
    //
    // console.log('styleProps', styleProps);

    return (
      <MainLayout isLightTheme={isLightTheme}>
        {/*{isLightTheme ? (*/}

        <div>
          <Autocomplete
            freeSolo
            blurOnSelect
            autoComplete
            autoHighlight
            onFocus={() => {
              this.props.getAllTokens();
            }}
            onChange={(event, value) => {
              this.submitSearch(event, value);
            }}
            options={this.state.results}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box
                component="div"
                sx={{
                  // fontWeight: 600,
                  fontFamily: 'Saira, sans-serif',
                  fontSize: '10px',
                  backgroundColor: '#E5E5E5',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    // paddingLeft: 20,
                    // paddingRight: 20,
                  },
                  // '& > span': { mr: '10px', fontSize: 40 },
                  '& .MuiTextField-root': { m: 1, height: '250ch' },
                }}
                {...props}>
                <CoinItem>
                  <img src={option.image.small} alt="coin icon" /> &nbsp;
                  <span>{option.name}</span>
                </CoinItem>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      <SearchIcon src={searchIcon} alt="" />
                    </>
                  ),
                }}
                id="filled-search"
                onChange={this.searchTokens}
                variant="outlined"
                label="Search tokens..."
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                  },
                }}
                style={{
                  backgroundColor: this.props.isLightTheme ? '#ffffff' : '#10142c',
                  width: 242,
                  height: 40,
                  borderRadius: '10px',
                  // boxShadow:
                  //   this.props.isLightTheme === false &&
                  //   'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
                }}
                size="small"
              />
            )}
          />
        </div>
        {/*) : (*/}
        {/*  <p>Here will be dark theme search field</p>*/}
        {/*)}*/}
      </MainLayout>
    );
  }
}

SearchTokens.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  chosenTokensList: state.chosenTokensList.chosenTokensList,
});

const mapDispatchToProps = {
  getSearchedTokens,
  getAllTokens,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchTokens));
