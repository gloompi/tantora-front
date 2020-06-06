import React, { FC, ChangeEvent } from 'react';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
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
    justifyContent: 'space-between',
    margin: 'auto',
    width: '100%',
  },
 
  tab: {
    width: '30%',
    borderRadius: 25,
    fontWeight: 'bolder',
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.white,
    height: 56,
  },
}));

export default MyTabs;
