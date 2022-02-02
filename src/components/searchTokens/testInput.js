import * as React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import Autocomplete from '@mui/material/Autocomplete';
import { SearchIcon } from './styles';
import searchIcon from '../../assets/icons/searchIconLight.png';
import { FoundTokenBlock, TokensListBox, TokensListTextField } from './testStyles';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { getAllTokens, getSearchedTokens } from '../../store/searchedTokens/actions';
import { connect } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';

const styles = () => ({
  noBorder: {
    border: 'none',
  },
});

export class TestTokensSelect extends Component {
  sendData = () => {
    console.log('this.state.token', this.state.token);
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
    const { classes } = this.props;
    const isLightTheme = this.props.isLightTheme;
    const smallScreenSize = this.props.smallScreenSize;

    // console.log('smallScreenSize', smallScreenSize);

    return (
      <Autocomplete
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
          <TokensListBox
            component="li"
            sx={{
              width: '221px',
              marginLeft: '11px',
              fontSize: '10px',
              '& > img': { mr: 2, flexShrink: 0 },
              '&:hover': {
                fontWeight: 600,
                backgroundColor: isLightTheme ? '#ffffff !important' : '#1F265C3D !important',
                boxShadow: isLightTheme
                  ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
                  : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
                mixBlendMode: isLightTheme ? 'none' : 'normal',
                backdropFilter: isLightTheme ? 'none' : 'blur(35px)',
                borderRadius: '7px',
              },
            }}
            {...props}
            style={{
              marginTop: '-8px',
              backgroundColor: isLightTheme ? '#FFFFFF29' : '#11132C',
              height: '20px !important',
            }}>
            <img loading="lazy" width="20" src={option.image.small} alt="" />
            <FoundTokenBlock isLightTheme={isLightTheme}>
              <span>{option.name}</span>
            </FoundTokenBlock>
          </TokensListBox>
        )}
        ListboxProps={{
          style: {
            maxHeight: '230px',
            backgroundColor: isLightTheme ? '#FFFFFF29' : '#11132C',
          },
        }}
        renderInput={(params) => (
          <TokensListTextField
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  <SearchIcon src={searchIcon} alt="" />
                </>
              ),
              classes: { notchedOutline: classes.noBorder },
              sx: { color: '#878995', paddingRight: '0px !important' },
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
              width: 250,
              height: 40,
              backgroundColor: isLightTheme ? '#FFFFFF29' : '#10142c',
              boxShadow: isLightTheme
                ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
                : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
              mixBlendMode: isLightTheme ? 'normal' : 'normal',
              backdropFilter: isLightTheme ? 'blur(35px)' : 'blur(35px)',
              borderRadius: '10px',
              // marginTop: '30px',
            }}
            size="small"
          />
        )}
      />
    );
  }
}

TestTokensSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  chosenTokensList: state.chosenTokensList.chosenTokensList,
});

const mapDispatchToProps = {
  getSearchedTokens,
  getAllTokens,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TestTokensSelect));
