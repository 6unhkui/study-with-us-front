import React from 'react';
import styled from 'styled-components';

import Banner from './Sections/Banner';
import Search from './Sections/Search';
import PopularRooms from './Sections/PopularRooms';
import LatestRooms from './Sections/LatestRooms';

const MainPage = () => {
  return (
    <>
      <Banner/>
      <div className="container">
        <Search/>
        <PopularRooms style={{margin: '4rem 0'}}/>
        <LatestRooms/>
      </div>
      <SubBanner/>
    </>
  );
}

export default MainPage;

const SubBanner = styled.div`
  margin-top : 4rem;
  height: 16rem;
  background: var(--bg-gray);
`