import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const Search: FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.searchField}>
      <label htmlFor="text" className={classes.label}>
        Keep in touch with all online exebitions
      </label>
      <Input
        type="text"
        className={classes.input}
        placeholder="What are you looking for..."
      />
      <Button variant="contained" className={classes.button}>
        Search
      </Button>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  searchField: {
    position: 'relative',
    width: '60%',
    marginBottom: 150,
    alignItems: 'center',
    minWidth: 480,
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
    right: 20,
    marginTop: 1,
    marginRight: 1,
    zIndex: 150,
    borderRadius: 25,
    height: 46,
    fontWeight: 'bolder',
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.primary.light,
  },
}));

export default Search;
