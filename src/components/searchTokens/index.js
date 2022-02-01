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
            // token item block styles
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
              }}
              {...props}>
              <CoinItem>
                <img src={option.image.small} alt="coin icon" />
                <span>{option.name}</span>
              </CoinItem>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: <SearchIcon src={searchIcon} alt="" />,
                classes: { notchedOutline: classes.noBorder },
              }}
              id="filled-search"
              onChange={this.searchTokens}
              variant="outlined"
              label="Search tokens..."
              InputLabelProps={{
                style: {
                  color: isLightTheme ? 'black' : 'white',
                  fontSize: 14,
                  fontWeight: 400,
                  opacity: 0.5,
                },
              }}
              style={{
                backgroundColor: this.props.isLightTheme ? '#ffffff' : '#10142c',
                width: 242,
                height: 40,
                borderRadius: '10px',
              }}
              size="small"
            />
          )}
        />
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
