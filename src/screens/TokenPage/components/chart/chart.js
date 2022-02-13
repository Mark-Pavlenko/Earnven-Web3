import React, { Component } from 'react';
import DarkThemeChart from './components/darkThemeChart/darkThemeChart';
import LightThemeChart from './components/lightThemeChart/lightThemeChart';
import { connect } from 'react-redux';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.props.theme,
    };
  }

  render() {
    const { theme, totalValue, difValue } = this.props;
    return (
      <>
        {theme ? (
          <LightThemeChart
            tokenPriceHistory={this.props.tokenPriceHistory}
            totalValue={totalValue}
            difValue={difValue}
          />
        ) : (
          <DarkThemeChart
            tokenPriceHistory={this.props.tokenPriceHistory}
            totalValue={totalValue}
            difValue={difValue}
          />
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return { tokenPriceHistory: state.tokenPriceHistoryReducer.tokenPriceHistory };
}

export default connect(mapStateToProps)(Chart);
