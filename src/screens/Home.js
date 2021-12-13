import React, { useState, useEffect } from 'react';
import RecentTokens from '../components/RecentlyAddedTokens/RecentTokens';
import TwitterAPI from '../components/twitterAPI/TwitterAPI';
import { useSelector } from 'react-redux';

export default function Home({ setTheme }) {
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);

  return (
    <div>
      {/* commented the below one for testing the twitter post*/}
      <RecentTokens themeType={themeType} />
      {/*<TwitterAPI />*/}
    </div>
  );
}
