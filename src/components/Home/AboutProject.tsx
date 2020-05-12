import React, { FC } from 'react'

import { makeStyles } from '@material-ui/core'
import { Paper, Tab, AppBar, Typography, Box} from '@material-ui/core'
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';

const text = "Online fair is a platform for organizing virtual exhibitions, offering a whole range of software solutions and additional servicesfor the entire exhibition industry Online fair brings together exhibition centers and exhibition organizers into a single network. Which Will serve as an economical and effective tool for promoting products and services to international markets and developing international trade relations"

function TabPanel(props:any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const About: FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
  }; 

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>About The Project</h1>
      <p className={classes.text}>{text}</p>

      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.tabs}>
            <Tab label="Visitors" {...a11yProps(0)} />
            <Tab label="Exhibitions" {...a11yProps(1)} />
            <Tab label="Organizations" {...a11yProps(2)} />
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
    </div>
  )
} 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '20px 30px 100px',
    alignItems: 'center',
    
    //backgroundColor: 'white'
  },
  tabs: {
    backgroundColor: 'white',
    textAlign: 'center',
    color: 'black'
  },
  container: {
  },
  
  title: {
    textAlign: 'center'
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
    padding: "10px 60px",
    fontWeight: "bolder"
  }

}))

export default About