import React, { FC } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { Exhibition } from 'generated/graphql';
import Loading from 'components/@common/Loading';

const GET_EXHIBITONS = gql`
  query {
    exhibitions(limit: 4) {
      exhibitionId
      name
      description
      startDate
    }
  }
`;

interface IResponse {
  exhibitions: Exhibition[];
}

const Events: FC = () => {
  const classes = useStyles();
  const { data, loading, error } = useQuery<IResponse>(GET_EXHIBITONS);

  if (error) {
    return (
      <Typography color="error">
        Error occured during fetching events: ${error}!
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" className={classes.wrapper}>
      <Typography variant="h4" className={classes.title}>
        Up coming online exhibitions
      </Typography>
      {loading && <Loading />}
      <div className={classes.container}>
        {!loading &&
          data!.exhibitions.map(
            ({ exhibitionId, name, description, startDate }) => {
              const date = new Date(startDate!);
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();

              return (
                <div className={classes.event} key={exhibitionId!}>
                  <Typography variant="h6" className={classes.eventTitle}>
                    {name}
                  </Typography>
                  <Typography className={classes.text} variant="subtitle2">
                    {description!.length < 150
                      ? description
                      : description!.slice(0, 250) + ' ...'}
                  </Typography>
                  <div className={classes.boxForDateBtn}>
                    <Typography variant="body2" className={classes.data}>
                      {`Date: ${year}/${month}/${day}`}
                    </Typography>
                    <Button className={classes.joinBtn} variant="contained">
                      Join
                    </Button>
                  </div>
                </div>
              );
            }
          )}
      </div>
    </Container>
  );
};

const useStyles = makeStyles({
  wrapper: {
    width: '100%',
    marginBottom: 150,
  },
  title: {
    textAlign: 'center',
    marginBottom: 25,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: `100%`,
  },
  event: {
    textAlign: 'left',
    width: '49%',
    height: '300',
    padding: '15px 20px',
    marginBottom: 25,
    backgroundColor: 'rgb(147, 147, 148)',
    borderRadius: 5,
    backgroundImage: `url(https://files.slack.com/files-pri/T013V5HN35F-F0141LZD5EJ/aliexpress-singles-d.jpg)`,
    backgroundSize: 'cover',
  },
  eventTitle: {
    fontFamily: 'Roboto',
    color: 'white',
    fontWeight: 'bolder',
  },
  text: {
    height: 150,
    fontSize: 18,
    fontFamily: 'Roboto',
    color: 'white',
    fontWeight: 'bolder',
  },
  boxForDateBtn: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  data: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  joinBtn: {
    fontWeight: 'bolder',
    backgroundColor: '#001DBE',
    color: 'white',
    borderRadius: 25,
    width: 97,
    height: 47,
  },
});

export default Events;
