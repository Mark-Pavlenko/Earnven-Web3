import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { getAllTokens, getSearchedTokens } from '../../store/searchedTokens/actions';
import { chosenTokensList, tokensList } from '../../store/searchedTokens/reducer';

let allTokens = [];

const styles = () => ({
  root: {
    '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
      // Default transform is "translate(14px, 20px) scale(1)""
      // This lines up the label with the initial cursor position in the input
      // after changing its padding-left.
      transform: 'translate(34px, 20px) scale(1);',
    },
  },
  inputRoot: {
    color: 'white',
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26,
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
    this.setState({ searchContent: event.target.value.id });
  };

  submitSearch = async (event, value) => {
    event.preventDefault();
    // console.log(value)
    if (value) {
      await this.setState({ token: value.id });
      // window.location.href = '/test'
      this.sendData();
    }

    // console.log(window.token)
    // await this.setState({searchContent:value, redirect:true})
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

  // themeHandler() {
  // componentDidMount() {
  //   const isLightTheme = localStorage.getItem('selectedTheme') === 'Day';
  //   console.log('isLightTheme', isLightTheme);
  //
  //   console.log('123');
  //   // this.props.dispatch(getThemeTask(isLightTheme));
  // }

  // }

  render() {
    const { classes } = this.props;

    // if (this.state.redirect===true) {
    //     this.setState({redirect:false})
    //     return <Redirect
    //       to={{
    //           pathname: '/test',
    //           state: {searchValue : this.state.searchContent}
    //         }}/>;
    // }

    // console.log('final tokensList', this.props.chosenTokensList);

    return (
      <div
        style={{
          width: '242px',
          backgroundColor: localStorage.getItem('selectedTheme') == 'Day' ? 'white' : '#10142c',
          marginLeft: '586px',
          borderRadius: '11%',
        }}>
        {/*<button type="button" onClick={this.themeHandler}>*/}
        {/*  123*/}
        {/*</button>*/}
        <div>
          {/*{console.log('autocomplete re render')}*/}
          <Autocomplete
            style={{
              borderColor: 'red',
            }}
            // style={{ width: '100%', float: 'left' }}
            onFocus={() => {
              // console.log('focus on input');
              this.props.getAllTokens();
              // saga to get all Tokens
              // in saga - send to redux
            }}
            // onBlur={() => {
            //   console.log('remove input');
            // }}
            freeSolo
            blurOnSelect
            // autoSelect
            fullWidth
            autoComplete
            autoHighlight
            classes={classes}
            onChange={(event, value) => {
              this.submitSearch(event, value);
            }}
            options={this.state.results}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{
                  // fontSize: 14,
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  // backgroundColor: (theme)=> theme.palette.background.default,
                  '& > span': { mr: '10px', fontSize: 18 },
                }}
                {...props}>
                <Typography variant="body2">{option.name}</Typography>
                {/* {console.log("value of option in render:::",option)} */}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                id="filled-search"
                onChange={this.searchTokens}
                variant="outlined"
                size="medium"
                label="Search Tokens..."
                style={{
                  borderColor: 'red',
                  backgroundColor: 'white',
                  border: '0px',
                  borderStyle: 'solid',
                  borderRadius: '7px',
                }}
              />
              // <SearchInput {...params}
              //      onChange={this.searchTokens}></SearchInput>
            )}
          />
        </div>
        {/*  <div style={{float:'left'}}>
                        &nbsp;
                        <Button style={{height:'60px', borderRadius:'50px'}} variant="contained">
                            Search
                        </Button>
                        </div>
                        </form>  */}
      </div>
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
