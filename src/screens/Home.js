import React, { Component } from 'react';
import RecentTokens from '../components/RecentlyAddedTokens/RecentTokens';

export default class Home extends Component {
  render() {
    return (
      <div>
        <RecentTokens />
      </div>
    );
  }
}
