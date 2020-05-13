import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs';

const text = "Online fair is a platform for organizing virtual exhibitions, offering a whole range of software solutions and additional servicesfor the entire exhibition industry Online fair brings together exhibition centers and exhibition organizers into a single network. Which Will serve as an economical and effective tool for promoting products and services to international markets and developing international trade relations"

const TabPanel = (props:any) => {
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
const About: FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event:any, newValue:number) => {
    setValue(newValue);
  }; 
  return (
    <div>
      <h1 className={classes.title}>About The Project</h1>
      <p className={classes.text}>{text}</p>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} className={classes.tabs}>
            <Tab label="Visitors" />
            <Tab label="Exhibitions" />
            <Tab label="Organizations"  />
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
  },
  tabs: {
    backgroundColor: 'white',
    color: 'black'
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