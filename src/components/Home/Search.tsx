import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const Search: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.searchField}>
      <label htmlFor="text" className={classes.label}>
        Keep in touch with all online exebitions
      </label>
      <Input
        type="text"
        className={classes.input}
        placeholder="What are you looking for..."
      />
      <Button color="primary" variant="contained" className={classes.button}>
        Search
      </Button>
    </div>
  );
};

const useStyles = makeStyles({
  searchField: {
    position: 'relative',
    width: '100%',
    maxWidth: 1170,
    margin: '0 auto 150px',
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 35,
    padding: '25px 15px',
    borderRadius: 4,
    zIndex: 100,
  },
  button: {
    position: 'absolute',
    justifyContent: 'right',
    right: 0,
    marginTop: 1,
    marginRight: 1,
    zIndex: 150,
  },
});

export default Search;
