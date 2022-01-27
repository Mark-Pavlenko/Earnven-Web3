import React, { Component } from 'react';
import DarkThemeChart from './components/darkThemeChart/darkThemeChart';
import LightThemeChart from './components/lightThemeChart/lightThemeChart';

export default class PortfolioPerf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.props.theme,
    };
  }

  render() {
    const { theme, totalValue, address, difValue, isTokenPage } = this.props;
    return (
      <>
        {theme ? (
          <LightThemeChart
            address={address}
            totalValue={totalValue}
            difValue={difValue}
            isTokenPage={isTokenPage}
          />
        ) : (
          <DarkThemeChart
            address={address}
            totalValue={totalValue}
            difValue={difValue}
            isTokenPage={isTokenPage}
          />
        )}
      </>
    );
  }
}
