import React, { FC } from 'react'

import { makeStyles } from '@material-ui/core';


import './style.scss'
import Search from './Search'
import Events from './Events'


const Home: FC = () => {
    const classes = useStyle();
    return (
    <div className={classes.text}>
        Hello Kuba!
        <Search />
        <Events />
    </div>
    )
}

const useStyle = makeStyles((theme) => ({
    text: {
        color: theme.palette.primary.main,
        fontSize: 16
    }
}))

export default Home;