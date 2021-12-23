import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import searchIcon from '../../assets/icons/searchIcon.png';
import { Box, Typography } from '@material-ui/core';
import { getAllTokens, getSearchedTokens } from '../../store/searchedTokens/actions';

import { MainLayout } from './styles';

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
    borderRadius: 10,
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
  },
  labelRoot: {
    fontSize: 14,
    fontWeight: 400,
    marginTop: -10,
    marginLeft: -15,
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

  render() {
    const isLightTheme = this.props.isLightTheme;
    console.log('search field light theme', isLightTheme);

    const { classes } = this.props;

    return (
      <MainLayout isLightTheme={isLightTheme}>
        <div>
          <Autocomplete
            onFocus={() => {
              this.props.getAllTokens();
            }}
            freeSolo
            blurOnSelect
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
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  '& > span': { mr: '10px', fontSize: 40 },
                  '& .MuiTextField-root': { m: 1, height: '250ch' },
                }}
                {...props}>
                <Typography variant="body2">{option.name}</Typography>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                id="filled-search"
                onChange={this.searchTokens}
                variant="outlined"
                label="Search Tokens..."
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    // focused: classes.labelFocused,
                  },
                }}
                style={{
                  borderColor: 'red',
                  backgroundColor: this.props.isLightTheme ? '#ffffff' : '#10142c',
                  border: '0px',
                  borderStyle: 'solid',
                  borderRadius: '10px',
                }}
                size="small">
                {searchIcon}
              </TextField>
            )}
          />
        </div>
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
