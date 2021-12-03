import React, { Component } from 'react';
import RecentTokens from '../components/RecentlyAddedTokens/RecentTokens';
import TwitterAPI from '../components/twitterAPI/TwitterAPI';
export default class Home extends Component {
  render() {
    return (
      <div>
        {/* commented the below one for testing the twitter post*/}
        {/* <RecentTokens /> */}
        <TwitterAPI />
      </div>
    );
  }
}
