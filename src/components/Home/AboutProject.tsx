import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';

import MyTabs from './Tabs';

const text =
  'Online fair is a platform for organizing virtual exhibitions, offering a whole range of software solutions and additional servicesfor the entire exhibition industry Online fair brings together exhibition centers and exhibition organizers into a single network. Which Will serve as an economical and effective tool for promoting products and services to international markets and developing international trade relations';

const About: FC = () => {
  const classes = useStyles();

  return (
    <div>
      <h1 className={classes.title}>About The Project</h1>
      <p className={classes.text}>{text}</p>
      <div className={classes.root}>
        <MyTabs />
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: '20px 30px 100px',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
    padding: '10px 60px',
    fontWeight: 'bolder',
  },
});

export default About;
