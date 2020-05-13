import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';

const Search: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.searchField}>
      <label htmlFor="text" className={classes.label}>Keep in touch with all online exebitions</label>
      <input type="text" className={classes.input}placeholder="What are you looking for..."></input>
      <Button color="primary" className={classes.button}>Search</Button>
    </div>
  )
};

const useStyles = makeStyles((theme) => ({
    searchField: {
      width: '100%',
      padding: '220px 10% 60px'
    },
    label: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 20,
      fontWeight: 'bold'
    },
    input: {
      width: '100%',
      height: 39,
      borderRadius: 4,
      border: 'solid 1px black',
      zIndex: 100,
    },
    button: {
      position: 'absolute',
      justifyContent: 'right',
      right: '10.2%',
      marginTop: 1,
      marginRight: 1,
      backgroundColor: theme.palette.primary.light,
    }
  })
)
export default Search;