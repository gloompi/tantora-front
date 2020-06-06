import React, { FC, ChangeEvent } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core';

import TabPanel from './TabPanel';

const MyTabs: FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (_: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
<<<<<<< HEAD
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          className={classes.tabs}
          textColor="primary"
        >
          <Tab label="Visitors" className={classes.tab} selected={"white"}/>
          <Tab label="Exhibitions" className={classes.tab} />
          <Tab label="Organizations" className={classes.tab} />
        </Tabs>
      </AppBar>
=======
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        textColor="primary"
      >
        <Tab label="Visitors" className={classes.tab} />
        <Tab label="Exhibitions" className={classes.tab} />
        <Tab label="Organizations" className={classes.tab} />
      </Tabs>
>>>>>>> 63c5d6aec0425ce608e207c9cea96c6e542345a3
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  tabs: {
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
    width: '100%',
<<<<<<< HEAD
=======

    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-between',
    },
>>>>>>> 63c5d6aec0425ce608e207c9cea96c6e542345a3
  },
 
  tab: {
    width: '30%',
    fontWeight: 'bolder',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    height: 56,
<<<<<<< HEAD
=======
    marginBottom: 8,

    '&.Mui-selected': {
      color: theme.palette.common.white,
    },
>>>>>>> 63c5d6aec0425ce608e207c9cea96c6e542345a3
  },
}));

export default MyTabs;
