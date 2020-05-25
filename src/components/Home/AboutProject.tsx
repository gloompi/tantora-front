import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import MyTabs from './Tabs';

const text =
  'Online fair is a platform for organizing virtual exhibitions, offering a whole range of software solutions and additional servicesfor the entire exhibition industry Online fair brings together exhibition centers and exhibition organizers into a single network. Which Will serve as an economical and effective tool for promoting products and services to international markets and developing international trade relations';

const About: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        About The Project
      </Typography>
      <Typography className={classes.text}>{text}</Typography>
      <MyTabs />
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 1170,
    margin: '0 auto 150px',
  },
  title: {
    textAlign: 'center',
    marginBottom: 25,
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
    margin: '25px 0',
  },
});

export default About;
