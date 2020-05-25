import React, { FC } from 'react';
import MainScreen from './MainScreen';
import Search from './Search';
import Events from './Events';
import About from './AboutProject';

const Home: FC = () => (
  <>
    <MainScreen />
    <Search />
    <Events />
    <About />
  </>
);

export default Home;
