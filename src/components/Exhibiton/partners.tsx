import React from 'react';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Partners = () => {
  const classes = useStyles()();

  return (
    <Container className={classes.wrapper}>
      <Typography className={classes.title} variant="h2">
        Our Partners
      </Typography>
      <Grid>
        <Container className={classes.container}>
          <Grid>
            <Paper className={classes.paperBlack} />
          </Grid>
          <Grid>
            <Paper className={classes.paperWhite} />
          </Grid>
          <Grid>
            <Paper className={classes.paperBlack} />
          </Grid>
          <Grid>
            <Paper className={classes.paperWhite} />
          </Grid>
          <Grid>
            <Paper className={classes.paperBlack} />
          </Grid>
          <Grid>
            <Paper className={classes.paperWhite} />
          </Grid>
        </Container>
      </Grid>
    </Container>
  );
};

const useStyles = () =>
  makeStyles((theme) => ({
    wrapper: {
      color: theme.palette.common.black,
      flexGrow: 1,
      margin: '50px auto',
    },
    container: {
      justify: 'center',
    },
    title: {
      margin: '40px auto',
      textAlign: 'center',
    },
    paperBlack: {
      height: 240,
      width: 360,
      backgroundColor: 'black',
    },
    paperWhite: {
      height: 240,
      width: 360,
      backgroundColor: 'grey',
    },
  }));

export default Partners;
