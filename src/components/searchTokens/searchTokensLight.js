import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles, makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import searchIcon from '../../assets/icons/searchIconLight.png';
import { Box } from '@material-ui/core';
import { getAllTokens, getSearchedTokens } from '../../store/searchedTokens/actions';

import { MainLayout, SearchIcon, CoinItem } from './styles';

const styles = () => ({
  noBorder: {
    border: 'none',
  },
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

export class SearchTokensLight extends Component {
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

    // const borderClasses = useStyles();

    return (
      <MainLayout isLightTheme={isLightTheme}>
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
                component="li"
                sx={{
                  fontFamily: 'Saira, sans-serif',
                  fontSize: '10px',
                  backgroundColor: '#F2F8FF',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                  },
                  '& > div': { height: '25px' },
                  // '& > span': { mr: '10px', fontSize: 40 },
                  // '& .MuiTextField-root': { m: 1, height: '250ch' },
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
                  classes: { notchedOutline: classes.noBorder },
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

SearchTokensLight.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  chosenTokensList: state.chosenTokensList.chosenTokensList,
});

const mapDispatchToProps = {
  getSearchedTokens,
  getAllTokens,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchTokensLight));
