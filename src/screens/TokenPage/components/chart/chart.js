import React, { Component } from 'react';
import DarkThemeChart from './components/darkThemeChart/darkThemeChart';
import LightThemeChart from './components/lightThemeChart/lightThemeChart';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.props.theme,
    };
  }

  render() {
    const { theme, totalValue, tokenId, difValue } = this.props;
    return (
      <>
        {theme ? (
          <LightThemeChart tokenId={tokenId} totalValue={totalValue} difValue={difValue} />
        ) : (
          <DarkThemeChart tokenId={tokenId} totalValue={totalValue} difValue={difValue} />
        )}
      </>
    );
  }
}
