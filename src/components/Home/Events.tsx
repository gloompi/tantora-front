import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

import { Exhibition } from 'generated/graphql';

const GET_EXHIBITONS = gql`
  query {
    exhibitions {
      exhibitionId 
      name
      description
      startDate
    }
  }
`
interface IResponse {
  exhibitions: Exhibition[];
}

const Events: FC = () => {
  const classes = useStyles();
  const { data, loading, error } = useQuery<IResponse>(GET_EXHIBITONS);

  if (loading) {
    return <div>Loading</div>
  }
  if (error) {
    return <div>Something went wrong!</div>
  };
  
  return (
    <div className={classes.container}>
      <h1>Up coming online exhibitions</h1>
      {data!.exhibitions.map(({ exhibitionId, name, description, startDate}) => (
        <div className={classes.event} key={exhibitionId!}>
          <h2 className={classes.h1}>{name}</h2>
          <p className={classes.text}>{description!.length < 150 ? description : (description!.slice(0, 250)+' . . .')}</p>
          <div className={classes.boxForDataBtn}>
            <p className={classes.data}>{new Date(startDate ? startDate : 'Something is wrong or Date is unavailable').toString()}</p>
            <Button className={classes.button}>Join</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: `100%`,
    textAlign: 'center',
  },
  event: {
    textAlign: `left`,
    backgroundColor: 'rgb(147, 147, 148)',
    width: 600,
    padding: '25px 20px 10px',
    margin: 10,
    display: 'inline-block',
    borderRadius: 5,
  },
  h1: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    height: 80
  },
  data: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  boxForDataBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0px -11px',
  },
  button: {
    margin: '5px 20px 10px',
    width: 100,
    height: 30,
    backgroundColor: theme.palette.primary.light,
    borderRadius: 5,
    border: 'none',
  },
}));

export default Events;
