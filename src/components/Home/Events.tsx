import React, { useState, FC } from 'react'

import { Exhibition } from 'generated/graphql'
import { makeStyles } from '@material-ui/core'
import { Button } from '@material-ui/core';





const Events: FC = () => {
  const classes = useStyles();
  const [items, setItems] = useState([
    {
        name: 'Name of the Exebition',
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        startDate: '21.05.2020',
        exhibitionId: `1`
    },
    {
        name: 'Name of the Exebition',
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        startDate: '21.05.2020',
        exhibitionId: `2`
    },
    {
        name: 'Name of the Exebition',
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        startDate: '21.05.2020',
        exhibitionId: `3`
    },
    {
        name: 'Name of the Exebition',
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
        startDate: '21.05.2020',
        exhibitionId: `4`
    }
  ])
  return (
    <div className={classes.container}>
      <h1>Up coming online exhibitions</h1>
      {items.map((item: Exhibition) => ( 
        <div className={classes.event} key={item.exhibitionId!}>
          <h2 className={classes.h1}>{item.name}</h2>
          <p className={classes.text}>{item.description}</p>
          <div className={classes.boxForDataBtn}>
            <p className={classes.data}>Data: {item.startDate}</p>
            <Button className={classes.button}>Join</Button>
          </div>
        </div>
      ))}
    </div>
  ) 
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: `100%`,
    textAlign: 'center'
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
    fontWeight: 'bold'
  },
  text: {
    fontSize: 18,
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
  }
}))


export default Events;