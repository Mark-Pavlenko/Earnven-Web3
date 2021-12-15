import React from 'react';
import RecentTokens from '../components/RecentlyAddedTokens/RecentTokens';
import TwitterAPI from '../components/twitterAPI/TwitterAPI';
import { useSelector } from 'react-redux';

export default function Home({ setTheme }) {
  const themeType = useSelector((state) => state.themeReducer.isLightTheme);

  return (
    <>
      <RecentTokens themeType={themeType} />
      <TwitterAPI />
    </>
  );
}
