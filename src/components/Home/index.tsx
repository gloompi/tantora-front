import React, { FC } from 'react';
import Search from './Search';
import Events from './Events';
import About from './AboutProject';
import { makeStyles } from '@material-ui/core';

const Home: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Search />
      <Events />
      <About />
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    padding: '5px',
  },
});

export default Home;
